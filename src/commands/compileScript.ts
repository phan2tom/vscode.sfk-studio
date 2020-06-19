import * as vscode from 'vscode';
import * as path from 'path';

import { FileInfo, FileType } from '../core';

import * as ts from 'typescript';
import * as camelCase from 'camelcase';
import { TextEncoder, TextDecoder } from 'util';
import { fstat, exists } from 'fs';

export default class CompileScript {
  static projectFolder: string;

  static executeCompile(document: vscode.TextDocument) {
    new CompileScript().compile(document.uri);
  }
  static async executeCompileAll(files: vscode.Uri[]) {
    let compiler = new CompileScript();
    await Promise.all(files.map(uri => compiler.compile(uri)));
    
    vscode.window.showInformationMessage('All scripts & libraries have been compiled');
  }
  static executeLibrariesDeclaration(document?: vscode.TextDocument) {
    let info = FileInfo.create(document?.uri);
    if ((document === undefined || info !== undefined && info.type === FileType.ScriptLibrary) && vscode.workspace.workspaceFolders) {
      new CompileScript().generateLibrariesDeclaration();
    }
  }
  static executeRename(e: vscode.FileRenameEvent) {
    let files = e.files
      .map(f => {
        return { oldInfo: FileInfo.create(f.oldUri), newInfo: FileInfo.create(f.newUri) };
      })
      .filter(f => f.oldInfo !== undefined && (f.oldInfo.type === FileType.Script || f.oldInfo.type === FileType.ScriptLibrary));
    files.forEach(f => new CompileScript().rename(f.oldInfo!.uri, f.newInfo!.uri));
  }
  static executeEnsureStandardDeclaration(sourceFilePath: string) {
    let sourceFile = vscode.Uri.file(sourceFilePath);
    let targetFile = vscode.Uri.file(path.join(CompileScript.projectFolder, 'node_modules', '@types', 'sfk-script', 'index.d.ts'));
    vscode.workspace.fs.copy(sourceFile, targetFile, { overwrite: false }).then(() => {}, (reason) => {});
  }

  private async compile(file: vscode.Uri) {
    let info = FileInfo.create(file);
    if (info === undefined) {
      return;
    }

    let content = new TextDecoder().decode(await vscode.workspace.fs.readFile(file));
    if (info.type === FileType.ScriptLibrary) {
      content = `class Helper {\n${content}\n}\nreturn Helper`;
    }
    else if (info.type === FileType.Script) {
      content = `return arguments[0]
    .zone
    .runGuarded(async () => {\n${content}\n});`;
    }
    else {
      return;
    }

    let outFile = vscode.Uri.file(this.getCompiledJsFileName(file.fsPath));
    let jsContent = ts.transpileModule(content, { compilerOptions: { target: ts.ScriptTarget.ES5 } });
    let bin = new TextEncoder().encode(jsContent.outputText);
    await vscode.workspace.fs.writeFile(outFile, bin);
  }

  private async rename(oldUri: vscode.Uri, newUri: vscode.Uri) {
    let oldJs = vscode.Uri.file(this.getCompiledJsFileName(oldUri.fsPath));
    let newJs = vscode.Uri.file(this.getCompiledJsFileName(newUri.fsPath));
    try {
      await vscode.workspace.fs.rename(oldJs, newJs);
    }
    catch {
    }
  }

  public async generateLibrariesDeclaration() {
    let tmpFile = vscode.Uri.file(path.join(CompileScript.projectFolder, 'node_modules', '@types', 'sfk-script-libraries', 'index.ts'));

    let concatLibs = '';
    let decoder = new TextDecoder();
    let libs = await vscode.workspace.findFiles('**/*.scriptlibrary.ts');
    await this.forEachAsync(libs, async (lib) => {
      let info = FileInfo.create(lib);
      let className = camelCase(path.basename(lib.fsPath, '.scriptlibrary.ts'));
      let content = decoder.decode(await vscode.workspace.fs.readFile(lib));
      content = `namespace ${info!.environment} { export class ${className} {\n ${content} } }\n`;
      concatLibs += content;
    });
    await vscode.workspace.fs.writeFile(tmpFile, new TextEncoder().encode(concatLibs));

    let tsc = ts.createProgram([tmpFile.fsPath], { declaration: true, emitDeclarationOnly: true });
    let result = tsc.emit();
    if (result.emitSkipped) {
      let diags = result.diagnostics.forEach(d => {
        if (d.file) {
          let pos = d.file.getLineAndCharacterOfPosition(d.start!);
          vscode.window.showErrorMessage(`Line ${pos.line}, ${pos.character}: ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`);
        }
        else {
          vscode.window.showErrorMessage(ts.flattenDiagnosticMessageText(d.messageText, '\n'));
        }
      });
    }
    else {
      vscode.window.showInformationMessage('ScriptLibrary: Declaration generated successfully');
    }

    try { vscode.workspace.fs.delete(tmpFile); }
    catch {}
  }

  private async forEachAsync<T>(array: Array<T>, callback: (item: T) => Promise<void>) {
    for (let i = 0; i < array.length; i++) {
      await callback(array[i]);
    }
  }

  private getCompiledJsFileName(tsFileName: string) {
    return path.join(path.dirname(tsFileName), path.basename(tsFileName, '.ts') + '.compiled.js');
  }
}