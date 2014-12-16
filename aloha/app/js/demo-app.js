// Aloha Editor Demo logic



Aloha.ready(function() {
	// Aloha is fully loaded. hide loading message
	jQuery('#aloha-loading').hide();

	// check system (@todo should only be done once)
	var request = jQuery.ajax({
		url: "app/system-check.php",
		type: "POST",
		data: {
			system : 'check'
		},
		dataType: "html"
	});


	Aloha.require(['jquery', 'ui/ui-plugin'],function($, UiPlugin){
		/*var toolbar = $('.aloha-toolbar');
		// Center and resize the toolbar
		toolbar.css({'position': 'static', 'margin': 'auto', 'width': 400});
		$('#alohaContainer').append(toolbar);
		UiPlugin.showToolbar();
		// The child element must also be resized, don't know why
		toolbar.children().css({'width': 400});*/
		var li = $("<li id='aloha-link-sidebar-panel-structural-map' style='display: list-item'><div class='aloha-sidebar-panel-title' unselectable='on'><span class='aloha-sidebar-panel-title-arrow' style='-webkit-transform: rotate(90deg);''></span><span class='aloha-sidebar-panel-title-text'>XREF</span></div><div  class='aloha-sidebar-panel-content' style='height: 420px;'><div class='aloha-sidebar-panel-content-inner' style='height: 400px;'><div class='aloha-sidebar-panel-content-inner-text'></div></div></div></div></li>");
		//li = $('<li id="aloha-link-sidebar-structural-map" class="" style="display: list-item;"></div><div class="aloha-sidebar-panel-content" style="height: auto;"></li>');
		$(".aloha-sidebar-right .aloha-sidebar-inner .aloha-sidebar-panels").append(li).promise().done(addToStructureMap);





	});

	function addToStructureMap(){
		console.log("addToStructureMap");
		var $body = $(".Body").clone(false);

		$(".Body",$body).addClass("structural-view");
		$/*(".dropdown",$body).remove();
		$(".editable",$body).removeClass("editable");*/
		
		$structualView = $("<ol class='Part_accordion_panel'/>");
		$(".Part_handle",".Primary").each(function(){
			$self = $(this);
			$parent = $(this).closest(".Part");
			var $li = $("<li/>").append($("<p/>").html($self.text()).addClass("Part_title").append($("<a></a>").addClass("xref-button").prop("href","#"+$parent.attr("id"))));
			var $chapter_ol = $("<ol class='Chapter_accordion_panel'/>");
			/** Add Chapters **/
			$(".Chapter_handle",$parent).each(function(){
				$self = $(this);
				$parent = $(this).closest(".Chapter");
				var $chapter_li = $("<li/>").append($("<p/>").addClass("Chapter_title").html($self.text()).append($("<a></a>").addClass("xref-button").prop("href","#"+$parent.attr("id"))));
				var $section_ol = $("<ol class='Pblock_accordion_panel'/>");
				/** Add Pblocks (Section) **/
				$(".Pblock_handle",$parent).each(function(){
					$self = $(this);
					$parent = $(this).closest(".Pblock");
					var $section_li = $("<li/>").append($("<p/>").addClass("Pblock_title").html($self.text()).append($("<a></a>").addClass("xref-button").prop("href","#"+$parent.attr("id"))));
					var $subsection_ol = $("<ol class='P1group_accordion_panel'/>");
					$(".P1group_handle",$parent).each(function(){
						$self = $(this);
						$parent = $(this).closest(".P1group");
						var $subsection_li = $("<li/>").append($("<p/>").addClass("P1group_title").html($self.text()).append($("<a></a>").addClass("xref-button").prop("href","#"+$parent.attr("id"))));
						$subsection_ol.append($subsection_li);
					});
					$section_li.append($subsection_ol);
					$section_ol.append($section_li);
				});
				$chapter_li.append($section_ol);
				$chapter_ol.append($chapter_li);
			});
			$li.append($chapter_ol);
			$structualView.append($li);
		});


		$("#aloha-link-sidebar-panel-structural-map .aloha-sidebar-panel-content").addClass("structural-view");
		$structualView.appendTo("#aloha-link-sidebar-panel-structural-map .aloha-sidebar-panel-content-inner-text")
			.promise()
			.done(
				function(){
					$( "#aloha-link-sidebar-panel-structural-map  .Part_accordion_panel" ).accordion({
						collapsible: true,
						heightStyle: "content",
						header: "p.Part_title",
					});
					$( "#aloha-link-sidebar-panel-structural-map  .Chapter_accordion_panel" ).accordion({
						active:false,
						collapsible: true,
						heightStyle: "content",
						header: "p.Chapter_title",
					});
					$( "#aloha-link-sidebar-panel-structural-map  .Pblock_accordion_panel" ).accordion({
						active:false,
						collapsible: true,
						heightStyle: "content",
						header: "p.Pblock_title",
					});
					/*$( "#aloha-link-sidebar-panel-structural-map  .Body" ).accordion({
						collapsible: true,
						header: "h2",
					});				
					$( "#aloha-link-sidebar-panel-structural-map .Part_content" ).accordion({
						collapsible: true,
						header: "h3",
					});
					$( "#aloha-link-sidebar-panel-structural-map .Chapter_content" ).accordion({
						collapsible: true,
						header: "h4",
					});
					$( "#aloha-link-sidebar-panel-structural-map .P1group" ).accordion({
						collapsible: true,
						header: "h5",
					});*/
					$( "#aloha-link-sidebar-panel-structural-map .Body").css("overflow","auto");
					
					$(".xref-button").on("click.xref",function(event){
						console.log("this,",this);
						console.log("event,",event);
						var e = jQuery.Event("keydown");
    					e.which = 77; 
    					$("#aloha-attribute-field-editLink:visible").val($(this).attr("href")).trigger(e);

						event.preventDefault();
						event.stopPropagation();
						return false;
					});
					
				}
			);
	}




	request.done(function(msg) {
		if ( msg != 'OK' ) {
			jQuery(".topbar").append('<div class="alert-message error">' + msg + '</div>');
		}
	});

	request.fail(function(jqXHR, msg) {
		jQuery(".topbar").append('<div class="alert-message error">It was not possible to perform the system check. Please read to the README.txt file.</div>');
	});
	// end system check

	// un-/comment to activate all editables on page load
	//jQuery('.editable').aloha();
	
	// un-/comment to activate editables with edit-button on the page
	//jQuery('#edit-page').show();


	jQuery('#save a').bind('click', function() {
		//alert('Save the page content. To be done.');
		//console.log('save page');
		
		jQuery('.editable').mahalo();
		jQuery('body').removeClass("editing");
		jQuery('.editable').each(function() {
			var content = this.innerHTML;
			var contentId = this.id;
			var pageId = window.location.pathname;

			//console.log(pageId + ' -- ' + contentId + ' content: ' + content);
			var request = jQuery.ajax({
				url: "app/save-to-session.php",
				type: "POST",
				data: {
					content : content,
					contentId : contentId,
					pageId : pageId
				},
				dataType: "html"
			});

			request.done(function(msg) {
				jQuery("#log").html( msg ); 
			});

			request.fail(function(jqXHR, textStatus) {
				alert( "Request failed: " + textStatus );
			});
			
		});
		
		jQuery('#edit-page').show();
		jQuery('#save-page').hide();
	});

	jQuery('#editing a').bind('click', function() {
		fullView();
		jQuery('#editing').hide();
		jQuery('#stopediting').show();
		jQuery('.editable').not(".locked .editable").aloha();

		jQuery('body').addClass("editing");
		addButtons();
	});
	jQuery('#stopediting a').bind('click', function() {
		stopEditing();
		removeButtons();
	});
	jQuery('#structural a').bind('click', function() {		
		stopEditing();
		structuralView();
		addButtons();
	});
	jQuery('#notstructural a').bind('click', function() {		
		fullView();
		removeButtons();
	});





	

	function stopEditing(){
		jQuery('.editable').mahalo();
		jQuery('body').removeClass("editing");
		jQuery('.aloha-editable-highlight').removeClass('aloha-editable-highlight');
		jQuery('#editing').show();
		jQuery('#stopediting').hide();
	}
	//Big buttons top and bottom
	/*	function addButtons(){
	
		removeButtons();
		jQuery(".Part").before("<a class='btn addsection'>Add Part Before</a>");
		jQuery(".Part:last").after("<a class='btn addsection'>Add Part After</a>");

		jQuery(".Chapter").before("<a class='btn addsection'>Add Chapter Before</a>");
		jQuery(".Chapter:last-child").after("<a class='btn addsection'>Add Chapter After</a>");

		jQuery(".Pblock").before("<a class='btn addsection'>Add Pblock Before</a>");
		jQuery(".Pblock:last-child").after("<a class='btn addsection'>Add Pblock After</a>");
		
	}*/
	// buttons on the area
	function addButtons(){

		removeButtons();
		Aloha.require(['jquery', '../app/js/bootstrap/bootstrap-dropdown'],function(){
			$(".dropdown").remove();
			jQuery(".Part_handle,.Chapter_handle,.Pblock_handle,.P1group_handle",".Primary").not(".locked .Part_handle,.locked .Chapter_handle,.locked .Pblock_handle,.locked .P1group_handle",".editable .Primary").each(function(){
				//$(this).append('<div class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Dropdown trigger</a><ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"><li><a tabindex="-1" href="#">Action</a></li><li><a tabindex="-1" href="#">Another action</a></li><li><a tabindex="-1" href="#">Something else here</a></li><li class="divider"></li><li><a tabindex="-1" href="#">Separated link</a></li></ul></div>');

				var $toggle = $("<a class='dropdown-toggle' data-toggle='dropdown' href='#'></a>");
					$menu = $('<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"/>');
					$div = $('<div class="dropdown"/>');

				if($(this).hasClass("Part_handle")){
					$menu.append("<li><a href='#' data-add-type='Part' data-add-position='before'>Add Part Before</a></li>");
					$menu.append("<li><a href='#' data-add-type='Part' data-add-position='after'>Add Part After</a></li>");
				}
				if($(this).hasClass("Chapter_handle")){
					$menu.append("<li><a href='#' data-add-type='Chapter' data-add-position='before'>Add Chapter Before</a></li>");
					$menu.append("<li><a href='#' data-add-type='Chapter' data-add-position='after'>Add Chapter After</a></li>");
				}
				if($(this).hasClass("Pblock_handle")){
					$menu.append("<li><a href='#' data-add-type='Pblock' data-add-position='before'>Add Pblock Before</a></li>");
					$menu.append("<li><a href='#' data-add-type='Pblock' data-add-position='after'>Add Pblock After</a></li>");
				}
				if($(this).hasClass("P1group_handle")){
					$menu.append("<li><a href='#' data-add-type='P1group' data-add-position='before'>Add P1group Before</a></li>");
					$menu.append("<li><a href='#' data-add-type='P1group' data-add-position='after'>Add P1group After</a></li>");
				}

				$(this).after($div.append($toggle).append($menu));
				
				
			})
			.promise()
			.done(
				function(){
					$(".dropdown-toggle").unbind("click.dropdown");
					$(".dropdown-toggle").bind("click.dropdown",function(e){
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
					});


					$("[data-add-type]").unbind("click.add");
					$("[data-add-type]").bind("click.add",function(){
						var type = $(this).data("add-type");
						var position = $(this).data("add-position");
						
						console.log("type",type);
						console.log("position",position);
						

						var $self = $(this).closest("." + type);
						var add = "";
						
						var P1group = "<ol class='P1group'><li><h5 class='P1group_handle editable' >SUBTITLE</h5><div class='editable'><div class='P1para'><p>Content</p></div></div></li></ol>";
						var Pblock = "<div class='Pblock structural'><h4 class='Title editable Pblock_handle'>TITLE</h4>" + P1group + "</div>";
						var Chapter = "<div class='Chapter structural'><h3 class='Chapter_handle'>CHAPTER N - <span class='editable'>Chapter Title</span></h3><div class='Chapter_content'>" + Pblock + "</div></div>";
						var Part = "<div class='Part structural'><h2 class='Part_handle'>Part N - <span class='editable'>Part Title</span></h3><div class='Part_content'>" + Chapter + "</div></div>";


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
								add = P1group;
								break;
						}

						if(position == 'before'){
							$self.before(add);
						}else{
							$self.after(add);	
						}	


						if($(".editing")){
							$(".editable",".Primary").not(".aloha-editable").aloha();
						}

						$(".dropdown-menu").hide();
						$(".dropdown-toggle").removeClass("open");
					});
				}
			);
		});
	}
	function removeButtons(){
		jQuery(".addsection").remove();
		jQuery(".addhover").remove();
	}


	function structuralView(){
		jQuery('#notstructural').show();
		jQuery('#structural').hide();
		jQuery(".Pnumber,.Number,.Text,.Reference,.LongTitle, .P1para").hide();
		jQuery(".aloha-editable-highlight").removeClass("aloha-editable-highlight");
		jQuery(".Primary").addClass("structural-view");
		jQuery(".Body",".Primary").sortable({
			handle: ".Part_handle",
			placeholder: "ui-state-highlight placeholder",
			cursorAt:{top:5},
			tolerance:"pointer"
		});
		jQuery(".Part_content",".Primary").not(".locked .Part_content").sortable({
			connectWith:".Part_content",
			handle: ".Chapter_handle",
			placeholder: "ui-state-highlight placeholder",
			cursorAt:{top:5},
			tolerance:"pointer"
		});
		jQuery(".Chapter_content",".Primary").not(".locked .Chapter_content").sortable({
			connectWith:".Chapter_content",
			handle: ".Pblock_handle",
			placeholder: "ui-state-highlight placeholder",
			cursorAt:{top:5},
			tolerance:"pointer"
		});
		jQuery(".P1group",".Primary").not(".locked .P1group").sortable({
			connectWith:".P1group",
			handle: ".P1group_handle",
			placeholder: "ui-state-highlight placeholder",
			cursorAt:{top:5},
			tolerance:"pointer"

		});
	}
	function fullView(){
		jQuery(".Pnumber,.Number,.Text,.Reference,.LongTitle, .P1para").show();
		jQuery(".Primary").removeClass("structural-view");
		jQuery(".ui-sortable").sortable("destroy");
		jQuery('#notstructural').hide();
		jQuery('#structural').show();
	}

/*
	Aloha.bind('aloha-insert-line-break',function(event,b){
		console.log("insertlinebreak");
		console.log(event);
		console.log(b);
		event.stopPropagation();
		return false;
	});
*/
	Aloha.bind('aloha-command-will-execute',function(event,b){
		console.log("aloha-command-will-execute");
		console.log(event);
		console.log(b);
		event.stopImmediatePropagation();
		event.stopPropagation();
		event.preventDefault();
		return false;
	})



Aloha.bind('aloha-command-executed',function(event,command){
	if(command == 'insertlinebreak'){
		console.log("command:",command);
		var $focused = $(document.activeElement);
		switch($focused[0].nodeName){
			case "H1":
			case "H2":
			case "H3":
			case "H4":
			case "H5":
			case "H6":
			Aloha.execCommand("delete",false);
			break;
		}
	}else{
		console.log("command:",command);
	}

})
console.log(Aloha.settings);
/*
	Aloha.bind('aloha-smart-content-changed', function(event, editable) {
		console.log('Aloha smart event handled.');
		console.log(event);
		console.log(editable);
		event.preventDefault();
		return false;
	});    
*/


});
