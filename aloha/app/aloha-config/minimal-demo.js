(function(window, undefined) {

	if (window.Aloha === undefined || window.Aloha === null) {
		var Aloha = window.Aloha = {};
	}
	
	/*
		This is a minimal Aloha Editor configuration
		
		In this Aloha Editor Demo Demo we add a custom plugin.
		This plugin is located in our own specific plugin bundle.
		*/
		Aloha.settings = {
			logLevels: { 'error': true, 'warn': true, 'info': true, 'debug': false, 'deprecated': true },
			locale: 'en',
			bundles: {
				// Path for custom bundle relative from Aloha.settings.baseUrl usually path of aloha.js
				cmsplugin: '/js/aloha/plugins'
			},
			plugins: {
				format: {
				// all elements with no specific configuration get this configuration
				config : [  'b', 'i', 'sub', 'sup', 'del' ],
				editables : {
						// no formatting allowed for title
						'h1'	: [  ]
					}
				},
				link: {
					config: ["a"],
 				    editables: {
				        // No links in the title.
				        "h1": []
				    },

				}
			}
		};
		Aloha.settings.floatingmenu = {
			width: 630, // with of the floating menu; auto calculated when not set
			behaviour: 'topalign', // 'float' (default), 'topalign', 'append'
			draggable: false, // boolean
			marginTop: 10, // number in px
			horizontalOffset: 0, // number in px -- used with 'topalign' behaviour
			topalignOffset: 0, // number in px -- used with 'topalign' behaviour
		};
})(window);