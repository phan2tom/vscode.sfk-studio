import * as vscode from 'vscode';
import * as path from 'path';
import { WSAECONNABORTED } from 'constants';

import GoToDefinitionConfiguration from './commands/goToDefinitionConfiguration';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('sfk.studio.goToDefinitionConfiguration', GoToDefinitionConfiguration.execute)
	);
}

export function deactivate() {}
