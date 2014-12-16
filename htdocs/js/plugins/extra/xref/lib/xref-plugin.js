/* Basic Plugin Example 
* To complete
*/

define(['aloha/plugin',  'block/block', 'block/blockmanager','ui/ui', 'ui/button','ui/scopes',  'jquery'], function (Plugin,Block, BlockManager, Ui, Button, Scopes,jQuery) {
	'use strict';

	var Aloha = window.Aloha;
	var xrefBlock;
	var GENTICS = window.GENTICS;

	xrefBlock = Block.AbstractBlock.extend({
      shouldDestroy: function() {
        return true;
      }
    });
    BlockManager.registerBlockType('xrefBlock', xrefBlock);
 	var blockTemplate = jQuery('<span class="xref_inline"/>');

	var pluggedIn = Plugin.create('xref', {
		/**
		 * In our constructor we call the 
		 * constructor of our superclass.
		 */
		 _constructor: function(){
		 	this._super('xref');
		 	this.subscribeEvents();
		 },

		/**
		 * Initialize the plugin
		 */
		 init: function () {
			var that = this;
		 	that.createButtons();
			Aloha.ready( function (ev, sidebars) { 
				that.initSidebar(Aloha.Sidebar.right);
			});

		 },

		/**
		 * Initialize the buttons
		 */
		 createButtons: function () {
		 	var that = this;

		 	that.xrefButton = Ui.adopt("xrefButton", Button, {
				icon: 'aloha-icon aloha-icon-link',
				tooltip:'Add Cross Reference',
				scope: 'Aloha.continuoustext',
				iconOnly:true,
		 		click: function(){
		 			if ( typeof range === 'undefined' ) {
						that.selectedRange = Aloha.Selection.getRangeObject();   
					}else{
						null;
					}
					//console.log(that.selectedRange);
		 			that.buttonClicked = true;
		 			that.ammendClicked = false;
		 			if(Aloha.Sidebar.right.opened){
		 				//console.log("here");
		 				Aloha.Sidebar.right.activate();
		 			}else{
		 				Aloha.Sidebar.right.open();
		 			}
		 		}				
		 	});
		 	/*that.xrefButton_update = Ui.adopt("xrefButton_update", Button, {
				icon: 'aloha-icon aloha-icon-link',
				tooltip:'Update Cross Reference',
				scope: 'Aloha.continuoustext',
				iconOnly:true,
		 		click: function(){
		 			if ( typeof range === 'undefined' ) {
						that.selectedRange = Aloha.Selection.getRangeObject();   
					}else{
						null;
					}
					//console.log(that.selectedRange);
		 			that.buttonClicked = true;
		 			that.ammendClicked = true;
		 			if(Aloha.Sidebar.right.opened){
		 				Aloha.Sidebar.right.close();
		 				Aloha.Sidebar.right.open();
		 			}else{
		 				Aloha.Sidebar.right.open();
		 			}
		 		}				

		 	});*/
		 },


		
		subscribeEvents: function () {
			var me = this;
			var editableConfig = {};

			Aloha.bind('aloha-xref-selection-clicked', function (event,e,originatorThis) {
				//console.log(originatorThis);
				me.buttonClicked = true;
				me.ammendClicked = true;
				var range = Aloha.createRange();
			
				// setStart and setEnd take dom node and the offset as parameters
				range.setStart( originatorThis, 0);
				range.setEnd( originatorThis, 1);

				// add the range to the selection
				Aloha.getSelection().removeAllRanges();
				Aloha.getSelection().addRange( range );

	 			if(Aloha.Sidebar.right.opened){
	 				//console.log("ASR",Aloha.Sidebar.right);
	 				Aloha.Sidebar.right.activate();
	 			}else{
	 				Aloha.Sidebar.right.open();
	 			}

			});
			Aloha.bind('aloha-selection-changed', function (event, range) {
		      // console.log(event,range);
  				if($(range.commonAncestorContainer).closest(".aloha-block").length){
					/*Scopes.enterScope(me.name, 'xrefBlock');
					me.xrefButton.hide();
					me.xrefButton_update.show();*/
  				}else{
  					Aloha.Sidebar.right.close();
  					Scopes.leaveScope(me.name, 'xrefBlock', true);
					me.xrefButton.show();
				//	me.xrefButton_update.hide();
  				}
		       
		    });
		},
		
		config: ['true'],
		buttonClicked: false,
		ammendClicked: false,
		searcbed: false,
		
		//activeOn: 'a,span,div,p,q,blockquote,h1,h2,h3,h4,h5,h6,em,i,b',
		
		activeOn : function(effective) {
			if (typeof this.settings.disabled === 'boolean' && this.settings.disabled) {
				return false;
			}
			if (typeof effective != 'undefined' && effective != null) {
				return true;
			}
			return false;
		},

		sidebarAccordion: function(){
			//console.log("sidebarAccordion");
			jQuery( "#aloha-link-sidebar-panel-structural-map  .Part_accordion_panel" ).accordion({
				collapsible: true,
				heightStyle: "content",
				header: "p.Part_title"
			});
			jQuery( "#aloha-link-sidebar-panel-structural-map  .Chapter_accordion_panel" ).accordion({
				active:false,
				collapsible: true,
				heightStyle: "content",
				header: "p.Chapter_title"
			});
			jQuery( "#aloha-link-sidebar-panel-structural-map  .Pblock_accordion_panel" ).accordion({
				active:false,
				collapsible: true,
				heightStyle: "content",
				header: "p.Pblock_title"
			});
			jQuery( "#aloha-link-sidebar-panel-structural-map  .P1group_accordion_panel" ).accordion({
				active:false,
				collapsible: true,
				heightStyle: "content",
				header: "p.P1group_title"
			});
			jQuery( "#aloha-link-sidebar-panel-structural-map  .content_accordion_panel" ).accordion({
				active:false,
				collapsible: true,
				heightStyle: "content",
				header: "> li > p.content_title"
			});
			/*
			jQuery( "#aloha-link-sidebar-panel-structural-map  .content_accordion_panel_2" ).accordion({
				active:false,
				collapsible: true,
				heightStyle: "content",
				header: "p.content_title_2"
			});
			jQuery( "#aloha-link-sidebar-panel-structural-map  .content_accordion_panel_3" ).accordion({
				active:false,
				collapsible: true,
				heightStyle: "content",
				header: "p.content_title_3"
			});*/
		},
		sidebarAccordionExternal: function(){
			//console.log("sidebarAccordion");
			jQuery( "#aloha-link-sidebar-panel-external-search  .Part_accordion_panel" ).accordion({
				collapsible: true,
				heightStyle: "content",
				header: "p.Part_title"
			});
			jQuery( "#aloha-link-sidebar-panel-external-search  .Chapter_accordion_panel" ).accordion({
				active:false,
				collapsible: true,
				heightStyle: "content",
				header: "p.Chapter_title"
			});
			jQuery( "#aloha-link-sidebar-panel-external-search  .Pblock_accordion_panel").accordion({
				active:false,
				collapsible: true,
					heightStyle: "content",
				header: "p.Pblock_title"
			});
			jQuery( "#aloha-link-sidebar-panel-external-search  .P1group_accordion_panel" ).accordion({
				active:false,
				collapsible: true,
				heightStyle: "content",
				header: "p.P1group_title"
			});
		},

		sidebarButtons : function(){
			var pl = this;
			$("#aloha-link-sidebar-panel-structural-map .xref-button").on("click.xref",function(event){
				pl.buttonClicked = false;
				Aloha.Sidebar.right.close();
				pl.insertAbbr($(this).attr("href"),"xref xref-internal",event,this);
			});
		},
		sidebarButtonsExternal : function(){
			var pl = this;
			$("#aloha-link-sidebar-panel-external-search .xref-button").on("click.xref",function(event){
				pl.buttonClicked = false;
				Aloha.Sidebar.right.close();
				pl.insertAbbr($(this).attr("href"),"xref xref-external",event,this);
				return false;
			});
		},
		insertAtCursor: function(template) {
			var $element, range,
			that = this;
			$element = jQuery(template);
			range = Aloha.Selection.getRangeObject();
			$element.addClass('semantic-temp');
			GENTICS.Utils.Dom.insertIntoDOM($element, range, Aloha.activeEditable.obj);
			$element = Aloha.jQuery('.semantic-temp').removeClass('semantic-temp');
			return that.activate($element);
		},
		activate : function($element){
		var controls = $();
           $element.wrap(blockTemplate).parent().append(controls).alohaBlock({
            'aloha-block-type': 'xrefBlock',
            'dragdrop' : false
          });
		},
		/**
		 * Check whether inside a abbr tag
		 * @param {GENTICS.Utils.RangeObject} range range where to insert the object (at start or end)
		 * @return markup
		 * @hide
		 */
		findAbbrMarkup: function ( range ) {
			if ( typeof range == 'undefined' ) {
		        var range = Aloha.Selection.getRangeObject();
		    }
			
			if ( Aloha.activeEditable ) {
			    return range.findMarkup( function() {
			    	
			        return $(this).hasClass("xref_inline");
			    }, Aloha.activeEditable.obj );
			} else {
				return null;
			}
		},
		insertAbbr: function ( href,button,event,eventHandlerThis ) {
		    var that = this;
			var className = $(href).attr("class");
			var $inlineblock = $('<span />');
		    var number = $(href + ">*>.number").text();
		    var range = Aloha.Selection.getRangeObject();

			var moreNumbers = false;
			var rangeAncestorId =(range.commonAncestorContainer.id);
			var $container = $("#"+rangeAncestorId).closest(".P1group_content");
 			var foundMarkup =  this.findAbbrMarkup( range ) ;
		    var layers = $(href).parentsUntil(".P1group_content").length;
			

		 	if ( foundMarkup ) {
		 		$container = $(".xref",foundMarkup).closest(".P1group_content");
		 	}


		    if($(href).data("number")){
		    	number = $(href).attr("data-number");
		    	switch($(href).attr("data-list-type")){
		    		case "lower-alpha":
		    			number = String.fromCharCode(96 + Number(number));
		    			break;
	    			case "lower-roman":
						var newnumber = "";
						for(var i = 0;i < number;i++){
							newnumber += "i";
						}
						number = newnumber;
						break;
		    		default:
		    			break;
		    	}
		    }else if($(href).hasClass("P1group")){
		    	number = $(href + ">*>*>.number").text();
		    }
		    
			
			
			var parent_brackets = false;
			if(button == 'xref xref-external'){
				var title = $(eventHandlerThis).attr("data-title");
				var portion = $(eventHandlerThis).attr("data-portion");
				

				$inlineblock = $('<span class="' + button + '" data-href="' + href + '">' + title + ' (' + portion +  ')</span>');
			}else{
				if($(href).hasClass("Part")){
					className = "part";
				}else if($(href).hasClass("Chapter")){
					className = "chapter";
				}else if($(href).hasClass("Pblock")){
					className = "crossheading";
				}else if($(href,$container).length){
					className = "subsection";
					layers = layers - 1;
				}else{
					className = "section"
				}
				switch(layers){
					case 2:
						parent_brackets = true;
					case 1:
						var $self = $(event.target).closest("li");
						var parents = $self.parents("li");
						var parent_number = $(parents.get(0)).attr("data-number");
						var parent = '<span class="parent-number">' + parent_number +'</span>';
						if(parent_brackets){
							parent = '('+parent+')';
						}
						$inlineblock = $('<span class="' + button + '" data-href="' + href + '">'+ className + ' ' + parent + '(<span class="number">' + number + '</span>)</span>');
						break;
					default:
						$inlineblock = $('<span class="' + button + '" data-href="' + href + '">'+ className + ' (<span class="number">' + number + '</span>)</span>');
						break;
				}
			}

		    $inlineblock.on("click",function(e){
				Aloha.trigger('aloha-xref-selection-clicked', [e,this]);
			});
		  	if ( foundMarkup ) {
				$(".xref",foundMarkup).replaceWith($inlineblock);
		    }else{
		    	that.insertAtCursor($inlineblock);
		    }
		},

		initSidebar: function(sidebar) {
			var pl = this;
			/*console.log(pl,this);*/
			pl.sidebar = sidebar;
			
			sidebar.addPanel({

                id        : "aloha-link-sidebar-panel-ammend-wording",
                title     : 'Amend Xref',
                content     : '',
                expanded : true,
                activeOn : function(ef){return pl.ammendClicked;},
                onInit     : function () {
                },
                onActivate: function (effective) {
                	var that = this;
					that.effective = effective;
					var range = Aloha.Selection.getRangeObject();
					var foundMarkup =  pluggedIn.findAbbrMarkup( range ) ;
					
		  			if ( foundMarkup ) {
		  				var number = $(".xref-internal .number",foundMarkup).text();;
		  				var parent_number = $(".xref .parent-number",foundMarkup).text();
		  				var text = $(".xref",foundMarkup).clone().children().remove().end().text();
		  				text = text.replace(/\(/g,"");
	  					text = text.replace(/\)/g,"");
	  					text = $.trim(text);

						var $content = $("<form class='form'><fieldset><legend>Amend Wording</legend></fieldset></form>");
						$("fieldset",$content).append("<div class='form-group'><label id='wording'>Wording</label><input type='text' name='wording' value='" + text + "'/></div>");
						
						if(number != ""){
							$("fieldset",$content).append("<div class='form-group parenthesis'><label>Parenthesise Number</label><input type='checkbox' name='brackets' value='1' checked='checked'/></div>");	
						}
						
						if($(".xref-internal",foundMarkup).find(".parent-number").length){
							var $fs2 = $("<fieldset><legend>Parent Number</legend></fieldset>");
							$fs2.append("<div class='form-group'><label>Show Number</label><input type='checkbox' name='parentNo' value='1' checked='checked'/></div>");
							$fs2.append("<div class='form-group'><label>Parenthesise Number</label><input type='checkbox' name='parentNobrackets' value='1' checked='checked'/></div>");
							$content.append($fs2);
						}
						$content.append("<input type='submit' class='btn btn-success' value='Update'/>");
						$content.append("<input type='submit' class='btn btn-danger' value='Remove Xref'/>");
						$(".btn-success",$content).on("click",function(e){
							e.preventDefault();							
							var $form = $("#aloha-link-sidebar-panel-ammend-wording form");
							var text = $("[name='wording']",$form).val();
							var fullText = "";
							var $number = $("<span class='number'>" + number + "</span>");
							if(text){
								fullText = text + " ";
							}
							if($("[name='parentNo']",$form).is(":checked")){
								if($("[name='parentNobrackets']",$form).is(":checked")){
									fullText = fullText + "<span class='parent-number'>" + parent_number + "</span>";
								}else{
									fullText = fullText + "(<span class='parent-number'>" + parent_number + "</span>)";
								}
							}else{
								$number.attr("data-parent-number",parent_number);
							}
							
							if($("[name='brackets']",$form).is(":checked")){

								fullText = fullText + "(" + $number.prop('outerHTML') + ")";
							}else{
								fullText = fullText + $number.prop('outerHTML');
							}
							
							$(".xref",foundMarkup).empty().append(fullText);
							return false;
						});
						(".btn-danger",$content).on("click",function(e){
							e.preventDefault();							
							$(foundMarkup).remove();
							Aloha.Sidebar.right.close();
							return false;
						});
                	}
					pl.content = this.setContent($content).content;
                }
            });
			sidebar.addPanel({

                id        : "aloha-link-sidebar-panel-external-search",
                title     : 'External Xref',
                content     : '',
                expanded : false,
                activeOn : function(ef){return pl.buttonClicked;},
                onInit     : function () {
                
                },
                onActivate: function (effective) {
                	var that = this;
					that.effective = effective;
					//DO STUFF HERE

					var $content = $("<form class='form'><fieldset><legend>Search Current Legislation</legend></fieldset></form>"),
                		$types = $("<select name='type' class='form-control'/>");

					$types.append($("<option value='primary'>All Primary Legislation</option>"));
                	$types.append($("<option value='uksi'>UK Statutory Instrument</option>"));


                	$("fieldset",$content).append("<div class='form-group'><label>Title</label><input type='text' name='title'/></div>");
                	$("fieldset",$content).append("<div class='form-group'><label>Year</label><input type='text' name='year' class='col-xs-3'/></div>");
                	

                	$("fieldset",$content).append($("<div class='form-group'><label>Type</label></div>").append($types));
                	$("fieldset",$content).append("<div class='form-group'><input type='submit' class='btn btn-success' /></div>");
						pl.content = this.setContent($content).content;

					pl.sidebarAccordion();
					pl.sidebarButtons();


					$("#aloha-link-sidebar-panel-external-search form").unbind("submit");
					$("#aloha-link-sidebar-panel-external-search form").on("submit",function(ev){
						ev.preventDefault();
						ev.stopPropagation();

						var uri = "http://www.legislation.gov.uk/";
						
						var type = $("#aloha-link-sidebar-panel-external-search [name='type']").val();
						var year = $("#aloha-link-sidebar-panel-external-search [name='year']").val();
						var title = $("#aloha-link-sidebar-panel-external-search [name='title']").val();

						if(type){
							uri = uri + type + "/";
						}
						if(year){
							uri = uri + year + "/";
						}
						if(!(year || type)){
							uri = uri + "all/";
						}
						uri = uri + "data.feed";
						if(title){
							uri = uri + "?title=" + title;
						}
						$.ajax({
						  url: uri,
						  data: {},
						  dataType: "xml",
						  success: function(response){
						  	//console.log(response);
						  	that.onFirstReponse(response);
						  	
						  	//Skip a step//
						  	//that.prepareView(response);
						  }
						});
						return false;
					});

					//pl.effective = effective;
					//pl.updateSidebarWithAttributes();
					//pl.correctHeight();
                },
                onFirstReponse	: function(response){
					var that = this,
						content = $("<ul/>");
                	
					$.each($("entry",$(response)),function(i,item){
						var href = $("id",$(item)).text();
						href = href.replace("/id/","/");
						$(content).append("<li><a href='" + href + "/contents/data.xml' target='_blank'>" + $("title",$(item)).text() + "</a></li>");
					});
                	
            		pl.content = that.setContent(content).content;

            		$("#aloha-link-sidebar-panel-external-search li a").unbind("click");
            		$("#aloha-link-sidebar-panel-external-search li a").on("click",function(ev){
						ev.preventDefault();
						ev.stopPropagation();

						var content = $("<div id='externalpage' style='display:none'/><ul/>");
						var href = $(this).attr("href");
						pl.content = that.setContent(content).content;

						//ajax here

						$.ajax({
						  url: href,
						  data: {},
						  dataType: "xml",
						  success: function(response){
						  	//console.log(response);
						  	that.prepareView(response);
						  }
						});
						that.collapse();
						that.expand();
						return false
					});
					this.collapse();
					this.expand();
					return false;
                },
              	prepareParts : function(parentSelector,actTitle){
					var that = this;
					var $chapter_ol = $("<ol class='Part_accordion_panel'/>");
					$("> ContentsPart",parentSelector).each(function(){
						var $self = $(this);
						var $parent = $self;
						var partno = $parent.attr("ContentRef");
						var $xrefButton = $("<a/>");
						var $chapter_li = $("<li/>")

						partno = partno.replace("part-","");
						$xrefButton
							.addClass("xref-button")
							.prop("href",$parent.attr("DocumentURI"))
							.attr("data-portion","Part " + partno)
							.attr("data-title",actTitle);


						//var $chapter_li = $("<li/>").append($("<p/>").addClass("Part_title").html($self.text()).append($("<a/>").addClass("xref-button").prop("href","#"+$parent.attr("id"))));
						
						$chapter_li
							.append($("<p/>")
							.html(
								$("> ContentsNumber",$self).text() + " - " + $("> ContentsTitle",$self).text())
								.addClass("Part_title")
								.append($xrefButton)
							);

						$chapter_li.append(that.prepareChapters($parent,actTitle,"Part " + partno));
						$chapter_li.append(that.prepareSections($parent,actTitle));
						$chapter_ol.append($chapter_li);
					});
					return $chapter_ol;
                },
                prepareChapters : function(parentSelector,actTitle,partTitle){
					var that = this;
					var $chapter_ol = $("<ol class='Chapter_accordion_panel'/>");
					$("> ContentsChapter",parentSelector).each(function(){
						var $self = $(this);
						var $parent = $self;
						var partno = $parent.attr("ContentRef");
						var $xrefButton = $("<a/>");
						var $chapter_li = $("<li/>")

						partno = partno.replace(/part-(\d*)-chapter-/,"");
						$xrefButton
							.addClass("xref-button")
							.prop("href",$parent.attr("DocumentURI"))
							.attr("data-title",actTitle);

						if(partTitle){
							$xrefButton.attr("data-portion",partTitle + ", Chapter " + partno);
						}else{
							$xrefButton.attr("data-portion","Chapter " + partno);
						}


						//var $chapter_li = $("<li/>").append($("<p/>").addClass("Part_title").html($self.text()).append($("<a/>").addClass("xref-button").prop("href","#"+$parent.attr("id"))));
						
						$chapter_li
							.append($("<p/>")
							.html(
								$("> ContentsNumber",$self).text() + " - " + $("> ContentsTitle",$self).text())
								.addClass("Chapter_title")
								.append($xrefButton)
							);
							
						$chapter_li.append(that.prepareSections($parent,actTitle));
						$chapter_ol.append($chapter_li);
					});
					if($chapter_ol.children().length){
						return $chapter_ol;	
					}else{
						return($());
					}
					
                },
                prepareSections : function(parentSelector,actTitle){
					var that = this;
					var $chapter_ol = $("<ol class='Pblock_accordion_panel'/>");
					$("> ContentsPblock",parentSelector).each(function(){
						var $self = $(this);
						var $parent = $self;
						var partno = $("> ContentsTitle",$parent).text();
						var $xrefButton = $("<a/>");
						var $chapter_li = $("<li/>")

						//partno = partno.replace("part-","");
						$xrefButton
							.addClass("xref-button")
							.prop("href",$parent.attr("DocumentURI"))
							.attr("data-portion",partno)
							.attr("data-title",actTitle);


						//var $chapter_li = $("<li/>").append($("<p/>").addClass("Part_title").html($self.text()).append($("<a/>").addClass("xref-button").prop("href","#"+$parent.attr("id"))));
						
						$chapter_li
							.append($("<p/>")
							.html(
								$("> ContentsTitle",$self).text())
								.addClass("Pblock_title")
								.append($xrefButton)
							);

						$chapter_li.append(that.prepareSubsections($parent,actTitle,"Part " + partno));
						$chapter_ol.append($chapter_li);
					});
					return $chapter_ol;
                },
             	prepareSubsections : function(parentSelector,actTitle){
					var that = this;
					var $chapter_ol = $("<ol class='Part_accordion_panel'/>");
					$("> ContentsItem",parentSelector).each(function(){
						var $self = $(this);
						var $parent = $self;
						var partno = $parent.attr("ContentRef");
						var $xrefButton = $("<a/>");
						var $chapter_li = $("<li/>")

						partno = partno.replace("section-","");
						$xrefButton
							.addClass("xref-button")
							.prop("href",$parent.attr("DocumentURI"))
							.attr("data-portion","Section " + partno)
							.attr("data-title",actTitle);


						//var $chapter_li = $("<li/>").append($("<p/>").addClass("Part_title").html($self.text()).append($("<a/>").addClass("xref-button").prop("href","#"+$parent.attr("id"))));
						
						$chapter_li
							.append($("<p/>")
							.html(
								$("> ContentsNumber",$self).text() + " - " + $("> ContentsTitle",$self).text())
								.addClass("Part_title")
								.append($xrefButton)
							);

						//$chapter_li.append(that.prepareChapters($parent,actTitle,"Part " + partno));
						$chapter_ol.append($chapter_li);
					});
					return $chapter_ol;
                },
                prepareContentStructure :function(parentSelector,actTitle,level){
					var that = this;
					var $chapter_ol = $("<ol class='content_accordion_panel'/>");
					$("> ol > li",parentSelector).each(function(){
						var $self = $(this);
						
						var number = $self.attr("data-number");
						if($self.attr("data-list-type") == "lower-alpha"){
							number = String.fromCharCode(96 + Number(number));
						}else if($self.attr("data-list-type") == "lower-roman"){
							var newnumber = "";
							for(var i = 0;i < number;i++){
								newnumber += "i";
							}
							number = newnumber;
						}

						var $chapter_li = $("<li/>").attr("data-number",number).append($("<p/>").addClass("content_title").text(number).append($("<a/>").addClass("xref-button").prop("href","#"+$self.attr("id"))));
						$chapter_li.append(that.prepareContentStructure($self,level+1));
						$chapter_ol.append($chapter_li);
					});
					return $chapter_ol;
                },
                prepareView : function(response){
					var that = this;
				 	//$("Contents",$(response)).addClass("structural-view");
				
					var $structualView = $("<ol class='Part_accordion_panel'/>");
					$structualView.append( that.prepareParts( $("Contents",$(response)),$("Contents > ContentsTitle",$(response)).text() ) );
					$structualView.append( that.prepareChapters( $("Contents",$(response)),$("Contents > ContentsTitle",$(response)).text() ) );
					$structualView.append( that.prepareSections( $("Contents",$(response)),$("Contents > ContentsTitle",$(response)).text() ) );
					$structualView.append( that.prepareSubsections( $("Contents",$(response)),$("Contents > ContentsTitle",$(response)).text() ) );

					pl.content = this.setContent($structualView).content;

					pl.sidebarAccordionExternal();
					pl.sidebarButtonsExternal();

					this.expand();
					return false;	
				}
            });
			sidebar.addPanel({
                
                id        : "aloha-link-sidebar-panel-structural-map",
                title     : 'Internal Xref',
                content     : '',
                expanded : true,
                activeOn : function(ef){return pl.buttonClicked;},
                onInit     : function () {
                	this.prepareView();
                },
                nestedLists: function(){

                },
                prepareParts : function(parentSelector){
					var that = this;
					var $chapter_ol = $("<ol class='Part_accordion_panel'/>");
					$("> .Part .Part_handle",parentSelector).each(function(){
						var $self = $(this);
						var $parent = $(this).closest(".Part");
						if(!$parent.attr("id")){
							$parent.uniqueId();
						}
						var $chapter_li = $("<li/>").append($("<p/>").addClass("Part_title").html($self.text()).append($("<a/>").addClass("xref-button").prop("href","#"+$parent.attr("id"))));
						$chapter_li.append(that.prepareChapters($("> .Part_content",$parent)));
						$chapter_ol.append($chapter_li);
					});
					return $chapter_ol;
                },
                prepareChapters : function(parentSelector){
					var that = this;
					var $chapter_ol = $("<ol class='Chapter_accordion_panel'/>");
					$("> .Chapter .Chapter_handle",parentSelector).each(function(){
						var $self = $(this);
						var $parent = $(this).closest(".Chapter");
						if(!$parent.attr("id")){
							$parent.uniqueId();
						}
						
						var $chapter_li = $("<li/>").append($("<p/>").addClass("Chapter_title").html($self.text()).append($("<a/>").addClass("xref-button").prop("href","#"+$parent.attr("id"))));
						$chapter_li.append(that.prepareSections($("> .Chapter_content",$parent)));
						$chapter_ol.append($chapter_li);
					});
					return $chapter_ol;
                },
                prepareSections : function(parentSelector){
					var that = this;
					var $chapter_ol = $("<ol class='Pblock_accordion_panel'/>");
					$("> .Pblock .Pblock_handle",parentSelector).each(function(){
						var $self = $(this);
						var $parent = $(this).closest(".Pblock");
						if(!$parent.attr("id")){
							$parent.uniqueId();
						}
						var $chapter_li = $("<li/>").append($("<p/>").addClass("Pblock_title").html($self.text()).append($("<a/>").addClass("xref-button").prop("href","#"+$parent.attr("id"))));
						$chapter_li.append(that.prepareSubsections($parent));
						$chapter_ol.append($chapter_li);
					});
					return $chapter_ol;
                },
             	prepareSubsections : function(parentSelector){
					var that = this;
					var $chapter_ol = $("<ol class='P1group_accordion_panel'/>");
					$("> .P1group .P1group_handle",parentSelector).each(function(){
						var $self = $(this);
						
						var $parent = $(this).closest(".P1group > li");
						if(!$parent.attr("id")){
							$parent.uniqueId();
						}
						var number = ($(" > .number",$self).text());
						var $chapter_li = $("<li/>").attr("data-number",number).append($("<p/>").addClass("P1group_title").html($self.text()).append($("<a/>").addClass("xref-button").prop("href","#"+$parent.attr("id"))));
						
						$chapter_li.append(that.prepareContentStructure($(".P1group_content",$parent),1));
						$chapter_ol.append($chapter_li);
					});
					return $chapter_ol;
                },
                prepareContentStructure :function(parentSelector,level){
					var that = this;
					var $chapter_ol = $("<ol class='content_accordion_panel'/>");
					$("> ol > li",parentSelector).each(function(){
						var $self = $(this);
						
						var number = $self.attr("data-number");
						if($self.attr("data-list-type") == "lower-alpha"){
							number = String.fromCharCode(96 + Number(number));
						}else if($self.attr("data-list-type") == "lower-roman"){
							var newnumber = "";
							for(var i = 0;i < number;i++){
								newnumber += "i";
							}
							number = newnumber;
						}

						var $chapter_li = $("<li/>").attr("data-number",number).append($("<p/>").addClass("content_title").text(number).append($("<a/>").addClass("xref-button").prop("href","#"+$self.attr("id"))));
						$chapter_li.append(that.prepareContentStructure($self,level+1));
						$chapter_ol.append($chapter_li);
					});
					return $chapter_ol;
                },
                prepareView : function(){
				 	var $body = $(".Body").clone(false);
					var that = this;
				 	$(".Body",$body).addClass("structural-view");
				
					var $structualView = $("<ol class='Part_accordion_panel'/>");
					$structualView.append(that.prepareParts(".Body"));
					$structualView.append(that.prepareChapters(".Body"));
					$structualView.append(that.prepareSections(".Body"));
					$structualView.append(that.prepareSubsections(".Body"));
					pl.content = this.setContent($structualView).content;
				},
				onActivate: function (effective) {
					var that = this;
					that.prepareView();
					that.effective = effective;
					//DO STUFF HERE

					pl.sidebarAccordion();
					pl.sidebarButtons();
					//pl.effective = effective;
					//pl.updateSidebarWithAttributes();
					//pl.correctHeight();
				}
			});
		}
	});	
return pluggedIn;
});


