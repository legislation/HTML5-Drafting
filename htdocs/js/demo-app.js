// Aloha Editor Demo logic
$(document).ready(function(){
	renumber();
	Aloha.ready(function() {
		//console.log(Aloha);
    
    Aloha.require(['jquery', 'ui/scopes', 'ui/ui-plugin'], function ($, Scopes, UiPlugin) {
        
        var toolbar = $('.aloha-toolbar');
        // Center and resize the toolbar
        //toolbar.css({'position': 'static', 'margin': 'auto'});
        $('#alohaToolbar').append(toolbar);
        Scopes.setScope('Aloha.continuoustext');
        
        // The child element must also be resized, don't know why
        //toolbar.children().css({'width': 400});
 
        /*Aloha.bind('aloha-editable-deactivated', function () {
            UiPlugin.showToolbar();
        });*/
    	//$('#alohaToolbar').slideUp();

    });

	// Aloha is fully loaded. hide loading message
	$('#aloha-loading').hide();
	
	// check system (@todo should only be done once)
	var request = jQuery.ajax({
		url: "system-check.php",
		type: "POST",
		data: {
			system : 'check'
		},
		dataType: "html"
	});

	request.done(function(msg) {
		if ( msg != 'OK' ) {
			$(".topbar").append('<div class="alert-message error">' + msg + '</div>');
		}
	});

	request.fail(function(jqXHR, msg) {
		$(".topbar").append('<div class="alert-message error">It was not possible to perform the system check. Please read to the README.txt file.</div>');
	});
	// end system check

	// un-/comment to activate all editables on page load
	//$('.editable').aloha();
	
	// un-/comment to activate editables with edit-button on the page
	//$('#edit-page').show();


	$('#save a').bind('click', function() {
		//alert('Save the page content. To be done.');
		//console.log('save page');
		
		stopEditing();
		removeButtons();
		$(".dropdown").remove();
		removePlaceholders();
		$('.aloha-editable-highlight').removeClass("aloha-editable-highlight");
		$('.editable').mahalo()
		$('.editable .aloha-block').mahaloBlock();
		
			//console.log("here");
			$('.Primary').each(function() {
				var content = this.innerHTML;
				var contentId = this.id;
				var pageId = window.location.pathname;
				var qs = $(location).get(0).search;

				//console.log(pageId + ' -- ' + contentId + ' content: ' + content);
				var request = jQuery.ajax({
					url: "save-to-file-new.php",
					type: "POST",
					data: {
						content : content,
						contentId : contentId,
						pageId : pageId,
						qs : qs
					},
					dataType: "html"
				});

				request.done(function(msg) {
					$("#log").html( msg ); 
					addPlaceholders();
				});
				request.fail(function(jqXHR, textStatus) {
					alert( "Request failed: " + textStatus );
				});
				
			});


			$('#edit-page').show();
			$('#save-page').hide();
		});


$('#editing a').bind('click', function() {
	fullView();
	removePlaceholders();
	$('#editing').hide();
	$('#stopediting').show();
	$('body').addClass("editing");
	addButtons();
	Aloha.jQuery('.xref_inline').alohaBlock({ 'aloha-block-type': 'xrefBlock' });
	
	$('.editable').not(".locked .editable").aloha();
	Aloha.jQuery('.xref_inline').unbind("click").bind("click",function(e){
		Aloha.trigger('aloha-xref-selection-clicked', [e,this]);
	});
	$(".aloha-editable:first").focus();
	$("#alohaToolbar").slideDown();
});

$('#stopediting a').bind('click', function() {
	stopEditing();
	addPlaceholders();
	removeButtons();
	//$(".Primary").unblock();
});
$('#structural a').bind('click', function() {		
	stopEditing();
	structuralView();
	addButtons();
});
$('#notstructural a').bind('click', function() {		
	fullView();
	addPlaceholders();
	removeButtons();
});




addPlaceholders();



/*
	Aloha.bind('aloha-insert-line-break',function(event,b){
		console.log("insertlinebreak");
		console.log(event);
		console.log(b);
		event.stopPropagation();
		return false;
	});
*/

"preProcessKeyStrokes";


/*Aloha.bind('aloha-command-will-execute',function(event,b){
	//console.log("aloha-command-will-execute");
	console.log(event);
	console.log(b);
	event.stopImmediatePropagation();
	event.stopPropagation();
	event.preventDefault();
	return event;
})*/


//console.log(Aloha.Editable);
//Aloha.Markup._preProcessKeyStrokes = Aloha.Markup.preProcessKeyStrokes;
//Aloha.Markup.preProcessKeyStrokes = overwritePreProcess;
//Aloha.Editable.addPlaceholder  = overwriteAddPlaceholder;

function getCaretCharacterOffsetWithin(element) {
	var caretOffset = 0;
	var doc = element.ownerDocument || element.document;
	var win = doc.defaultView || doc.parentWindow;
	var sel;
	if (typeof win.getSelection != "undefined") {
		var range = win.getSelection().getRangeAt(0);
		var preCaretRange = range.cloneRange();
		preCaretRange.selectNodeContents(element);
		preCaretRange.setEnd(range.endContainer, range.endOffset);
		caretOffset = preCaretRange.toString().length;
	} else if ( (sel = doc.selection) && sel.type != "Control") {
		var textRange = sel.createRange();
		var preCaretTextRange = doc.body.createTextRange();
		preCaretTextRange.moveToElementText(element);
		preCaretTextRange.setEndPoint("EndToEnd", textRange);
		caretOffset = preCaretTextRange.text.length;
	}
	return caretOffset;
}

var setSelectionByCharacterOffsets = null;

if (window.getSelection && document.createRange) {
	setSelectionByCharacterOffsets = function(containerEl, start, end) {
		var charIndex = 0, range = document.createRange();
		range.setStart(containerEl, 0);
		range.collapse(true);
		var nodeStack = [containerEl], node, foundStart = false, stop = false;

		while (!stop && (node = nodeStack.pop())) {
			if (node.nodeType == 3) {
				var nextCharIndex = charIndex + node.length;
				if (!foundStart && start >= charIndex && start <= nextCharIndex) {
					range.setStart(node, start - charIndex);
					foundStart = true;
				}
				if (foundStart && end >= charIndex && end <= nextCharIndex) {
					range.setEnd(node, end - charIndex);
					stop = true;
				}
				charIndex = nextCharIndex;
			} else {
				var i = node.childNodes.length;
				while (i--) {
					nodeStack.push(node.childNodes[i]);
				}
			}
		}

		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	}
} else if (document.selection) {
	setSelectionByCharacterOffsets = function(containerEl, start, end) {
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(containerEl);
		textRange.collapse(true);
		textRange.moveEnd("character", end);
		textRange.moveStart("character", start);
		textRange.select();
	};
}
//ENTER KEY
Aloha.Markup.addKeyHandler(13, function(event){
	var $focused = $(document.activeElement);
	switch($focused[0].nodeName){
		case "H1":
		case "H2":
		case "H3":
		case "H4":
		case "H5":
		case "H6":
		return false;
		break;
	}
	if($focused.hasClass("LongTitle")){
		return false;
	}
	return true;
});
//UP ARROW
Aloha.Markup.addKeyHandler(38, function(event){
	var position = getCaretCharacterOffsetWithin($(":focus").get(0));
	if(position === 0 && event.keyCode === 38){
		var index = null;
		$(".editable").each(function(i,item){
			if($(this).is(":focus")){
				index = i;
			}
		});
		if(index != null && index > 0){
			$(".editable")[index-1].focus();
			window.getSelection().selectAllChildren($(":focus").get(0));
			var ccow2 = getCaretCharacterOffsetWithin($(":focus").get(0));
			setSelectionByCharacterOffsets($(":focus").get(0), ccow2, ccow2);
			return false;
		}
	}
	return true;
});
//DOWN ARROW
Aloha.Markup.addKeyHandler(40, function(event){
	var position = getCaretCharacterOffsetWithin($(":focus").get(0));
	var cid = $(":focus").attr("id");
	var down = false;
	if($(":focus").height() + "px" == $(":focus").css("line-height")){
		down = true;
	}else{
		window.getSelection().selectAllChildren($(":focus").get(0));
		var ccow2 = getCaretCharacterOffsetWithin($(":focus").get(0));
		down = position == ccow2;
		setSelectionByCharacterOffsets($(":focus").get(0), position, position);
	}
	if(down){
		var index = null;
		$(".editable").each(function(i,item){
			if($(this).is(":focus")){
				index = i;
			}
		});
		if(index != null ){
			$(".editable")[index+1].focus();
		}
		return false;
	}
	return true;	
});

//Get the original tab handler, store it locally, remove all tab key handlers - Create a new one add it then re-add the original//
var hold = Aloha.Markup.keyHandlers[9][0];
Aloha.Markup.removeKeyHandler(9);
Aloha.Markup.addKeyHandler(9,function(event){
	var rangeObject = Aloha.Selection.rangeObject,
	i, effectiveMarkup;
	if(event.shiftKey){
		for ( i = 0; i < rangeObject.markupEffectiveAtStart.length; i++) {
			effectiveMarkup = rangeObject.markupEffectiveAtStart[ i ];
			if (GENTICS.Utils.Dom.isListElement(effectiveMarkup)) {
				break;
			}
		}
		if(effectiveMarkup.nodeName == "LI"){
			var parent = $(effectiveMarkup).closest("ol,ul");
			if($(parent).parent("li").length){
				return true;
			}else{

				$(parent).contents().unwrap("ol,ul");
				$("div>li").each(function(i,item){
					//console.log(i,item);
					var $tobe = $("<div/>");
					$(item).contents().each(function(s,subitem){
						//console.log(subitem);
						if(subitem.nodeName == "#text"){
							subitem = $("<p/>").text(subitem.data);
						}
						//console.log(subitem);
						$tobe.append(subitem);
					});
					$(item).replaceWith($tobe.contents().unwrap("div"));
				});
				//.unwrap("li").wrap("p");
				//console.log("this case");
				return false;
			}
		}
	}
	return true;
});
Aloha.Markup.addKeyHandler(9,hold);




});
function addPlaceholders(){
	removePlaceholders();
	$.each(Aloha.settings.placeholder,function(i,j){
		var $self = $(i),
		$placeholder = $("<span/>");

		if($self.text()){

		}else{
			$placeholder.addClass("placeholder-floater");
			$placeholder.addClass("aloha-placeholder");
			$placeholder.text(j);
				//$self.css("min-height",$self.css("line-height"));
				$self.append($placeholder);
			}
		});
}
function removePlaceholders(){
	$(".placeholder-floater").remove();
}

function stopEditing(){
	$('.editable').mahalo();

		$('.editable .aloha-block').mahaloBlock();
		//$(".aloha-cleanme").remove();
	$('body').removeClass("editing");
	$('.aloha-editable-highlight').removeClass('aloha-editable-highlight');
	$('#editing').show();
	$('#stopediting').hide();
	addPlaceholders();
}
	//Big buttons top and bottom
	/*	function addButtons(){
	
		removeButtons();
		$(".Part").before("<a class='btn addsection'>Add Part Before</a>");
		$(".Part:last").after("<a class='btn addsection'>Add Part After</a>");

		$(".Chapter").before("<a class='btn addsection'>Add Chapter Before</a>");
		$(".Chapter:last-child").after("<a class='btn addsection'>Add Chapter After</a>");

		$(".Pblock").before("<a class='btn addsection'>Add Pblock Before</a>");
		$(".Pblock:last-child").after("<a class='btn addsection'>Add Pblock After</a>");
		
	}*/
	// buttons on the area
	function addButtons(){

		removeButtons();
		Aloha.require(['jquery'],function(){
			$(".dropdown").remove();
			$(".Part_handle,.Chapter_handle,.Pblock_handle,.P1group_handle",".Primary").not(".locked *, .editable *",".Primary").each(function(){
				//$(this).append('<div class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Dropdown trigger</a><ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"><li><a tabindex="-1" href="#">Action</a></li><li><a tabindex="-1" href="#">Another action</a></li><li><a tabindex="-1" href="#">Something else here</a></li><li class="divider"></li><li><a tabindex="-1" href="#">Separated link</a></li></ul></div>');

				var $toggle = $("<a class='dropdown-toggle' data-toggle='dropdown' href='#'></a>");
				$menu = $('<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"/>');
				$div = $('<div class="dropdown"/>');

				if($(this).hasClass("Part_handle")){
					$menu.append("<li><a href='#' data-parent-type='Part' data-add-type='Part' data-add-position='before'>Add Part Before</a></li>");
					$menu.append("<li><a href='#' data-parent-type='Part' data-add-type='Part' data-add-position='after'>Add Part After</a></li>");
					$menu.append("<li><a href='#' data-parent-type='Part' data-add-type='Chapter' data-add-position='prepend'>Add Chapter at start</a></li>");
					$menu.append("<li><a href='#' data-parent-type='Part' data-add-type='Chapter' data-add-position='append'>Add Chapter at end</a></li>");
					$menu.append("<li><a href='#' data-remove-type='Part'>Remove this Part</a></li>");
				}
				if($(this).hasClass("Chapter_handle")){
					$menu.append("<li><a href='#' data-parent-type='Chapter' data-add-type='Chapter' data-add-position='before'>Add Chapter Before</a></li>");
					$menu.append("<li><a href='#' data-parent-type='Chapter' data-add-type='Chapter' data-add-position='after'>Add Chapter After</a></li>");
					$menu.append("<li><a href='#' data-remove-type='Chapter'>Remove this Chapter</a></li>");
				}
				if($(this).hasClass("Pblock_handle")){
					$menu.append("<li><a href='#' data-parent-type='Pblock' data-add-type='Pblock' data-add-position='before'>Add Section Before</a></li>");
					$menu.append("<li><a href='#' data-parent-type='Pblock' data-add-type='Pblock' data-add-position='after'>Add Section After</a></li>");
					$menu.append("<li><a href='#' data-remove-type='Pblock'>Remove this Section</a></li>");
				}
				if($(this).hasClass("P1group_handle")){
					$menu.append("<li><a href='#' data-parent-type='P1group' data-add-type='P1group' data-add-position='prepend'>Add Subsection Before</a></li>");
					$menu.append("<li><a href='#' data-parent-type='P1group' data-add-type='P1group' data-add-position='append'>Add Subsection After</a></li>");
					$menu.append("<li><a href='#' data-remove-type='P1group>li'>Remove this Subsection</a></li>");
				}
				
				$(this).after($div.append($toggle).append($menu));
				
				
			})
.promise()
.done(dropDownMenus);
if($(".Primary .Body").children().length == 0){
	$(".Primary .Body").each(function(){
					//$(this).append('<div class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Dropdown trigger</a><ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"><li><a tabindex="-1" href="#">Action</a></li><li><a tabindex="-1" href="#">Another action</a></li><li><a tabindex="-1" href="#">Something else here</a></li><li class="divider"></li><li><a tabindex="-1" href="#">Separated link</a></li></ul></div>');

					
					var $toggle = $("<a class='dropdown-toggle' data-toggle='dropdown'></a>");
					$menu = $('<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"/>');
					$div = $('<div class="dropdown"/>');

					
					$menu.append("<li><a href='#' data-parent-type='Body' data-add-type='Part' data-add-position='append'>Add Part</a></li>");
					$menu.append("<li><a href='#' data-parent-type='Body' data-add-type='Chapter' data-add-position='append'>Add Chapter</a></li>");
					$menu.append("<li><a href='#' data-parent-type='Body' data-add-type='Pblock' data-add-position='append'>Add Section</a></li>");
					
					

					$(this).append($div.append($toggle).append($menu));
					
					
				})
.promise()
.done(dropDownMenus);
}
});
}
function removeItemAndLinks($candidate){
	$candidate.remove();
		//console.log($candidate);
	}

	function dropDownMenus(){
		$(".dropdown-toggle").unbind("click");
		$(".dropdown-toggle").bind("click",function(e){
			e.preventDefault();
			var $menu = $(".dropdown-menu",$(this).parent());
			if($(this).hasClass("open")){
				$(this).removeClass("open");
				$menu.hide();
			}else{
				$(".dropdown-menu").hide();
				$(".dropdown-toggle").removeClass("open");
				$(this).addClass("open");
				$menu.show();
			}
			return false;
		});
		$("[data-remove-type]").unbind("click");
		$("[data-remove-type]").bind("click", function(e){
			e.preventDefault();
			e.stopPropagation();
			var type = $(this).data("remove-type"),
			$candiate = null,
			foundLinks = 0;

			$candidate = $(this).closest("." + type);
			
			$("[id]",$candidate).each(function(){
				var id = "",
				$self = $(this);
				
				id = $self.attr("id");

				$(".Primary [href='#"+id+"']").each(function(){
					foundLinks++;
				})
			});
			if(foundLinks){
				var cont = false;
				cont = confirm("There are cross references which reference this " + type + " or items contained within. Do you wish to continue?");
				if(cont){
					removeItemAndLinks($candidate);
				}
			}else{
				removeItemAndLinks($candidate);
				renumber();
			}
			
			return false;
		});

		$("[data-add-type]").unbind("click.add");
		$("[data-add-type]").bind("click.add",function(){
			var type = $(this).data("add-type"),
			parent = $(this).data("parent-type"),
			position = $(this).data("add-position");
			
			//console.log("type",type);
			//console.log("position",position);
			

			var $self = $(this).closest("." + parent);
			if(parent != type){
				$self = $("." + parent + "_content",$self);
			}

			if(parent == "Body"){
				$self = $(".Body");
			}


			var add = "";
			var P1 = "<li><h5 class='P1group_handle'><span class='number'></span>. <span class='editable'></span></h5><div class='editable P1group_content'></div></li>"
			var P1group = "<ol class='P1group'>"+ P1+ "</ol>";
			var Pblock = "<div class='Pblock structural'><h4 class='Title editable Pblock_handle'></h4>" + P1group + "</div>";
			var Chapter = "<div class='Chapter structural' data-number='N'><h3 class='Chapter_handle'>CHAPTER <span class='number'>N</span> - <span class='editable'></span></h3><div class='Chapter_content'>" + Pblock + "</div></div>";
			var Part = "<div class='Part structural' data-number='N'><h2 class='Part_handle'>PART <span class='number'>N</span> - <span class='editable'></span></h3><div class='Part_content'>" + Chapter + "</div></div>";


			switch(type){
				case "Chapter":
				add = Chapter;
				break;
				case "Part":
				add = Part;
				break;
				case "Pblock":
				add = Pblock;
				break;
				case "P1group":
				add = P1;
				break;
			}

			if(position == 'before'){
				$self.before(add);
			}else if(position == 'prepend'){
				$self.prepend(add);
			}else if(position == 'append'){
				$self.append(add);
			}else{
				$self.after(add);	
			}	
			

			if($(".aloha-editable").length){
				$(".editable",".Primary").not(".aloha-editable").aloha();
			}
			if($(".Primary.structural-view").length){
				$(".Pnumber,.Number,.Text,.Reference,.LongTitle, .P1para").hide();
			}
			$(".dropdown-menu").hide();
			$(".dropdown-toggle").removeClass("open");
			
			removeButtons();
			addButtons();
			renumber();
			addPlaceholders();
			return false;
		});
}



function removeButtons(){
	$(".addsection").remove();
	$(".addhover").remove();
}

function listNumber(i,item){
	$(this).attr("data-number",i+1);

	$(this).attr("data-list-type",$(this).css("list-style-type"));

	if(!$(this).attr("id")){
		$(this).uniqueId();
	}

	$(">ol>li",this).each(listNumber);
}

function structuralView(){
	$('#notstructural').show();
	$('#structural').hide();
	$(".Pnumber,.Number,.Text,.Reference,.LongTitle, .P1para").hide();
	$(".aloha-editable-highlight").removeClass("aloha-editable-highlight");
	$(".Primary").addClass("structural-view");
	$(".Body",".Primary").sortable({
		handle: ".Part_handle",
		placeholder: "ui-state-highlight placeholder",
		cursorAt:{top:5},
		tolerance:"pointer",
		stop:renumber

	});
	$(".Part_content",".Primary").not(".locked .Part_content").sortable({
		connectWith:".Part_content",
		handle: ".Chapter_handle",
		placeholder: "ui-state-highlight placeholder",
		cursorAt:{top:5},
		tolerance:"pointer",
		stop:renumber
	});
	$(".Chapter_content",".Primary").not(".locked .Chapter_content").sortable({
		connectWith:".Chapter_content",
		handle: ".Pblock_handle",
		placeholder: "ui-state-highlight placeholder",
		cursorAt:{top:5},
		tolerance:"pointer",
		stop:renumber
	});
	$(".P1group",".Primary").not(".locked .P1group").sortable({
		connectWith:".P1group",
		handle: ".P1group_handle",
		placeholder: "ui-state-highlight placeholder",
		cursorAt:{top:5},
		tolerance:"pointer",
		stop:renumber

	});
}
function fullView(){
	$(".Pnumber,.Number,.Text,.Reference,.LongTitle, .P1para").show();
	$(".Primary").removeClass("structural-view");
	$(".ui-sortable").sortable("destroy");
	$('#notstructural').hide();
	$('#structural').show();
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function renumber(){
	//console.log("renumber");
	var qs = $(location).get(0).search;

	var part = 1;
	var chapter = 1;
	var section = 1;

	if(getParameterByName("portion")){
		part = Number(getParameterByName("part")) || 1;
		chapter = Number(getParameterByName("chapter")) || 1;
		section = Number(getParameterByName("section")) || 1;
	}
	

	

	$(".Part").each(function(i,item){
		var $self = $(this);
		$self.data("number",i+part);
		$(".Part_handle .number",$self).text(i+part);
		$(".Chapter",$self).each(function(i,item){
			var $chapter = $(this);
			$chapter.attr("data-number",i+chapter);
			$(".Chapter_handle .number",$chapter).text(i+chapter);
		});
	});

	$(".Chapter").not(".Part .Chapter").each(function(i,item){
		var $chapter = $(this);
		//console.log($chapter);
		$chapter.data("number",i+chapter);
		$(".Chapter_handle .number",$chapter).text(i+chapter);
		$chapter.attr("data-number",i+chapter);
	});

	var lp = section;

	$(".P1group > li").not(".BlockAmendment .P1group > li").each(function(i,item){
		var $p1group = $(this);
		if($p1group.attr("data-number") != lp){
			//console.log("p1group",$p1group.data("number"),lp);
			//console.log($p1group);
			/*$("[data-href='#" + $p1group.attr('id') + "']").each(function(i,item){
				console.log(item);
				$("> .number",this).text(lp);
			});*/
			
/*
			$("li[id]",$p1group).each(function(i,item){
				var id = $(item).attr("id");
				//console.log(id);
				$("[href='#" + id + "']").each(function(i,item){
					var text = $(item).text();
					var pattern = /^(\d+)\((\d+)\)$/;
					//console.log(text);
					if(pattern.test(text)){
						text = text.replace(/^\d*\(/,lp + "(");
							$(item).text(text);
						}
					});
			});*/
		}
		$p1group.attr("data-number",lp);
		$(".P1group_handle .number",$p1group).text(lp);
		lp++;
	});

	$("[data-href]").each(function(i,item){
		var href = $(item).data("href");
		var number = $($(href).find(".number").get(0)).text();
		if(number){}else{
			//console.log($(href));
			number = $(href).data("number");
		}
		
		$("> .number",item).text(number);
		if($("> .parent-number",item).length){
			var parents = $(href).parents("li[data-number]");
			var parent_number = $(parents[0]).attr("data-number");
			$("> .parent-number",item).text(parent_number);
		}

	});


		$(".P1group_content").each(listNumber);
	}
});