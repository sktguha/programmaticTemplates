"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "propsstateadd" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('extension.addToProps', () => {
        var _a;
        const axios = require('axios');
        const editor = vscode.window.activeTextEditor;
        console.log(editor);
        const lastSel = editor === null || editor === void 0 ? void 0 : editor.selections.sort((a, b) => a.start.line - b.start.line).pop();
        console.log(lastSel);
        let cursorPosition = lastSel === null || lastSel === void 0 ? void 0 : lastSel.end;
        let wordRange = cursorPosition && (editor === null || editor === void 0 ? void 0 : editor.document.getWordRangeAtPosition(cursorPosition));
        let highlight = wordRange && (editor === null || editor === void 0 ? void 0 : editor.document.getText(wordRange));
        console.log(cursorPosition, wordRange, highlight);
        axios.get('http://localhost:9090?command=props&path=' + ((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.fileName) + "&line=" + (lastSel === null || lastSel === void 0 ? void 0 : lastSel.end.line) + "&char=" + (lastSel === null || lastSel === void 0 ? void 0 : lastSel.end.character) + "&high=" + highlight);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.addToState', () => {
        var _a;
        const axios = require('axios');
        const editor = vscode.window.activeTextEditor;
        const lastSel = editor === null || editor === void 0 ? void 0 : editor.selections.sort((a, b) => a.start.line - b.start.line).pop();
        let cursorPosition = lastSel === null || lastSel === void 0 ? void 0 : lastSel.end;
        let wordRange = cursorPosition && (editor === null || editor === void 0 ? void 0 : editor.document.getWordRangeAtPosition(cursorPosition));
        let highlight = wordRange && (editor === null || editor === void 0 ? void 0 : editor.document.getText(wordRange));
        axios.get('http://localhost:9090?command=state&path=' + ((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.fileName) + "&line=" + (lastSel === null || lastSel === void 0 ? void 0 : lastSel.end.line) + "&char=" + (lastSel === null || lastSel === void 0 ? void 0 : lastSel.end.character) + "&high=" + highlight);
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map