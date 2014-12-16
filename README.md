#Readme

##Aloha based Bill's drafting alpha(2)

Refactored from `/aloha` to using `/htdocs`, `/legislation` and `/xslt` folders, so point an apache conf to the `/htdocs` folder and ignore `/aloha`


###Current issues
Plugins location, `/htdocs/js/plugins` shouldn't exist the correct location is `/htdocs/js/aloha/plugins` there is some dependency on the location which needs found and sorted

More refactoring needed, current js edits in `/js/demo-app.js`. Requirejs is available needs to be used to create different modules