import * as vscode from 'vscode';
import * as path from 'path';

import GoToDefinitionConfiguration from './goToDefinitionConfiguration';
import * as core from '../core';

export default class GoToDefinitionTypeScript {

	static async execute(document: vscode.TextDocument, position: vscode.Position) {
			let info = core.FileInfo.create(document.uri);
			if (info !== undefined && (info.type === core.FileType.Script || info.type === core.FileType.ScriptLibrary)) {
				return await new GoToDefinitionTypeScript().goToDefinition(document, position);
			}
			return [];
	}

	protected async goToDefinition(document: vscode.TextDocument, position: vscode.Position) {
		let hoverWord = document.getText(document.getWordRangeAtPosition(position, /[^'"]+/));
		let line = document.lineAt(position.line);
		let m = line.text.match(/\$(?<service>\w+)\s*\.\s*(?<method>\w+)\s*<?[^(]*\(\s*['"](?<firstArg>[^"']+)['"]/);
		if (!m || !m.groups || m.groups['firstArg'] !== hoverWord) {
			return [];
		}

		let locations: vscode.Location[] = [];

		let searchElement = this.getSearchElement(m.groups['service'], m.groups['method'], m.groups['firstArg']);
		if (searchElement) {
			if (searchElement instanceof core.SearchConfigPropertyValue) {
				locations = await this.findFiles(document.uri, searchElement);
			}
			else {
				let files = await vscode.workspace.findFiles(`**/${searchElement.pattern}`);
				let f = GoToDefinitionConfiguration.filterCurrentDeviceType(document.uri, files);
				if (f) {
					locations.push(new vscode.Location(f, new vscode.Position(0, 0)));
				}
			}
		}

		return locations;
	}
	private async findFiles(document: vscode.Uri, searchProperty: core.SearchConfigPropertyValue) {
		let currentFileInfo = core.FileInfo.create(document);
		let files = await vscode.workspace.findFiles(`**/${currentFileInfo!.environmentPath}/**/${searchProperty.pattern}`);
		files = files.filter(f => path.basename(document.path).startsWith(path.basename(f.path, searchProperty.fileExt)));
		let locations = await this.getLocations(files, searchProperty);
		if (locations.length === 0 && currentFileInfo!.environment !== 'Common') {
			files = await vscode.workspace.findFiles(`**/Common/**/${searchProperty.pattern}`);
			files = files.filter(f => path.basename(document.path).startsWith(path.basename(f.path, searchProperty.fileExt)));
			locations = await this.getLocations(files, searchProperty);
		}
		return locations;
	}
	private async getLocations(files: vscode.Uri[], searchProperty: core.SearchConfigPropertyValue) {
		let configRegExp = new RegExp(`"${searchProperty.propertyName}"[ \s]*:[ \s]*"(${searchProperty.value})"`, 'g');
		let locations = await Promise.all(
			files.map(async (uri) => {
				let doc = await vscode.workspace.openTextDocument(uri);
				let content = doc.getText();
				let m = configRegExp.exec(content);
				if (m) {
					let index = m.index + m[0].indexOf(m[1]);
					return new vscode.Location(uri, doc.positionAt(index));
				}
			})
		);
		return <vscode.Location[]>locations.filter(x => x);
	}

	private recursiveFindSymbol(propertyName: string, symbols: vscode.DocumentSymbol[]) {
		let result = symbols.filter(s => s.name === propertyName);
		symbols.forEach(s => result = [...result, ...this.recursiveFindSymbol(propertyName, s.children)]);
		return result;
	}

	private getSearchElement(service: string, method: string, firstArg: string) {
		switch (service) {
			case 'component': return this.getSearchElementForComponent(method, firstArg);
			case 'database': return this.getSearchElementForDatabase(method, firstArg);
			case 'library': return this.getSearchElementForLibrary(method, firstArg);
			case 'condition': return this.getSearchElementForCondition(method, firstArg);
		}
	}

	private getSearchElementForComponent(method: string, firstArg: string) {
		switch (method) {
			case 'getById': return new core.SearchConfigPropertyValue('.component.json', 'ScriptId', firstArg);
		}
	}
	private getSearchElementForDatabase(method: string, firstArg: string) {
		return new core.SearchFile(`${firstArg}.datasource.json`);
	}
	private getSearchElementForLibrary(method: string, firstArg: string) {
		switch (method) {
			case 'getLibraryAsync': return new core.SearchFile(`${firstArg}.scriptlibrary.ts`);
		}
	}
	private getSearchElementForCondition(method: string, firstArg: string) {
		switch (method) {
			case 'setFromDataSourceAsync': return new core.SearchFile(`${firstArg}.datasource.json`);
		}
	}
}
