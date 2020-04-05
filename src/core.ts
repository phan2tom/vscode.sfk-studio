import * as vscode from 'vscode';

export class FileInfo {
	private static envRegExp = /\\(Common|DeviceTypes)\\([^\\]+)/;
	private static fileTypeRegExp = /\.([^.]+)\.(json|sql|ts)$/;

	readonly environment: string | undefined = undefined;
	readonly environmentPath: string | undefined = undefined;
	readonly filePath!: string;
	readonly type: FileType = FileType.Unknown;

	private constructor(readonly uri: vscode.Uri) {
		this.filePath = uri.fsPath;
		let m = this.filePath.match(FileInfo.envRegExp);
		if (m) {
			this.environment = m[1] === "Common" ? m[1] : m[2];
			this.environmentPath = m[1] === "Common" ? m[1] : `${m[1]}/${m[2]}`;
		}
		
		m = this.filePath.match(FileInfo.fileTypeRegExp);
		if (m) {
			let key = Object.keys(FileType).find(k => k.toLowerCase() === m![1].toLowerCase());
			if (key) {
				this.type = FileType[<FileTypeKeys>key];
			}
		}
	}

	static create(uri: vscode.Uri | undefined) {
		if (uri) {
			let info = new FileInfo(uri);
			return info.type !== FileType.Unknown ? info : undefined;
		}
		return undefined;
	}
}

type FileTypeKeys = keyof typeof FileType;

export enum FileType {
	Unknown,
	Component,
	Condition,
	DataSource,
	Menu,
	ProjectSettings,
	Schema,
	Sql,
	Script,
	ScriptLibrary
}

export class SearchElement {
}
export class SearchFile extends SearchElement {
	constructor(readonly pattern: string) {
		super();
	}
}
export class SearchConfigPropertyValue extends SearchFile {
	constructor(readonly fileExt: string, readonly propertyName: string, readonly value: string) {
		super(`*${fileExt}`);
	}
}