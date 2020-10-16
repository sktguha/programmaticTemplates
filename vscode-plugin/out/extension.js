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
    console.log('Congratulations, your extension "programmaticTemplates" is now active!');
    // supply this to scripts as we are always importing freshly everytime so its easier for testing. so they can use this for any long term usages.
    // although most scripts shouldn't need it
    const store = {};
    context.subscriptions.push(vscode.commands.registerCommand('progTemplates.execAndReplaceSelection', () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            console.log('command invoked progTemplates.execAndReplaceSelection');
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
                    // vscode.window.showErrorMessage("Error: please set 'progTemplates.ProgrammaticTemplatePath' in your settings.json to absolute path of the script you want to invoke. see https://github.com/sktguha/programmaticTemplates#running-custom-scripts for more information");
                    const exampleReplaced = `replaced selected text : '${word}' with custom value. To run your own custom replacer function instead(in node.js itself, NO custom language required), follow the steps here : https://github.com/sktguha/programmaticTemplates#running-custom-scripts`;
                    editor.edit(editBuilder => {
                        editBuilder.replace(selection, exampleReplaced);
                    });
                    return;
                }
                const importFresh = require('import-fresh');
                // import fresh so that its easier to test the changes without restarting
                // for now scripts can maybe use the store object supplied for any long term usage or file system maybe
                const userScript = importFresh(programmaticTemplatePath);
                const toStr = (arg) => {
                    try {
                        return JSON.stringify(arg);
                    }
                    catch (err) {
                        return arg.toString();
                    }
                };
                const logFn = (...args) => vscode.window.showInformationMessage("msg from your script: " + args.map(toStr).join(" , "));
                const errorFn = (...args) => vscode.window.showErrorMessage("msg from your script: " + args.map(toStr).join(" , "));
                const options = {
                    absolutePath: (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.fileName,
                    log: logFn,
                    showError: errorFn,
                    store,
                    selections: editor.selections
                };
                const oldLog = console.log;
                console.log = logFn;
                const oldError = console.error;
                console.error = errorFn;
                const promise = userScript(word, options);
                console.log = oldLog;
                console.error = oldError;
                console.log("all good");
                console.error("all good");
                // handle in case string is returned and not promise
                const result = yield promise;
                if (!result) {
                    vscode.window.showErrorMessage("your script didn't return any value. To debug why, you can call the log function supplied as a property on the first arguent. see a simple 4 line example here: https://github.com/sktguha/programmaticTemplatesExamples/blob/master/basicAsyncExample.js");
                    return;
                }
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, result);
                });
            }
        }
        catch (err) {
            console.error = console.log = console.info;
            console.log("error occurred", err);
            vscode.window.showErrorMessage("error occurred while running your script:" + err.toString() + " \nerror stack: " + err.stack + " : \nJSON stringified error: " + JSON.stringify(err));
        }
    })));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    vscode.window.showInformationMessage("Sorry to see you go!. Please mail me sktguha2@gmail.com or create new issue at https://github.com/sktguha/programmaticTemplates/issues/new");
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map