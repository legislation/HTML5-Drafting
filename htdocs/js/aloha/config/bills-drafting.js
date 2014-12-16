(function(window, undefined) {

    if (window.Aloha === undefined || window.Aloha === null) {
        var Aloha = window.Aloha = {};
    }   
 
    Aloha.settings = {
        logLevels: {
            'error': true, 
            'warn': true, 
            'info': true, 
            'debug': false, 
            'deprecated': true
        },
        errorhandling : false,
        ribbon: false,
        locale: 'en',
        floatingmenu: {
            width: 630
        },
        bundles: {
            // Path for custom bundle relative from Aloha.settings.baseUrl usually path of aloha.js
            //cmsplugin: '../plugins',
          /*  oer: '../plugins/oer'*/
        },
        placeholder: {
            ".PrimaryPrelims .Title":"Legislation Title",
            ".PrimaryPrelims .Number":"Legislation Number",
            ".PrimaryPrelims .LongTitle":"Long Title",
            ".Part_handle .editable":"Part Title",
            ".Chapter_handle .editable":"Chapter Title",
            ".Pblock>.Title":"Section Title",
            ".P1group_handle .editable":"Subsection Title",
            ".P1group div.editable":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum dolor quis faucibus suscipit. Nam ut ultricies metus. Duis quis magna et nisl ornare gravida vel sed nunc. Donec ornare viverra ante, vel iaculis lacus venenatis ut. Nulla vehicula, mauris ac consequat venenatis, justo enim laoreet magna, ac pellentesque leo nisi a augue. Nam feugiat nibh lectus, id sagittis nisi vestibulum sed. Donec ac ipsum velit. Phasellus vitae eleifend nibh, quis egestas sem. Ut a tincidunt nunc. Ut nec lacus blandit metus dignissim dignissim. Nulla facilisi. Fusce quis lacus feugiat, faucibus eros id, aliquet felis. Suspendisse imperdiet non lectus et tristique. Vestibulum vitae lacinia purus, a tempus ipsum. Sed dapibus aliquam ipsum. Aliquam quis facilisis orci, dapibus convallis leo."
        },
        contentHandler: {
            insertHtml: [ 'word', 'generic', 'oembed', 'sanitize' ],
            initEditable: [ 'generic' ],
            getContents: [ 'blockelement', 'sanitize', 'basic' ],
            sanitize: 'basic', // relaxed, restricted, basic,
            allows: {
                elements: [
                    'strong', 'em', 'i', 'b', 'blockquote', 'br', 'cite', 'code', 'dd', 'div', 'dl', 'dt', 'em',
                    'i', 'li', 'ol', 'p', 'pre', 'q', 'small', 'strike', 'sub',
                    'sup', 'u', 'ul'],
         
                attributes: {
                    'a'         : ['href'],
                    'blockquote': ['cite'],
                    'q'         : ['cite'],
                    'li'        : ['id','data-number','data-type']
                },
                protocols: {
                    'a'         : {'href': ['ftp', 'http', 'https', 'mailto', '__relative__']}, // Sanitize.RELATIVE
                    'blockquote': {'cite': ['http', 'https', '__relative__']},
                    'q'         : {'cite': ['http', 'https', '__relative__']}
                }
            },
            handler: {
                generic: {
                    transformFormattings: false // this will disable the transformFormattings method in the generic content handler
                },
                sanitize: {
                    '.aloha-captioned-image-caption': { elements: [ 'em', 'strong' ] }
                }
            }
        },
      //  placeholder :true,
        repositories: {
            linklist: {
                data: [
                {
                    name: 'Aloha Developers Wiki', 
                    url:'http://www.aloha-editor.com/wiki', 
                    type:'website', 
                    weight: 0.50
                },
                {
                    name: 'Aloha Editor - The HTML5 Editor', 
                    url:'http://aloha-editor.com', 
                    type:'website', 
                    weight: 0.90
                },
                {
                    name: 'Aloha Demo', 
                    url:'http://www.aloha-editor.com/demos.html', 
                    type:'website', 
                    weight: 0.75
                },
                {
                    name: 'Aloha Wordpress Demo', 
                    url:'http://www.aloha-editor.com/demos/wordpress-demo/index.html', 
                    type:'website', 
                    weight: 0.75
                },
                {
                    name: 'Aloha Logo', 
                    url:'http://www.aloha-editor.com/images/aloha-editor-logo.png', 
                    type:'image', 
                    weight: 0.10
                }
                ]
            }
        },
        plugins: {
            format: {
                // all elements with no specific configuration get this configuration
                config : [  'b', 'i', 'p', 'sub', 'sup', 'del', 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'removeFormat' ],
                editables : {
                    // no formatting allowed for title
                    'h1'	: [  ]
                }
            },
            list: {
                // all elements with no specific configuration get an UL, just for fun :)
                config : [ 'ul', 'ol' ],
                editables : {
                    // Even if this is configured it is not set because OL and UL are not allowed in H1.
                    'h1'	: [  ]
                }
            },
            abbr: {
                // all elements with no specific configuration get an UL, just for fun :)
                config : [ 'abbr' ],
                editables : {
                    // Even if this is configured it is not set because OL and UL are not allowed in H1.
                    '#top-text'	: [  ]
                }
            },	
            link: {
                // all elements with no specific configuration may insert links
                config : [ 'a' ],
                editables : {
                    // No links in the title.
                    'h1'	: [  ]
                },
                // all links that match the targetregex will get set the target
                // e.g. ^(?!.*aloha-editor.com).* matches all href except aloha-editor.com
                targetregex : '^(?!.*aloha-editor.com).*',
                // this target is set when either targetregex matches or not set
                // e.g. _blank opens all links in new window
                target : '_blank',
                // the same for css class as for target
                cssclassregex : '^(?!.*aloha-editor.com).*',
                cssclass : 'aloha',
                // use all resources of type website for autosuggest
                objectTypeFilter: ['website'],
                // handle change of href
                onHrefChange: function( obj, href, item ) {
                    var jQuery = Aloha.require('jquery');
                    if ( item ) {
                        jQuery(obj).attr('data-name', item.name);
                    } else {
                        jQuery(obj).removeAttr('data-name');
                    }
                }
            },
            table: {
                // all elements with no specific configuration are not allowed to insert tables
                config : [ 'table' ],
                editables : {
                    // Don't allow tables in top-text
                    'h1'	: [ '' ]
                },
                summaryinsidebar : true,
                // [{name:'green', text:'Green', tooltip:'Green is cool', iconClass:'GENTICS_table GENTICS_button_green', cssClass:'green'}]
                tableConfig : [
                {
                    name:'hor-minimalist-a'
                },

                {
                    name:'box-table-a'
                },
                {
                    name:'hor-zebra'
                },
                ],
                columnConfig : [
                {
                    name: 'table-style-bigbold',  
                    iconClass: 'aloha-button-col-bigbold'
                },

                {
                    name: 'table-style-redwhite', 
                    iconClass: 'aloha-button-col-redwhite'
                }
                ],
                rowConfig : [
                {
                    name: 'table-style-bigbold',  
                    iconClass: 'aloha-button-row-bigbold'
                },

                {
                    name: 'table-style-redwhite', 
                    iconClass: 'aloha-button-row-redwhite'
                }
                ]

            }/*,
            math:{
                config : [  'b', 'i', 'p', 'sub', 'sup', 'del', 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'removeFormat' ],
                editables : {
                    // no formatting allowed for title
                    'h1'    : [  ]
                }

            }*/,
            block:{
                defaults :{
                    '.xref-internal': {
                        'aloha-block-type': 'xrefBlock'
                    }
                }
            },
            image: {
                config :{
                    'fixedAspectRatio': true,
                    'maxWidth': 600,
                    'minWidth': 20,
                    'maxHeight': 600,
                    'minHeight': 20,
                    'globalselector': '.global',
                    'ui': {
                        'oneTab': true
                    }
                },
                editables : {
                    // Don't allow tables in top-text
                    'h1'    : [ '' ]
                }
            /*'fixedAspectRatio': false,
				'maxWidth': 600,
				'minWidth': 20,
				'maxHeight': 600,
				'minHeight': 20,
				'globalselector': '.global',
				'ui': {
					'oneTab': true,
					'align': false,
					'margin': false
				}*/
            },
            cite: {
                referenceContainer: '#references'
            },
            formatlesspaste :{
                formatlessPasteOption : true
            },          
            xref: {
				config : [  'b', 'i', 'p', 'sub', 'sup', 'del', 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'removeFormat' ],
                editables : {
                    // no formatting allowed for title
                    'h1'	: [  ]
                }
            },	
            xref2: {
                config : [  'b', 'i', 'p', 'sub', 'sup', 'del', 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'removeFormat' ],
                editables : {
                    // no formatting allowed for title
                    'h1'    : [  ]
                }
            }   	
        },
        toolbar: {
            tabs: [
            // Format Tab
            {
                label: 'tab.format.label',
                showOn: {
                    scope: 'Aloha.continuoustext'
                },
                components: [
                [
                'bold', 'strong', 'italic', 'emphasis', 'underline',
                'subscript', 'superscript', 'strikethrough', 'code', 'quote'
                ], [
                'formatAbbr','xrefButton' ,'xrefButton_update','insert-definition'  /*, 'insertMath'*/, 'formatNumeratedHeaders', 'toggleDragDrop', '\n',
                'wailang', 'toggleFormatlessPaste'
                ], [
                'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', '\n',
                'orderedList', 'indentList', 'outdentList', 'colorPicker'
                ], [
               
                ]
                ]
            },
            // Insert Tab
            {
                label: "tab.insert.label",
                showOn: {
                    scope: 'Aloha.continuoustext'
                },
                components: [
                [ "createTable", "characterPicker", 
                "insertImage", "insertAbbr", "insertToc",
                "insertHorizontalRule", "insertTag"]
                ]
            },
            // XREF
            {
                label: 'XRef',
                showOn: {
                    scope: 'Aloha.Block.xrefBlock'
                },
                components: [
                 [ "insertHorizontalRule" ]
                ]
            },
            // Link Tab
            {
                label: 'tab.link.label',
                showOn: {
                    scope: 'link'
                },
                components: [ 'editLink', 'removeLink', 'linkBrowser' ]
            },
            // Image Tab
            {
                label: "tab.img.label",
                showOn: {
                    scope: 'image'
                },
                components: [
                [ "imageSource", "\n",
                "imageTitle" ],
                [ "imageResizeWidth", "\n",
                "imageResizeHeight" ],
                [ "imageAlignLeft", "imageAlignRight", "imageAlignNone", "imageIncPadding", "\n",
                "imageCropButton", "imageCnrReset", "imageCnrRatio", "imageDecPadding" ],
                [ "imageBrowser" ]
                ]
            },
            // Abbr Tab
            {
                label: "tab.abbr.label",
                showOn: {
                    scope: 'xrefBlock'
                },
                components: [
                [ "abbrText", "removeAbbr" ]
                ]
            },
             // Abbr Tab
          /* {
                label: "tab.abbr.label",
                showOn: {
                    scope: 'xrefBlock'
                },
                components: [
                [ "abbrText", "removeAbbr" ]
                ]
            },*/
            // Wailang Tab
            {
                label: "tab.wai-lang.label",
                showOn: {
                    scope: 'wai-lang'
                },
                components: [ [ "wailangfield", "removewailang" ] ]
            },
            // Table Tabs
            {
                label: "tab.table.label",
                showOn: {
                    scope: 'table.cell'
                },
                components: [
                [ "mergecells", "splitcells", "tableCaption",
                "naturalFit", "tableSummary" ],
                [ "formatTable" ]
                ]
            },
            {
                label: "tab.col.label",
                showOn: {
                    scope: 'table.column'
                },
                components: [
                [ "addcolumnleft", "addcolumnright", "deletecolumns",
                "columnheader", "mergecellsColumn", "splitcellsColumn",
                "formatColumn" ]
                ]
            },
            {
                label: "tab.row.label",
                showOn: {
                    scope: 'table.row'
                },
                components: [
                [ "addrowbefore", "addrowafter", "deleterows", "rowheader",
                "mergecellsRow", "splitcellsRow", "formatRow" ]
                ]
            },
            {
                label: "tab.cell.label",
                showOn: {
                    scope: 'table.cell'
                },
                components: [
                [ "alignTop", "alignMiddle", "alignBottom", "formatCell" ]
                ]
            }

            ],
            exclude: [ 'Format','link','unorderedList','insertLink' ]
        },
        floatingmenu:{
            width: 940, // with of the floating menu; auto calculated when not set
            behaviour: 'topaligns', // 'float' (default), 'topalign', 'append'
            draggable: false, // boolean
            marginTop: 10, // number in px
            horizontalOffset: 0, // number in px -- used with 'topalign' behaviour
            topalignOffset: 0, // number in px -- used with 'topalign' behaviour
        }
    };
    
})(window);
