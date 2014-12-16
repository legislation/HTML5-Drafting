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

include "lib/finediff.php";
if(@$_GET["amend"]){
  $ammend2 = file_get_contents("../history/" . $_GET["bill"] . "/" . $_GET["amend"]);
   // print $file;
}else{
   $ammend2 = file_get_contents("../history/" . $_GET["bill"] . "/amend-1.html");
}
if(@$_GET["bill"]){
  $file = file_get_contents("../history/" . $_GET["bill"] . "/draft.html");
    //print $ammend2;
}
$amend  = false;
if(@$_GET["bill"]){
 
 
  
  $original = new DOMDocument('1.0', 'utf-8');
  $original->loadHTML($file);
  $original->encoding = 'UTF-8';
  $xpathO = new DOMXpath($original);    
  $bit = $original->getElementById('ui-id-13');
  $part = new DOMDocument();     
  $part->appendChild($part->importNode($bit,true));
  $file = $part->saveHTML();
 
  $diff  = new FineDiff($file, $ammend2,FineDiff::$wordGranularity );
  $amend = html_entity_decode(($diff->renderDiffToHTML()));

  $doc = new DOMDocument('1.0', 'utf-8');
  $doc->loadHTML("<?xml version='1.0' encoding='utf-8'?>".$amend);
  $doc->encoding = 'UTF-8';
  $xpath = new DOMXpath($doc);        
  
  $elements = $xpath->query("//del[li]");
  foreach($elements as $item){
    foreach($item->childNodes as $child){
     // var_dump($child->nodeName);
      if($child->nodeName != "#text"){
        $class = $child->getAttribute("class");
        $child->setAttribute("class",$class." del");
        $node = $child->cloneNode(true);
      }
    }
    $item->parentNode->replaceChild($node,$item);
  }
  $elements = $xpath->query("//ins[li]");
  foreach($elements as $item){
    foreach($item->childNodes as $child){
     // var_dump($child->nodeName);
      if($child->nodeName != "#text"){
        $class = $child->getAttribute("class");
        $child->setAttribute("class",$class." ins");
        $node = $child->cloneNode(true);
      }
    }
    $item->parentNode->replaceChild($node,$item);
  }
  print "<div>";
  print "<div class='changes'><ul>";
  $changes = $xpath->query("//*[name() = 'ins' or name() = 'del' or (name() = 'li' and (contains(@class,'ins') or contains(@class,'del')))]");
  foreach($changes as $item){
    $follower = $item->nextSibling;
    $prophet = $item->previousSibling;
    $insert = false;
    if($item->nodeName=="li"){
      $classes = $item->getAttribute("class");
      if($follower && $follower->nodeName == "#text"){
        $follower = $follower->nextSibling;
      }
      if($prophet && $prophet->nodeName == "#text"){
        $prophet = $prophet->nextSibling;
      }
      if($classes){
        $classes = explode(" ",$classes);
        if(in_array("ins",$classes)){
          $insert = true;
        }
      }
      if($insert){
        print "<li>insert new item with the text \"";
        print $item->nodeValue;
        print "\"";
        if($follower){
          print " before ";
          print $follower->getAttribute("id");
        }elseif($prophet){
          print " after ";
          print $prophet->getAttribute("id");
        }
        print "</li>";
      }else{
        print "<li>delete \"";
        print $item->getAttribute("id");
        print $item->nodeValue;
        print "\"</li>";
      }
    }elseif($item->nodeName=="del" && $follower->nodeName == "ins"){
      print "<li>in ";
      print $item->parentNode->getAttribute("id");
      print " replace \"";
      print $item->nodeValue;
      print "\" with \"";
      print $follower->nodeValue;
      print "\"</li>";
    }elseif($item->nodeName=="del"){
      print "<li>from ";
      print $item->parentNode->getAttribute("id");
      print " delete \"";
      print $item->nodeValue;
      print "\"</li>";
    }elseif($item->nodeName=="ins" && (!$prophet or $prophet->nodeName != "del")){
      print "<li>in ";
      print $item->parentNode->getAttribute("id");
      print " insert \"";
      print $item->nodeValue;
      print "\"</li>";
    }
  }
  print "</ul></div>";
  print "<div class='diff'>";
  $stub = preg_replace(array("/^\<\!DOCTYPE.*?<html><body>/si","!</body></html>$!si"),"", $doc->saveHTML());
  print $stub;
  print "</div>";
  print "</div>";
}
?>
