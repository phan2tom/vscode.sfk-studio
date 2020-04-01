import * as vscode from 'vscode';
import * as path from 'path';

import GoToDefinitionConfiguration from './goToDefinitionConfiguration';

export default class GoToDefinitionTypeScript {

	static async execute(document: vscode.TextDocument, position: vscode.Position) {
			return await new GoToDefinitionTypeScript().goToDefinition(document, position);
	}

	protected async goToDefinition(document: vscode.TextDocument, position: vscode.Position) {
		let line = document.lineAt(position.line);
		let m = line.text.match(/\$(?<service>\w+)\s*\.\s*(?<method>\w+)\s*\(\s*['"](?<firstArg>[^"']+)['"]/);
		if (!m || !m.groups) {
			return undefined;
		}

		let searchElement = this.getSearchElement(m.groups['service'], m.groups['method'], m.groups['firstArg']);
		if (searchElement) {
			let foundFiles = await vscode.workspace.findFiles(`**/${searchElement.pattern}`);
			if (foundFiles && foundFiles.length > 0) {
				if (searchElement instanceof SearchConfigPropertyValue) {
					let searchProperty = searchElement;
					let result = await Promise.all(
						foundFiles.map(async (uri) => {
							let d = await vscode.workspace.openTextDocument(uri);
							let text = d.getText();
							let index = text.search(new RegExp(`"${searchProperty.propertyName}"[ \s]*:[ \s]*"${searchProperty.value}"`, 'g'));
							if (index > -1) {
								return new vscode.Location(uri, d.positionAt(index));
							}
						})
					);
					return <vscode.Location[]>result.filter(r => r);
				}
				else {
					let target = GoToDefinitionConfiguration.filterCurrentDeviceType(document.uri, foundFiles);
					if (target) {
						return new vscode.Location(target, new vscode.Position(0, 0));
					}
				}
			}
		}
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
		}
	}

	private getSearchElementForComponent(method: string, firstArg: string) {
		switch (method) {
			case 'getById': return new SearchConfigPropertyValue('*.component.json', 'ScriptId', firstArg);
		}
	}
	private getSearchElementForDatabase(method: string, firstArg: string) {
		switch (method) {
			case 'insertAsync':
			case 'selectAsync':
			case 'updateAsync':
			case 'deleteAsync': return new SearchFile(`${firstArg}.datasource.json`);
		}
	}
	private getSearchElementForLibrary(method: string, firstArg: string) {
		switch (method) {
			case 'getLibraryAsync': return new SearchFile(`${firstArg}.scriptlibrary.ts`);
		}
	}
}

class SearchElement {
}
class SearchFile extends SearchElement {
	constructor(readonly pattern: string) {
		super();
	}
}
class SearchConfigProperty extends SearchFile {
	constructor(readonly pattern: string, readonly propertyName: string) {
		super(pattern);
	}
}
class SearchConfigPropertyValue extends SearchConfigProperty {
	constructor(readonly pattern: string, readonly propertyName: string, readonly value: string) {
		super(pattern, propertyName);
	}
}