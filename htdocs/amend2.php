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


include "lib/HtmlDiff.php";

$id = @$_GET["id"] ? @$_GET["id"]:'ui-id-12';

if(@$_GET["bill"] && @$_GET["amend"]){
	$ammend2 = file_get_contents("../history/" . $_GET["bill"] . "/" . $_GET["amend"]);
	$file = file_get_contents("../history/" . $_GET["bill"] . "/draft.html");

	$original = new DOMDocument('1.0', 'utf-8');
	$original->loadHTML($file);
	$original->encoding = 'UTF-8';
	$xpathO = new DOMXpath($original);    
	$bit = $original->getElementById($id);
	$part = new DOMDocument();     
	$part->appendChild($part->importNode($bit,true));
	$file = $part->saveHTML();
	$ammend2 = mb_convert_encoding($ammend2,'HTML-ENTITIES','UTF-8');

	$diff = new HtmlDiff( $file, $ammend2 );
	
	$diff->build();
	$difference = $diff->getDifference();
	$difference = preg_replace("#<del class=\"diffmod\">\s*</del>#","",$difference);
	$difference = preg_replace("#<del class=\"diffdel\">\s*</del>#","",$difference);
	$difference = preg_replace("#<ins class=\"diffins\">\s*</ins>#","",$difference);
	$difference = preg_replace("#<ins class=\"diffmod\">\s*</ins>#","",$difference);
	

	$diff = new DOMDocument('1.0', 'utf-8');
  	$diff->loadHTML("<?xml version='1.0' encoding='utf-8'?>".$difference);
  	$diff->preserveWhiteSpace = false;
  	$diff->encoding = 'UTF-8';
  	$xpath = new DOMXpath($diff);        
  
  	$elements = $xpath->query("//*[@class='diffmod' or @class='diffins' or @class='diffdel']");
	$text = "";
  	foreach($elements as $element){
  		$parentClasses = explode(" ",$element->parentNode->getAttribute("class"));
  		
  		if(in_array("diffmod",$parentClasses)||in_array("diffins",$parentClasses)||in_array("diffdel",$parentClasses)){
			//$text .= "<li>child</li>";
  		}elseif($element->tagName == 'li'){
  			$action = "Insert/Delete";
  			$position = "Before/After";
  			$elementId = "an Element";
  			if($element->hasChildNodes()){
  				foreach($element->childNodes as $child){
  					if($child->tagName == 'del'){
  						$action = "Delete";
  						break;
  					}elseif($child->tagName == 'ins'){
  						$action = "Insert";
  						break;
  					}
  				}
  			}
  			if($prophet = $element->previousSibling){
  				$position = "after";
  				$elementId = $prophet->getAttribute("id");
  			}elseif($follower = $element->nextSibling){
  				$position = "before";
  				$elementId = $follower->getAttribute("id");
  			}else{
  				$position = "below";
  				//$elementId = $prophet->getAttribute("id");
  			}
  			$text .= "<li>$action list item $position $elementId</li>";
  		}elseif($element->tagName == 'ins'){
  			$prophet = $element->previousSibling;
  			
  			if($prophet && $prophet->nodeName == "del"){
  			}else{
	  			$action = "Insert";
	  			$position = "after";
	  			$elementId = $element->parentNode->getAttribute("id");
				$text .= "<li>$action \"" .$element->nodeValue . "\" $position \"" . $prophet->nodeValue . "\" in $elementId</li>";
			}
  		}elseif($element->tagName == 'del'){
  			$action = "Delete";
  			$prophet = $element->previousSibling;
  			$follower = $element->nextSibling;
  			if($follower && $follower->nodeName == "ins"){
  				$action = "Replace";
  			}
  			$elementId = $element->parentNode->getAttribute("id");
			$text .= "<li>$action \"" .$element->nodeValue . "\" with \"" . $follower->nodeValue . "\" in $elementId</li>";
  		}
  	}

	print "<div>";
	print "<div class='changes'><ul>";
	print $text;
	print "</ul></div>";
	print "<div class='diff'>";
	print $difference;
	print "</div>";
	print "</div>";
}
?>
