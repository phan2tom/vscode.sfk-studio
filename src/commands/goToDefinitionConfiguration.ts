import * as vscode from 'vscode';
import * as path from 'path';

import { FileInfo, FileType } from '../core';

export default class GoToDefinitionConfiguration {
	
	static async execute() {
		if (vscode.window.activeTextEditor !== undefined) {
			const activeTextEditor = vscode.window.activeTextEditor;
			let symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', activeTextEditor.document.uri);
			if (symbols) {
					await new GoToDefinitionConfiguration().goToDefinition(activeTextEditor, symbols);
			}
		}
	}

	static filterCurrentDeviceType(currentDocument: vscode.Uri, targetDocuments: vscode.Uri[]) {
		let currentFileInfo = FileInfo.create(currentDocument);
		let fileInfos = targetDocuments.map(uri => FileInfo.create(uri));
	
		let target = fileInfos.find(f => f!.environment === currentFileInfo!.environment);
		if (!target) {
			target = fileInfos.find(f => f!.environment === "Common");
		}
		return target?.uri;
	}

	protected async goToDefinition(activeTextEditor: vscode.TextEditor, symbols: vscode.DocumentSymbol[]) {
		let currentPosition = activeTextEditor.selection.start;
		let wordRange = activeTextEditor.document.getWordRangeAtPosition(currentPosition);
		let propertySymbol = this.findCurrentPropertySymbol(symbols, wordRange);

		if (!symbols || !wordRange || !propertySymbol) {
			return;
		}
	
		let highlightedWord = activeTextEditor.document.getText(wordRange);
		highlightedWord = highlightedWord.replace(/(^")|("$)/g, "");
	
		let info = FileInfo.create(activeTextEditor.document.uri);
		let targetFileName = this.getTargetFileName(info, propertySymbol.name, highlightedWord);
		if (!targetFileName) {
			return;
		}
		
		let foundFiles = await vscode.workspace.findFiles(`**/${targetFileName}`);
		if (foundFiles && foundFiles.length > 0) {
			let target = GoToDefinitionConfiguration.filterCurrentDeviceType(activeTextEditor.document.uri, foundFiles);
			if (target) {
				let doc = await vscode.workspace.openTextDocument(target);
				vscode.window.showTextDocument(doc);
			}
		}
		else {
			vscode.window.showInformationMessage(`${targetFileName} not found`);
		}
	}

	private findCurrentPropertySymbol(symbols: vscode.DocumentSymbol[] | undefined, currentRange: vscode.Range | undefined) {
		if (symbols && currentRange) {
			let minDistance = this.getRecursiveDistances(symbols, currentRange);
			if (minDistance !== undefined && minDistance.symbol.range.start.character !== currentRange.start.character) {
				return minDistance.symbol;
			}
		}
		return undefined;
	}
	private getRecursiveDistances(symbols: vscode.DocumentSymbol[], currentRange: vscode.Range) {
		let minDistance: Distance | undefined;
		
		let distances = this.getDistances(symbols, currentRange);
		distances.forEach(d => {
			let chilMinDistance = this.getRecursiveDistances(d.symbol.children, currentRange);
			let min = (chilMinDistance?.distance ?? Number.MAX_SAFE_INTEGER) < d.distance ? chilMinDistance : d;
			if ((min?.distance ?? Number.MAX_SAFE_INTEGER) < (minDistance?.distance ?? Number.MAX_SAFE_INTEGER)) {
				minDistance = min;
			}
		});
		return minDistance;
	}
	private getDistances(symbols: vscode.DocumentSymbol[], currentRange: vscode.Range) {
		let distances = symbols.map(s => new Distance(s, currentRange.start.line - s.range.start.line));
		return distances.filter(d => d.distance >= 0);
	}

	private getTargetFileName(info: FileInfo | undefined, propertyName: string, value: string) {
		if (!info) {
			return undefined;
		}
	
		switch (info.type) {
			case FileType.Component: return this.getTargetFileNameFromComponent(propertyName, value);
			case FileType.Condition:
			case FileType.DataSource: return this.getTargetFileNameFromDataSource(propertyName, value);
			case FileType.Menu: return this.getTargetFileNameFromMenu(propertyName, value);
			case FileType.Schema: return this.getTargetFileNameFromSchema(propertyName, value);
			default: return undefined;
		}
	}
	private getTargetFileNameFromComponent(propertyName: string, value: string) {
		if (propertyName.search(/datasource/i) > -1) {
			return `${value}.datasource.json`;
		}
		switch (propertyName.toLowerCase()) {
			case "script": return `${value}.script.ts`;
			case "template": return `${value}.template.html`;
			case "target": return this.getLinkTargetFileName(value);
			case "name": return `${value}.condition.json`;
			default: return undefined;
		}
	}
	private getTargetFileNameFromDataSource(propertyName: string, value: string) {
		switch (propertyName.toLowerCase()) {
			case "selectqueryname": return `${value}.sql.sql`;
			case "targettable":
			case "tablename": return `${value}.schema.json`;
			default: return undefined;
		}
	}
	private getTargetFileNameFromMenu(propertyName: string, value: string) {
		switch (propertyName.toLowerCase()) {
			case "target": return this.getLinkTargetFileName(value);
			default: return undefined;
		}
	}
	private getTargetFileNameFromSchema(propertyName: string, value: string) {
		if (propertyName.search(/datasource/i) > -1) {
			return `${value}.datasource.json`;
		}
		switch (propertyName.toLowerCase()) {
			case "foreignconfigname": return `${value}.component.json`;
			case "targettable": return `${value}.schema.json`;
			default: return undefined;
		}
	}
	
	private getLinkTargetFileName(target: string) {
		let uri = vscode.Uri.parse(target);
		let pageName = uri.path.substr(1);
		if (pageName.endsWith("/new")) {
			pageName = pageName.replace(/\//, ".");
		}
		else if (pageName.endsWith("/")) {
			pageName = `${pageName.substr(0, pageName.length - 1)}.id`;
		}
	
		return `${pageName}.component.json`;
	}
	
}

class Distance {
	constructor(
		public readonly symbol: vscode.DocumentSymbol,
		public readonly distance: number
	) { }
}
