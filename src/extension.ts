import * as vscode from 'vscode';
import * as path from 'path';

import GoToDefinitionConfiguration from './commands/goToDefinitionConfiguration';
import GoToDefinitionTypeScript from './commands/goToDefinitionTypeScript';
import CompileScript from './commands/compileScript';

export function activate(context: vscode.ExtensionContext) {
	if (vscode.workspace.workspaceFolders) {
		let currentFolder = vscode.workspace.workspaceFolders[0].uri;
		getWorkspaceLevel(currentFolder).then(level => {
			if (level > 0) {
				let projectFolder = (level === 1) ? path.join(currentFolder.fsPath, '..') : currentFolder.fsPath;
				CompileScript.projectFolder = projectFolder;

				vscode.workspace.findFiles(`**/*.script*.ts`).then(uris => CompileScript.executeCompileAll(uris));
				CompileScript.executeLibrariesDeclaration();
				CompileScript.executeEnsureStandardDeclaration(context.asAbsolutePath('dist/@types/sfk-script/index.d.ts'));

				context.subscriptions.push(
					vscode.commands.registerCommand('sfk.studio.goToDefinitionConfiguration', GoToDefinitionConfiguration.execute),
					vscode.languages.registerDefinitionProvider('typescript', { provideDefinition: GoToDefinitionTypeScript.execute }),
					vscode.languages.registerImplementationProvider('typescript', { provideImplementation: GoToDefinitionTypeScript.execute }),
					vscode.workspace.onDidSaveTextDocument(CompileScript.executeCompile),
					vscode.workspace.onDidSaveTextDocument(CompileScript.executeLibrariesDeclaration),
					vscode.workspace.onDidRenameFiles(CompileScript.executeRename)
				);
			}
		});
	}
}

async function getWorkspaceLevel(current: vscode.Uri, level: number = 1): Promise<number> {
	let children = await vscode.workspace.fs.readDirectory(current);
	let folders = children
		.filter(c => c[1] === vscode.FileType.Directory && !c[0].startsWith('.'))
		.map(c => vscode.Uri.file(path.join(current.fsPath, c[0])));

	let result = 0;
	if (folders.some(u => path.basename(u.fsPath).match(/^Common|DeviceTypes$/i))) {
		result = level;
	}
	else {
		for (let i = 0; i < folders.length; i++) {
			let f = folders[i];
			let res = await getWorkspaceLevel(f, level + 1);
			if (res !== 0) {
				result = res;
				break;
			}
		}
	}
	return result;
}

export function deactivate() {}
