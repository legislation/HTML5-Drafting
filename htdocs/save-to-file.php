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

require_once 'lib/JSLikeHTMLElement.php';

// Save Data

// XSS handling required
$pageId = $_REQUEST['pageId'];
$contentId = $_REQUEST['contentId'];
$content =  $_REQUEST['content'];

error_log("\n\n".'###### save as file '.$pageId, 3, "demo-app.log");


$filePath = preg_replace('%^(/*)[^/]+%', '$2..', $pageId);
$filePath = "saved/save.html";
$pageContent = @file_get_contents($filePath);
$error = false;


$doc = new DOMDocument();
//$doc->resolveExternals = true;
$doc->registerNodeClass('DOMElement', 'JSLikeHTMLElement');
if ($pageContent && !$doc->loadHTML($pageContent)) {
	$error = 'Could not load HTML';
} else {
	$elem = $doc->getElementById($contentId);
	//error_log("\n innerhtml: ".print_r($elem->innerHTML, true), 3, "demo-app.log");

	// set innerHTML
	$elem->innerHTML = $content;

	/*if (!file_put_contents($filePath, $doc->saveHTML())) {
		$error = 'Could not update file.';
	}*/
	print $doc->saveHTML();

}

if ( !empty($error) ) {
	error_log("\nerror: ".print_r($error, true), 3, "demo-app.log");
} else {
	echo 'Content saved.';
}

?>