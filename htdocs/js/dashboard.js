/*
 *
 * Legislation
 * https://github.com/legislation/ 
 *
 * Copyright (c) 2014 
 * Licensed under the GNU Public License (GPL)
 * http://www.gnu.org/licenses
 *
 * Designed and built by TSO.
 *
 * HTML5 Legislation Drafting is free software: you can redistribute it
 * and/or modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * HTML5 Legislation Drafting is distributed in the hope that it will be
 * useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * For the GNU General Public License, please see http://www.gnu.org/licenses/
 *  
 */

var $originalDom;
$(document).ready(function(){

	var qs = $(location).get(0).search;
	$originalDom = $(".Primary").clone();
	$(".Body .editable").each(function(i,item){
		var $toggle = $("<a class='dropdown-toggle' data-toggle='dropdown' href='#'><span></span></a>"),
			$menu = $('<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"/>'),
			$div = $('<div class="dropdown"/>');

			$div.attr("data-for",$(item).attr("id"));
	
		$menu.append("<li><a href='#' data-edit='" + $(item).attr("id") + "'>Propose amendment</a></li>");
		if($(this).hasClass("P1group_content")){
			$div.addClass("P1dropdown");
			$(item).before($div.append($toggle).append($menu));
		}else{
			$(item).after($div.append($toggle).append($menu));
		}
	});


	var request = jQuery.ajax({
		url: "amends.json.php"+qs,
		type: "GET",
		dataType: "json"
	});
	


	request.done(function(data) {
		$.each(data,function(i,item){
			/*
			"to":"ui-id-12",
			"file":"amend-1.html",
			"person":"Bob",
			"dateTime":"2014-09-02T12:00:00"
			*/
			//console.log(i,item);
			$("#"+item.to).css("background","#eee");
			addButtons(i,item);
		});
		dropDownMenus();
	});
});
function removeButtons(){
	$(".addsection").remove();
	$(".addhover").remove();
}

