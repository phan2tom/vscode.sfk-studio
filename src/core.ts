import * as vscode from 'vscode';

export class FileInfo {
	private envRegExp = /\\(Common|DeviceTypes)\\([^\\]+)/;

	readonly environment: string | null = null;
	readonly environmentPath: string | null = null;
	readonly filePath: string | null = null;

	constructor(public readonly uri: vscode.Uri) {
		this.filePath = uri.fsPath;
		let m = this.filePath.match(this.envRegExp);
		if (m) {
			this.environment = m[1] === "Common" ? m[1] : m[2];
			this.environmentPath = m[1] === "Common" ? m[1] : `${m[1]}/${m[2]}`;
		}
	}
}

export class SearchElement {
}
export class SearchFile extends SearchElement {
	constructor(readonly pattern: string) {
		super();
	}
}
export class SearchConfigPropertyValue extends SearchFile {
	constructor(readonly pattern: string, readonly propertyName: string, readonly value: string) {
		super(pattern);
	}
}