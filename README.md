# Programmatic Templates
write code snippets in full blown javascript(node.js) instead of simple static json, thus giving more power in the hands of the developer
# WARNING 
Only run scripts from sources/people you trust. As there is **NO SANDBOXING** mechanism whatsoever yet https://github.com/sktguha/programmaticTemplates/issues/1<br/>
# How to use
(contact me sktguha2@gmail.com if you are facing issues, will post better instructions soon) : <br/>
Need to install the vscode extension from the vscode-plugin folder, and specify absolute path to the replaced script in extension options ( basically in settings.json add new option, "progTemplates.ProgrammaticTemplatePath": "/absolute/path/to/your/replacerScript.js" , for a simple 4 line example see: https://github.com/sktguha/programmaticTemplatesExamples/blob/master/basicAsyncExample.js)
Then invoke the extension shortcut and selected text will be replaced by the output from your script (your script gets various options in the first argument) 
<br/> See examples here: https://github.com/sktguha/programmaticTemplatesExamples

