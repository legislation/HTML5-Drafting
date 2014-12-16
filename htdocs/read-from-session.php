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

error_log("\n\n".'###### read from session ', 3, "demo-app.log");


// XSS handling required
$pageId = $_REQUEST['pageId'];
$cmd = false;

if (!empty($_REQUEST['cmd'])) {
	$cmd = $_REQUEST['cmd'];
}

if ($cmd == 'reset') {
	session_destroy();
}

$data = false;
$json_data = false;
if (!empty($_SESSION[md5($pageId)])) {
	$data = $_SESSION[md5($pageId)];
	
	foreach($data as $k => $v) {
		$json_data[$k] = unserialize($v);
	}
}

if (!empty($data)) {
	
	error_log("\n".'data available for page '.$pageId, 3, "demo-app.log");
}


if ( !empty($error) ) {
	error_log("\n".'error: '.print_r($error, true), 3, "demo-app.log");
} else {
	print_r(json_encode($json_data));
}

?>