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
$amends = @file_get_contents("../history/".$qsParams["bill"]."/amends.json");
if($amends){
	$amends = json_decode($amends,true);
}else{
	$amends = array();
}
$files = glob("../history/".$qsParams["bill"]."/amend-*.html");
$cur = 0;
foreach($files as $file){
	if(preg_match("#/amend-(\d*).html#", $file,$m)){
		$cur = max($m[1],$cur);
	}
}

$fnum = $cur+1;

$filename = "amend-" . $fnum . ".html";
$filepath = "../history/".$qsParams["bill"]."/".$filename;
$amend = array("to"=>$_REQUEST["contentId"],"person"=>"user","dateTime"=>date("Y-m-d\TH:i:s"),"file"=>$filename);
$amends[] = $amend;

file_put_contents($filepath, $_REQUEST["content"]);
file_put_contents("../history/".$qsParams["bill"]."/amends.json",json_encode($amends,true));
?>