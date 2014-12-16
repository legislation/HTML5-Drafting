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

$ok = true;

// do a short system check
$filename = 'demo-app.log';
if (!is_writable($filename)) {
    $ok = false;
}

$filename = 'save-to-session.php';
if (!is_readable($filename)) {
    $ok = false;
}

$filename = 'read-from-session.php';
if (!is_readable($filename)) {
    $ok = false;
}

$filename = 'save-to-db.php';
if (!is_readable($filename)) {
    $ok = false;
}

$filename = 'read-from-db.php';
if (!is_readable($filename)) {
    $ok = false;
}

if ($ok != true) {
	echo 'The *.php files in /app/ needs to be readable.';
} else {
	echo 'OK';
}
?>