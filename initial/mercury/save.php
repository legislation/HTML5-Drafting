<?php
$savefile = file_get_contents("saved.json");
$json = json_decode($savefile,true);

$sections = array();

foreach($json["content"] as $k=>$v){
	if(preg_match("#section_([^_]*)(_(.*))?#",$k,$m)){
		if($m[2]){
			$sections[$m[1]][$m[3]] = $v;
		}else{
			$sections[$m[1]] = $v;
		}
	}
}

print "<html>\n<body>\n";
printf("<h1 id='main_title' class='main_title' data-mercury='simple'>%s</h1>\n",$json["content"]["main_title"]["value"]);
printf("<h2 id='long_title' class='long_title' data-mercury='simple'>%s</h2>\n",$json["content"]["long_title"]["value"]);
printf("<p id='long_desc' class='long_desc' data-mercury='simple'>%s</p>\n",$json["content"]["long_desc"]["value"]);



$sectionNos = $sections;
unset($sectionNos["new"]);
$sectionNos = array_keys($sectionNos);
$lastSection = max($sectionNos);


foreach($sections as $sectionNo => $content){
	if(isset($content["snippets"]) and $content["snippets"] != array()){
		foreach($content["snippets"] as $snippet => $snippetContent){
			$lastSection++;
			print '<section id="section_$lastSection">\n';
			printf("\t<header id='section_{$lastSection}_header' class='section_header' data-mercury='simple'>%s</header>\n",trim($snippetContent["title"]));
			printf("\t<div id='section_{$lastSection}_body' class='section_body' data-mercury='full'><p>%s</p></div>\n",trim($snippetContent["paragraph"]));
			print '</section>\n';
		}
	}elseif(isset($content["value"])){
		print "<section id='section_$sectionNo' data-mercury='full'>\n";
		print $content["value"];
		print "</section>\n";
	}else{
		print "<section id='section_{$sectionNo}'>\n";
		printf("\t<header id='section_{$sectionNo}_header' class='section_header' data-mercury='simple'>%s</header>\n",trim($content["header"]["value"]));
		printf("\t<div id='section_{$sectionNo}_body' class='section_body' data-mercury='full'>%s</div>\n",trim($content["body"]["value"]));
		print "</section>\n";
	}
}

print "<div id='section_new'  data-mercury='full'></div>\n";
/*
print "<pre>";
print_r($sections);
print "</pre>";
*/

print "</body>\n</html>";



?>

