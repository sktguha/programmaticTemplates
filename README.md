# Programmatic Templates
TODO: will add soon the powerful replacer script after removing company specific data, which using to create component, types,reducers ,actions,middleware and basic tests also, which was the main motivation behind this vscode extension.
<br/> Write code snippets in full blown javascript(node.js) instead of simple static json, thus giving more power in the hands of the developer
# WARNING 
Only run scripts from sources/people you trust. As there is **NO SANDBOXING** mechanism whatsoever yet https://github.com/sktguha/programmaticTemplates/issues/1<br/>
# How to use
(contact me sktguha2@gmail.com if you are facing issues or create a new issue here itself: https://github.com/sktguha/programmaticTemplates/issues/new?title=problem%20in%20setting%20up ) : <br/>
1. Download the vsix file from: https://github.com/sktguha/programmaticTemplates/blob/main/vscode-plugin/programmatic-templates-0.0.1.vsix?raw=true and then run <br/>
`code --install-extension programmatic-templates-0.0.1.vsix` <br/>in your downloads folder (if code command is not installed , install code command from vscode , see for mac: [https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) )<br/>
Please also see steps 2 and 3 below </br><br/>
# running-custom-scripts
2. specify absolute path to the replacer script in extension options ( basically in settings.json add new option, `"progTemplates.ProgrammaticTemplatePath": "/absolute/path/to/your/replacerScript.js"` , for a simple 4 line example download this script: https://github.com/sktguha/programmaticTemplatesExamples/blob/master/basicAsyncExample.js?raw=true and set the option "progTemplates.ProgrammaticTemplatePath" described above to the absolute path, for example in mac it probably would be <br/>
`"progTemplates.ProgrammaticTemplatePath": "/Users/<your_user_name>/Downloads/basicAsyncExample.js"`
<br/>)<br/><br/>
3. You are all set! select any text in your code and press the keyboard shortcut(ctrl+z by default, TODO: change it in windows or you can reassign it from settings) or open command palette(command+shift+p in mac) and type (without quotes) '>Execute the script and replace selected text' and select the command from the dropdown and selected text will be replaced by the output from your script (your script gets selectedText, a string as the first argument and various things as an options object in the second argument TODO: document these options) 
<br/> See examples of replacer scripts here: https://github.com/sktguha/programmaticTemplatesExamples

