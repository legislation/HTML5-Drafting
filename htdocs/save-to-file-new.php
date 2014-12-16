<?php

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

$output = array();
$qsParams = array();
$return = false;
$file = "<?xml version='1.0' encoding='utf-8'?><div class='Primary'>";
$file .=  $_REQUEST["content"];
$file .= "</div>";

$uria = explode("&",trim($_REQUEST["qs"],"?"));
foreach($uria as $val){
	list($k,$v) = explode("=",$val);
	$qsParams[urldecode($k)] =  str_replace("\/","/",urldecode($v));
}

if($qsParams["portion"]){
	libxml_use_internal_errors(true);
	$originalDoc = new DOMDocument('1.0', 'utf-8');
	
	if (!$originalDoc->loadHTMLFile($qsParams["file"])){
		foreach (libxml_get_errors() as $error) {
			print $error;
		}
		libxml_clear_errors();
		exit();
	}
	$XPath = new DOMXPath($originalDoc);
	$original = $XPath->query('//*[@id="' .trim($qsParams["portion"]) . '"]');

	if($original->length){
		$original = $original->item(0);
		
		$patch = new DOMDocument('1.0', 'utf-8');
		$patch->loadHTML($file);
		$patch->encoding = 'UTF-8';
		$XPath = new DOMXPath($patch);
		$new = $XPath->query('//*[@id="' .trim($qsParams["portion"]) . '"]');
		
		$new = $new->item(0);

		$class = $new->getAttribute("class");   
		$classes =array_flip(explode(" ",$class));
		unset($classes["locked"]);
		$class = implode(" ",array_flip($classes));
		
		$new->setAttribute("class",$class);
		$newNode = $originalDoc->importNode($new,true);
		$original->parentNode->replaceChild($newNode,$original);

		$originalDoc->encoding = 'UTF-8';
		//$return = file_put_contents(str_replace(".html","",$qsParams["file"]).".".$qsParams["portion"].".straight.html",$file);
		//$return = file_put_contents(str_replace(".html","",$qsParams["file"]).".".$qsParams["portion"].".patch.html",$patch->saveHTML());
		$return = file_put_contents($qsParams["file"],$originalDoc->saveHTML());
	}else{
		$return = false;
		$output["error"] = "portion not found in original";
	}
}else{
	$return = file_put_contents($qsParams["file"],$file);
}

header("Content-Type: application/json");
$output["qs"] = $qsParams;
$output["success"] = $return !== false;
if($output["success"]){
	$output["bytes_written"] = $return;
}

print json_encode($output); 
?>