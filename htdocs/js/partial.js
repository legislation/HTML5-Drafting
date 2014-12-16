require(["vendor/jquery-1.7.2","vendor/jquery-ui"], function() {
	
	renumber();
	structuralView();

	function structuralView(){
		$('#notstructural').show();
		$('#structural').hide();
		$(".Pnumber,.Number,.Text,.Reference,.LongTitle, .P1para").hide();
		$(".aloha-editable-highlight").removeClass("aloha-editable-highlight");
		$(".Primary").addClass("structural-view");
		
		$(".Primary").accordion({
			collapsible: true,
			active:false,
			heightStyle: "content",
			header: ".Part_handle"
		});
		$(".Part_content").accordion({
			collapsible: true,
			active:false,
			heightStyle: "content",
			header: ".Chapter_handle, > .Pblock >.Pblock_handle"
		});
		$(".Chapter").accordion({
			collapsible: true,
			active:false,
			heightStyle: "content",
			header: ".Chapter_handle, > .Pblock >.Pblock_handle"
		});
		$(".Pblock").accordion({
			collapsible: true,
			active:false,
			heightStyle: "content",
			header: ">.Pblock_handle"
		});
		var loc = $(location).get(0).search;
		
		
		var partNumber = 0;
		var chapterNumber = 0;

		var sectionNumber = 0;
		$(".PrimaryPrelims .Title").append("<a class='edit-item' href='edit.php" + loc + "'>Edit whole document <i></i></a>");

		$(".Part_handle,.Chapter_handle,.Pblock_handle,.P1group_handle").each(function(i,item){
			var $parent = $(item).parent(".structural");
			
			if($(item).hasClass("P1group_handle")){
				$parent = $(item).parent("li");
			}
			var id = $parent.attr("id");
			var number = $parent.attr("data-number");
			$(item).hasClass("P1group_handle")
			if($(item).hasClass("P1group_handle")){
				sectionNumber = number;
			}else{
				sectionNumber++;
			}
			if($(item).hasClass("Chapter_handle")){
				chapterNumber = number;
			}else if($(item).hasClass("Part_handle")){
				partNumber = number;
				chapterNumber = 0;
			}
			if(id){
				$(item).append("<a class='edit-item' href='edit.php" + loc + "&portion="+id+"&part="+partNumber+"&chapter="+chapterNumber+"&section="+sectionNumber+"'><i></i></a>");
				$(item).append("<a class='edit-item item-lock' href='edit.php" + loc + "&portion="+id+"&part="+partNumber+"&chapter="+chapterNumber+"&section="+sectionNumber+"&lock=true'><i></i></a>");
			}
		});
		

		$(".edit-item").on("click",function(e){
			e.stopPropagation();
		})
	}
	function renumber(){
		var qs = $(location).get(0).search;

		var part = 1;
		var chapter = 1;
		var section = 1;

		




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
	function listNumber(i,item){
		$(this).attr("data-number",i+1);

		$(this).attr("data-list-type",$(this).css("list-style-type"));

		if(!$(this).attr("id")){
			$(this).uniqueId();
		}

		$(">ol>li",this).each(listNumber);
	}
});