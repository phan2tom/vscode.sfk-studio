import * as vscode from 'vscode';
import * as path from 'path';

export default class GoToDefinitionTypeScript {

	static async execute() {
		if (vscode.window.activeTextEditor !== undefined) {
			const activeTextEditor = vscode.window.activeTextEditor;
			let symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', activeTextEditor.document.uri);
			if (symbols) {
					new GoToDefinitionTypeScript().goToDefinition(activeTextEditor, symbols);
			}
		}
	}

	protected goToDefinition(activeTextEditor: vscode.TextEditor, symbols: vscode.DocumentSymbol[] | undefined) {
		let currentPosition = activeTextEditor.selection.start;
		let wordRange = activeTextEditor.document.getWordRangeAtPosition(currentPosition);

		if (!symbols || !wordRange) {
			return;
		}
	}
}
