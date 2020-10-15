"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    context.subscriptions.push(vscode.commands.registerCommand('extension.addToProps', () => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('props');
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const document = editor.document;
                const selection = editor.selection;
                // Get the word within the selection
                const word = document.getText(selection);
                const workbenchConfig = vscode.workspace.getConfiguration('workbench');
                let programmaticTemplatePath = workbenchConfig.get('programmaticTemplatePath') || "";
                if (!programmaticTemplatePath) {
                    vscode.window.showInformationMessage("Error: please set 'programmaticTemplatePath' to absolute path of the script you want to invoke, in your settings.json");
                    return;
                }
                const userScript = require(programmaticTemplatePath);
                const promise = userScript({
                    // TODO: add more params to pass to userScript here
                    selectedText: word,
                    log: (str) => {
                        vscode.window.showInformationMessage("msg from your script: " + str);
                    }
                });
                // handle in case string is returned and not promise
                const result = yield promise;
                if (!result) {
                    vscode.window.showInformationMessage("your script didn't return any value. To debug why, you can call the log function supplied as a property on the first arguent. see a simple 4 line example here: https://github.com/sktguha/programmaticTemplatesExamples/blob/master/basicAsyncExample.js");
                    return;
                }
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, result);
                });
            }
        }
        catch (err) {
            console.log("error occurred", err);
            vscode.window.showInformationMessage("error occurred:" + JSON.stringify(err));
        }
    })));
    context.subscriptions.push(vscode.commands.registerCommand('extension.addToState', () => {
        // const axios = require('axios');
        // const editor = vscode.window.activeTextEditor;
        // const lastSel = editor?.selections.sort((a, b) => a.start.line - b.start.line).pop();
        // let cursorPosition = lastSel?.end;
        // let wordRange = cursorPosition && editor?.document.getWordRangeAtPosition(cursorPosition);
        // let highlight = wordRange && editor?.document.getText(wordRange);
        // axios.get('http://localhost:9090?command=state&path='+vscode.window.activeTextEditor?.document.fileName+"&line="+lastSel?.end.line+"&char="+lastSel?.end.character+"&high="+highlight);
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map