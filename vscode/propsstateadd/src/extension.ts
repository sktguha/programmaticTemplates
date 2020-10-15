// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "propsstateadd" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(
        vscode.commands.registerCommand('extension.addToProps', () => {
			const axios = require('axios');
			const editor = vscode.window.activeTextEditor;
			console.log(editor);
			const lastSel = editor?.selections.sort((a, b) => a.start.line - b.start.line).pop();
			console.log(lastSel);
			let cursorPosition = lastSel?.end;
			let wordRange = cursorPosition && editor?.document.getWordRangeAtPosition(cursorPosition);
			let highlight = wordRange && editor?.document.getText(wordRange);
			console.log(cursorPosition, wordRange, highlight);
			axios.get('http://localhost:9090?command=props&path='+vscode.window.activeTextEditor?.document.fileName+"&line="+lastSel?.end.line+"&char="+lastSel?.end.character+"&high="+highlight);
		})
	);	
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.addToState', () => {
			const axios = require('axios');
			const editor = vscode.window.activeTextEditor;
			const lastSel = editor?.selections.sort((a, b) => a.start.line - b.start.line).pop();
			let cursorPosition = lastSel?.end;
			let wordRange = cursorPosition && editor?.document.getWordRangeAtPosition(cursorPosition);
			let highlight = wordRange && editor?.document.getText(wordRange);
			axios.get('http://localhost:9090?command=state&path='+vscode.window.activeTextEditor?.document.fileName+"&line="+lastSel?.end.line+"&char="+lastSel?.end.character+"&high="+highlight);
        })
      );
}

// this method is called when your extension is deactivated
export function deactivate() {}
