import * as vscode from 'vscode';
import * as path from 'path';

import * as ts from 'typescript';
import { TextEncoder } from 'util';

export default class CompileScript {
  static executeTranspile(document: vscode.TextDocument) {
    let m = path.basename(document.uri.fsPath).match(/\.script(library)?\.ts$/);
    if (m) {
      new CompileScript().transpile(document, m[1] !== undefined);
    }
  }

  private async transpile(document: vscode.TextDocument, isLib: boolean) {
    let content = document.getText();
    if (isLib) {
      content = `class Helper {\n${content}\n}\nreturn Helper`;
    }
    else {
      content = `return arguments[0]
    .zone
    .runGuarded(async () => {\n${content}\n});`;
    }

    let outFile = vscode.Uri.file(this.getCompiledJsFileName(document.uri.fsPath));
    let jsContent = ts.transpileModule(content, { compilerOptions: { target: ts.ScriptTarget.ES5 } });
    let bin = new TextEncoder().encode(jsContent.outputText);
    await vscode.workspace.fs.writeFile(outFile, bin);
  }

  private getCompiledJsFileName(tsFileName: string) {
    return path.join(path.dirname(tsFileName), path.basename(tsFileName, '.ts') + '.compiled.js');
  }
}