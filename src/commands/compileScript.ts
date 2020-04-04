import * as vscode from 'vscode';
import * as path from 'path';

import { FileInfo } from '../core';

import * as ts from 'typescript';
import * as camelCase from 'camelcase';
import { TextEncoder, TextDecoder } from 'util';

export default class CompileScript {
  static executeCompile(document: vscode.TextDocument) {
    let m = document.uri.fsPath.match(/\.script(library)?\.ts$/);
    if (m) {
      new CompileScript().compile(document.uri, m[1] !== undefined);
    }
  }
  static async executeCompileAll() {
    let compiler = new CompileScript();
    let result = await Promise.all([
      vscode.workspace.findFiles('**/*.script.ts'),
      vscode.workspace.findFiles('**/*.scriptlibrary.ts')
    ]);
    let compileScripts = Promise.all(result[0].map(uri => compiler.compile(uri, false)));
    let compileLibs = Promise.all(result[1].map(uri => compiler.compile(uri, true)));
    await Promise.all([compileScripts, compileLibs]);
    
    vscode.window.showInformationMessage('All scripts & libraries have been compiled');
  }
  static executeLibrariesDeclaration(document?: vscode.TextDocument) {
    if (document === undefined || document.uri.fsPath.match(/\.scriptlibrary?\.ts$/) && vscode.workspace.workspaceFolders) {
      new CompileScript().generateLibrariesDeclaration();
    }
  }
  static executeRename(e: vscode.FileRenameEvent) {
    let files = e.files.filter(f => f.oldUri.fsPath.search(/\.script(library)?\.ts$/) > -1);
    files.forEach(f => new CompileScript().rename(f.oldUri, f.newUri));
  }

  private async compile(file: vscode.Uri, isLib: boolean) {
    let content = new TextDecoder().decode(await vscode.workspace.fs.readFile(file));
    if (isLib) {
      content = `class Helper {\n${content}\n}\nreturn Helper`;
    }
    else {
      content = `return arguments[0]
    .zone
    .runGuarded(async () => {\n${content}\n});`;
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

  private async generateLibrariesDeclaration() {
    if (!vscode.workspace.workspaceFolders) {
      return;
    }

    let tmpFile = vscode.Uri.file(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'node_modules', '@types', 'sfk-script-libraries', 'index.ts'));
    
    let concatLibs = '';
    let decoder = new TextDecoder();
    let libs = await vscode.workspace.findFiles('**/*.scriptlibrary.ts');
    await this.forEachAsync(libs, async (lib) => {
      let info = new FileInfo(lib);
      let className = camelCase(path.basename(lib.fsPath, '.scriptlibrary.ts'));
      let content = decoder.decode(await vscode.workspace.fs.readFile(lib));
      content = `namespace ${info.environment} { export class ${className} {\n ${content} } }\n`;
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