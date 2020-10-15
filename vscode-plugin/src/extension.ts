// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "programmaticTemplates" is now active!');
	// supply this to scripts as we are always importing freshly everytime so its easier for testing. so they can use this for any long term usages.
	// although most scripts shouldn't need it
	const store = {};
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.addToProps', async () => {
			try {
				console.log('props');
				const editor = vscode.window.activeTextEditor;
				if (editor) {
					const document = editor.document;
					const selection = editor.selection;

					// Get the word within the selection
					const word = document.getText(selection);
					const configuration = vscode.workspace.getConfiguration('progTemplates');
					const programmaticTemplatePath = configuration['ProgrammaticTemplatePath'];
					// TODO: run basicAsyncExample.js maybe if this argument is not supplied
					if (!programmaticTemplatePath) {
						vscode.window.showInformationMessage("Error: please set 'programmaticTemplatePath' to absolute path of the script you want to invoke, in your settings.json. If you want to try out an example, you can download any file , for ex: https://github.com/sktguha/programmaticTemplatesExamples/blob/master/basicAsyncExample.js and set it to the absolute path of the downloaded file ");
						return;
					}
					const importFresh = require('import-fresh');
					// import fresh so that its easier to test the changes without restarting
					// for now scripts can maybe use the store object supplied for any long term usage or file system maybe
					const userScript = importFresh(programmaticTemplatePath);
					const promise = userScript({
						// TODO: add more params to pass to userScript here
						selectedText: word,
						absolutePath: vscode.window.activeTextEditor?.document.fileName,
						log: (str: any) => {
							vscode.window.showInformationMessage("msg from your script: " + str);
						},
						store
					});
					// handle in case string is returned and not promise
					const result = await promise;
					if (!result) {
						vscode.window.showInformationMessage("your script didn't return any value. To debug why, you can call the log function supplied as a property on the first arguent. see a simple 4 line example here: https://github.com/sktguha/programmaticTemplatesExamples/blob/master/basicAsyncExample.js");
						return;
					}
					editor.edit(editBuilder => {
						editBuilder.replace(selection, result);
					});
				}
			} catch (err) {
				console.log("error occurred", err);
				vscode.window.showInformationMessage("error occurred:" + err.toString() + " : JSON stringified error: " + JSON.stringify(err));
			}
		})
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.addToState', () => {
			// const axios = require('axios');
			// const editor = vscode.window.activeTextEditor;
			// const lastSel = editor?.selections.sort((a, b) => a.start.line - b.start.line).pop();
			// let cursorPosition = lastSel?.end;
			// let wordRange = cursorPosition && editor?.document.getWordRangeAtPosition(cursorPosition);
			// let highlight = wordRange && editor?.document.getText(wordRange);
			// axios.get('http://localhost:9090?command=state&path='+vscode.window.activeTextEditor?.document.fileName+"&line="+lastSel?.end.line+"&char="+lastSel?.end.character+"&high="+highlight);
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
