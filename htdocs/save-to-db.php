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

  
$dbFile = 'db.sqlite';

error_log("\n\n".'###### save to db '.$dbFile, 3, "demo-app.log");


// create table 'aloha' and insert sample data if SQLite dbFile does not exist
if ( !file_exists($dbFile) ) {
	error_log("\n".'SQLite Database does not exist '.$dbFile, 3, "demo-app.log");
	try {
		$db = new SQLiteDatabase($dbFile, 0666, $error);
		$db->query("BEGIN;
			CREATE TABLE aloha (
				id INTEGER PRIMARY KEY,
				pageId CHAR(255),
				contentId CHAR(255),
				content TEXT
			);

			INSERT INTO aloha 
				(id, pageId, contentId, content)
			VALUES
				(NULL, NULL, NULL, 'Click to edit');

			COMMIT;");
			error_log("\n".'SQLite Database created '.$dbFile, 3, "demo-app.log");
	} catch (Exception $e) {
		die($error);
	}
} else {
	// db already exists
	$db = new SQLiteDatabase($dbFile, 0666, $error);
}



// check if we have already a data set for this

// XSS handling required
$pageId = sqlite_escape_string($_REQUEST['pageId']);
$contentId = sqlite_escape_string($_REQUEST['contentId']);
$content =  sqlite_escape_string($_REQUEST['content']);


$query = "SELECT id FROM aloha 
	WHERE
		pageId = '".$pageId."' 
		AND contentId = '".$contentId."';";

$result = $db->query($query, $error);

$exists = false;
if($result->valid()) {
	$exists = true;
    $row=$result->current();
}


if ($exists == true) {
	error_log("\n".'update data for page '.$pageId.' and contentId '.$contentId, 3, "demo-app.log");
	$query = "BEGIN;
		UPDATE aloha SET
			content = '".$content."'
		WHERE
			id = ".$row['id'].";
		COMMIT;";
	
} else {
	error_log("\n".'insert data for page '.$pageId.' and contentId '.$contentId, 3, "demo-app.log");
	$query = "BEGIN;
		INSERT INTO aloha 
			(id, pageId, contentId, content)
		VALUES
			(NULL, '".$pageId."', '".$contentId."', '".$content."');
		COMMIT;";
}

$db->query($query, $error);

if ( !empty($error) ) {
	error_log("\n".'error: '.print_r($error, true), 3, "demo-app.log");
} else {
	echo 'Content saved.';
}

?>