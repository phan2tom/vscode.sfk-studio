// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { WSAECONNABORTED } from 'constants';

class Distance {
	constructor(
		public readonly symbol: vscode.DocumentSymbol,
		public readonly distance: number
	) { }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('sfk.studio.goToDefinition', () => {
		if (vscode.window.activeTextEditor !== undefined) {
			vscode.commands
				.executeCommand<vscode.DocumentSymbol[]>("vscode.executeDocumentSymbolProvider", vscode.window.activeTextEditor.document.uri)
				.then(s => goToDefinition(s));
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}


function goToDefinition(symbols: vscode.DocumentSymbol[] | undefined) {
	if (!vscode.window.activeTextEditor || !symbols) {
		return;
	}

	let currentPosition = vscode.window.activeTextEditor.selection.start;
	let wordRange = vscode.window.activeTextEditor.document.getWordRangeAtPosition(currentPosition);
	if (!wordRange) {
		return;
	}

	let propertySymbol = findCurrentPropertySymbol(symbols, wordRange);
	if (!propertySymbol) {
		return;
	}

	let highlighted = vscode.window.activeTextEditor.document.getText(wordRange);
	highlighted = highlighted.replace(/(^")|("$)/g, "");

	let currentFileName = path.basename(vscode.window.activeTextEditor.document.uri.fsPath);
	let targetFileName = getTargetFileName(currentFileName, propertySymbol.name, highlighted);
	if (!targetFileName) {
		return;
	}

	vscode.workspace.findFiles(`**/${targetFileName}`)
		.then(uris => {
			if (uris && uris.length > 0) {
				let f = uris[0];
				vscode.workspace.openTextDocument(f.fsPath)
					.then(doc => {
						vscode.window.showTextDocument(doc);
					});
			}
		});
}

function getTargetFileName(currentFileName: string, propertyName: string, value: string) {
	let m = currentFileName.match(/\.(?<configType>\w+)\.(json|ts)$/);
	if (!m || !m.groups) {
		return undefined;
	}

	switch (m.groups["configType"].toLowerCase()) {
		case "component": return getTargetFileNameFromComponent(propertyName, value);
		case "condition":
		case "datasource": return getTargetFileNameFromDataSource(propertyName, value);
		case "menu": return getTargetFileNameFromMenu(propertyName, value);
		case "schema": return getTargetFileNameFromSchema(propertyName, value);
		default: return undefined;
	}
}
function getTargetFileNameFromComponent(propertyName: string, value: string) {
	switch (propertyName.toLowerCase()) {
		case "datasource": return `${value}.datasource.json`;
		case "script": return `${value}.script.ts`;
		case "template": return `${value}.template.html`;
		case "target": return `${vscode.Uri.parse(value).path.substring(1)}.component.json`;
		case "name": return `${value}.condition.json`;
		default: return undefined;
	}
}
function getTargetFileNameFromDataSource(propertyName: string, value: string) {
	switch (propertyName.toLowerCase()) {
		case "selectqueryname": return `${value}.sql.sql`;
		case "targettable":
		case "tablename": return `${value}.schema.json`;
		default: return undefined;
	}
}
function getTargetFileNameFromMenu(propertyName: string, value: string) {
	switch (propertyName.toLowerCase()) {
		case "target": return `${vscode.Uri.parse(value).path.substring(1)}.component.json`;
		default: return undefined;
	}
}
function getTargetFileNameFromSchema(propertyName: string, value: string) {
	switch (propertyName.toLowerCase()) {
		case "datasource": return `${value}.datasource.json`;
		default: return undefined;
	}
}

function findCurrentPropertySymbol(symbols: vscode.DocumentSymbol[], currentRange: vscode.Range) {
	let minDistance = getRecursiveDistances(symbols, currentRange);
	if (minDistance !== undefined && minDistance.symbol.range.start.character !== currentRange.start.character) {
		return minDistance.symbol;
	}
	return undefined;
}
function getRecursiveDistances(symbols: vscode.DocumentSymbol[], currentRange: vscode.Range) {
	let minDistance: Distance | undefined;
	
	let distances = getDistances(symbols, currentRange);
	distances.forEach(d => {
		let chilMinDistance = getRecursiveDistances(d.symbol.children, currentRange);
		let min = (chilMinDistance?.distance ?? Number.MAX_SAFE_INTEGER) < d.distance ? chilMinDistance : d;
		if ((min?.distance ?? Number.MAX_SAFE_INTEGER) < (minDistance?.distance ?? Number.MAX_SAFE_INTEGER)) {
			minDistance = min;
		}
	});
	return minDistance;
}
function getDistances(symbols: vscode.DocumentSymbol[], currentRange: vscode.Range) {
	let distances = symbols.map(s => new Distance(s, currentRange.start.line - s.range.start.line));
	return distances.filter(d => d.distance >= 0);
}
