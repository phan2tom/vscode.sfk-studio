import * as vscode from 'vscode';
import * as path from 'path';

export default class GoToDefinitionTypeScript {

	static async execute() {
		if (vscode.window.activeTextEditor !== undefined) {
			const activeTextEditor = vscode.window.activeTextEditor;
			new GoToDefinitionTypeScript().goToDefinition(activeTextEditor);
		}
	}

	protected goToDefinition(activeTextEditor: vscode.TextEditor) {
		let line = activeTextEditor.document.lineAt(activeTextEditor.selection.active.line);

		let m = line.text.match(/\$(?<service>\w+)\s*\.\s*(?<method>\w+)\s*\(\s*['"](?<firstArg>[^"']+)['"]/);
		if (!m || !m.groups) {
			return;
		}

		let target = this.getTarget(m.groups['service'], m.groups['method'], m.groups['firstArg']);
		vscode.window.showInformationMessage(target);
	}

	private getTarget(service: string, method: string, firstArg: string) {
		switch (service) {
			case 'component': return this.getTargetComponent(method, firstArg);
			case 'database': return this.getTargetDatabase(method, firstArg);
			case 'library': return this.getTargetLibrary(method, firstArg);
			default: return '';
		}
	}

	private getTargetComponent(method: string, firstArg: string) {
		switch (method) {
			case 'getById': return `Component ${firstArg}`;
			default: return '';
		}
	}
	private getTargetDatabase(method: string, firstArg: string) {
		switch (method) {
			case 'insertAsync': return `DataSource ${firstArg}`;
			case 'selectAsync': return `DataSource ${firstArg}`;
			case 'updateAsync': return `DataSource ${firstArg}`;
			case 'deleteAsync': return `DataSource ${firstArg}`;
			default: return '';
		}
	}
	private getTargetLibrary(method: string, firstArg: string) {
		switch (method) {
			case 'getLibraryAsync': return `ScriptLibrary ${firstArg}`;
			default: return '';
		}
	}
}
