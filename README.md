# Programmatic Templates
write code snippets in full blown javascript(node.js) instead of simple static json, thus giving more power in the hands of the developer
# WARNING 
Only run scripts from sources/people you trust. As there is **NO SANDBOXING** mechanism whatsoever yet https://github.com/sktguha/programmaticTemplates/issues/1<br/>
# How to use
(contact me sktguha2@gmail.com if you are facing issues) : <br/>
1. Download the vsix file from: https://github.com/sktguha/programmaticTemplates/blob/main/vscode-plugin/programmatic-templates-0.0.1.vsix and then run <br/>
`code --install-extension programmatic-templates-0.0.1.vsix` <br/>in your downloads folder (if code command is not installed , install code command from vscode , see for mac: https://code.visualstudio.com/docs/setup/mac ) </br><br/>
2. specify absolute path to the replaced script in extension options ( basically in settings.json add new option, "progTemplates.ProgrammaticTemplatePath": "/absolute/path/to/your/replacerScript.js" , for a simple 4 line example see: https://github.com/sktguha/programmaticTemplatesExamples/blob/master/basicAsyncExample.js)<br/><br/>
3. Also assign a keyboard shortcut and invoke the extension shortcut(for now need to invoke from keyboard shortcut only, else it gives issues) and selected text will be replaced by the output from your script (your script gets various options in the first argument) 
<br/> See examples here: https://github.com/sktguha/programmaticTemplatesExamples

