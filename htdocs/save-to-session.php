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

session_start();

error_log("\n\n".'###### save to session ', 3, "demo-app.log");

// XSS handling required
$pageId = $_REQUEST['pageId'];
$contentId = $_REQUEST['contentId'];
$content =  $_REQUEST['content'];

$data = false;
if (!empty($pageId)) {
	$contentItemId = md5($pageId.'#'.$contentId);
	$data['id'] = $contentItemId;
	$data['pageId'] = $pageId;
	$data['contentId'] = $contentId;
	$data['content'] = $content;
	
	$_SESSION[md5($pageId)][$contentItemId] = serialize($data);
}

if ( !empty($error) ) {
	error_log("\n".'error: '.print_r($error, true), 3, "demo-app.log");
} else {
	echo 'Content saved.';
}

?>