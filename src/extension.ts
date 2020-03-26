import * as vscode from 'vscode';
import { WSAECONNABORTED } from 'constants';

import GoToDefinitionConfiguration from './commands/goToDefinitionConfiguration';
import GoToDefinitionTypeScript from './commands/goToDefinitionTypeScript';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('sfk.studio.goToDefinitionConfiguration', GoToDefinitionConfiguration.execute),
		vscode.commands.registerCommand('sfk.studio.goToDefinitionTypeScript', GoToDefinitionTypeScript.execute)
	);
}

export function deactivate() {}
