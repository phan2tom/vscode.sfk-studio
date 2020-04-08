# Get started

## Configuration files

### 1. JSON (with comments)
Associate SFK configuration files with VS Code `jsonc` (JSON with comments) to prevent VS Code from reporting errors on the comments.

### 2. Go to Definition
Allow to open a targeted configuration element with:
- `Right click + Go To Definition`
- `Ctrl + F12`

Such as:
- TableName
- DataSource
- Script
- Template
- Target
- Condition
- SelectQueryName
- ForeignConfigName

### 3. Completion
Load JSON Schemas to enable completion

## Scripts

### 1. Compiling features
- Compatible with `TypeScript 3.5.3` compile in `ES5`
- Compile in JavaScript each time the TypeScript is saved.
- Move/Rename the compiled JS file when the TS file is moved/renamed
- Compile all on workspace opened

### 2. Go to Definition
Allow to open some configuration elements with:
- `Right click + Go To Definition` / `F12`
- `Right click + Go To Implementation` / `Ctrl + F12`

Such as:
- `$component.getById('componentId')` => Opens component file in which `componentId` is used
- `$library.getLibraryAsync('helper')` => Opens the `helper` ScriptLibrary
- `$database._____Async('datasourceId', ...)` => Opens the `datasourceId` DataSource
- `$condition.setFromDataSourceAsync('datasourceId', ...)` => Opens the `datasourceId` DataSource

### 3. Completion
- A default declaration is available in `./node_modules/@types/sfk-script/index.d.ts` for standard elements
- A TypeScript Declaration is generated for all the available ScriptLibrary
- The class name is the ScriptLibrary name in Camel Case (eg: `helper.date` => `helperDate`)
- Each DeviceType is represented by a namespace with the same name:  
  
  ```typescript
  let genericTypeHelper = await $library.getLibraryAsync<Common.genericType>('genericType');
  let dateHelper = await $library.getLibraryAsync<Default.helperDate>('helper.date');
  ```

### 4. Tips to have valid TypeScript files
Script file is wrapped in a `function` call & ScripLibrary is wrapped in `class`  
So to prevent VS Code from throwing warnings & errors about TypeScript validation, there's 2 following tips:

#### For a Script

```typescript
(async () => {
  // Script content
})();
```

> If your script needs to be sync, just add `await` in the beginning

#### For a ScriptLibrary

```typescript
const myMethodAsync = async (arg: string) => {
  // Async method content
};

const myMethod = (arg: string) => {
  // Sync method content
};
```