function addButtons(i,item){
	var $toggle = $("<a class='dropdown-toggle' data-toggle='dropdown' href='#'><span></span></a>"),
		$menu = $('<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"/>'),
		$div = $('<div class="dropdown" data-for="' + item.to + '"/>'),
		append = true;

	
	if($("[data-for='"+item.to+"']").length){
		$menu = $("[data-for='"+item.to+"'] .dropdown-menu");
		append = false;
	}
	if($("[data-original='"+item.to+"']").length == 0){
		$menu.append("<li><a href='#' data-original='" + item.to + "'>Show original</a></li>");
	}
	//$menu.append("<li><a href='#'>Show Amendment " + (Number(i)+1) + "</a></li>");
	var dateTime = new Date(Date.parse(item.dateTime));
	
	$menu.append("<li><a href='#' data-amend-to='" + item.to + "' data-amend-content='" + item.file + "' data-amend-by='" + item.person + "' data-amend-dateTime='" + dateTime.toLocaleString() + "'>Show Differences between original and  Amendment " + (Number(i)+1) + "</a></li>");
	
	if(append){
		$("#"+item.to).after($div.append($toggle).append($menu));
	}
	;
	$("[data-for='"+item.to+"'] .dropdown-toggle span").text(Number($("[data-for='"+item.to+"'] .dropdown-toggle span").text())+1);
	
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
	$("[data-amend-to]").unbind("click");
	$("[data-amend-to]").bind("click", function(e){
		e.preventDefault();
		e.stopPropagation();
		var item = $(this).data();
		var qs = $(location).get(0).search;
		$.ajax({
			url: "amend2.php"+qs + "&amend="+item.amendContent+ "&id="+item.amendTo,
			type: "GET",
			dataType: "html"
		}).done(function(response){
			$response = $(response);
			//console.log($(".originals [data-original='"+item.amendTo + "']").length);
			if($(".originals [data-original='"+item.amendTo + "']").length){
			}else{
				$original = $("#"+item.amendTo).clone();
				$original.attr("data-original",item.amendTo);
				$original.removeAttr("id");
				$(".originals").append($original);
			}
			var $replace = $(".diff",$response);
			
			//console.log(item);
			var $diff = $("<div class='diff' data-for='" + item.amendTo + "'/>");
			
			$diff.append($("<h4 class='details'/>").text("Amendment, proposed by "+item.amendBy+", on "+item.amendDatetime));
			
			$diff.append($replace.html());
			$diff.append($(".changes",$response).attr("data-for",item.amendTo).prepend($("<h4>Textual description of changes</h4>")));

			if($(".diff[data-for='" + item.amendTo + "']").length){
				$(".diff[data-for='" + item.amendTo + "']").replaceWith($diff);
			}else{
				$("#"+item.amendTo).replaceWith($diff);
			}
		})
		$(".saveBar[data-for='" + item.amendTo + "']").remove();
		$(".dropdown[data-for='" + item.amendTo + "'] .dropdown-menu").hide();
		$(".dropdown[data-for='" + item.amendTo + "'] .dropdown-toggle").removeClass("open");
		return false;
	});
	$("[data-original]").unbind("click");
	$("[data-original]").bind("click", function(e){
		e.preventDefault();
		e.stopPropagation();
		var item = $(this).data();		
		revert(item.original);
		$("#"+item.original).css("background","#eee");
		$("#"+item.original).css("outline","none");
		$("#"+item.original).removeClass("aloha-editable");
		$("#"+item.original).removeAttr("contenteditable");
		
		$(".dropdown[data-for='" + item.original + "'] .dropdown-menu").hide();
		$(".dropdown[data-for='" + item.original + "'] .dropdown-toggle").removeClass("open");
		return false;
	});
	$("[data-edit]").unbind("click");
	$("[data-edit]").bind("click", function(e){
		e.preventDefault();
		e.stopPropagation();
		console.log($(".aloha-editable").length);
		var item = $(this).data();		
		$(".originals").append($("<div id='open-edits-dialog'/>").html("<p>Only one section can be amended at a time.</p><p>If you continue any previous unsaved amendments will be discarded.</p>"));
		if($(".aloha-editable").length){

			$("#open-edits-dialog").dialog({
			  autoOpen: true,
		      resizable: false,
		      title:"Confirm",
		      height:250,
		      modal: true,
		      buttons: {
		        "Continue": function() {
		          $( this ).dialog( "close" );
		          $(".aloha-editable").each(revert);
		          makeAmend(item);
		        },
		        Cancel: function() {
		          $( this ).dialog( "close" );
		          $(".aloha-editable:first").focus();
		          $(".dropdown[data-for='" + item.edit + "'] .dropdown-menu").hide();
				  $(".dropdown[data-for='" + item.edit + "'] .dropdown-toggle").removeClass("open");
		        }
		      }
		    });
		}else{
			makeAmend(item);
		}
	});
}
function makeAmend(item){
	if($(".originals [data-original='"+item.edit + "']").length){
		var $original = $(".originals [data-original='"+item.edit + "']").clone();
		
		$original.attr("id",item.edit);
		$original.removeAttr("data-original");
		$(".diff[data-for='" + item.edit + "']").replaceWith($original);
	}
	$("#"+item.edit).css("background","#fff");
	$("#"+item.edit).css("outline","1px solid orange");
	$("#"+item.edit).addClass("aloha-editable");
	$("#"+item.edit).attr("contenteditable","true");
	$(".dropdown[data-for='" + item.edit + "'] .dropdown-menu").hide();
	$(".dropdown[data-for='" + item.edit + "'] .dropdown-toggle").removeClass("open");
	$("#"+item.edit).before("<div class='saveBar' data-for='" + item.edit + "'><button>Commit Amendment</button></div>");
	$(".saveBar button").unbind("click");
	$(".saveBar button").bind("click",function(){
		var id = $(this).parent(".saveBar").attr("data-for");
		var qs = $(location).get(0).search;
		var $content = $("#"+id).clone();
		$content.removeClass("aloha-editable");
		$content.removeAttr("style");
		$content.removeAttr("contenteditable");
		/**
		* Things to tidy saved html....
		**/
		var request = jQuery.ajax({
			url: "save-amend.php",
			type: "POST",
			data: {
				content : $content[0].outerHTML,
				contentId : id,
				qs : qs
			},
			dataType: "html"
		});

		request.done(function(msg) {
			console.log("saved");
		});
		request.fail(function(jqXHR, textStatus) {
			console.log("failed");
		});
		return false;
	});
}
function revert(id){
	if(id === 0){
	 id = $(this).attr("id");
	}
	console.log(".saveBar[data-for='"+id+"']")
	$(".saveBar[data-for='"+id+"']").remove();
	if($(".diff[data-for='"+id+"']").length){
		$(".diff[data-for='"+id+"']").replaceWith($("#"+id,$originalDom).clone());
	}else{
		$("#"+id).replaceWith($("#"+id,$originalDom).clone());
	}

}