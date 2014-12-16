
<!DOCTYPE html>

<!-- 
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
 -->

<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="stylesheet" href="css/jquery-ui.css" />
  <link rel="stylesheet" href="css/aloha.css" />
  <link rel="stylesheet" href="less/main.css" />
  <title>Alpha</title>
  <style>
    body > .container{
      margin-top:100px;
    }
  </style>
</head>

<body>

 <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
  <div class="container">
    <div class="navbar-header">

      <a class="navbar-brand" href="bills.php">Bills Drafting</a>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav" id="navigation">
        <li><a href="bills.php">Bills List</a></li>
        <?php if(isset($_GET["portion"])){  ?>
          <li><a href="partial.php?file=<?php print $_GET["file"] ?>">Document Overview</a></li>
          
        <?php }else{ ?>
           <li><a href="partial.php?file=<?php print $_GET["file"] ?>">Choose Edit Portion</a></li>
        <?php } ?>
      </ul>
      <ul class="nav navbar-nav" >
        <li id="editing"><a href="#">Edit View</a></li>
        <li id="stopediting" class="active" style="display:none"><a href="#">Edit View</a></li>
        <li id="structural"><a href="#">Structural View</a></li>
        <li id="notstructural" class="active" style="display:none"><a href="#">Structural View</a></li>
      
      </ul>
      <?php if(!isset($_GET["portion"]) || true){  ?>
      <div class="nav navbar-right">
        <div id="save"><a href="#" class="btn btn-success">Save</a></div>
      </div>
      <?php } ?>
    </div><!--/.navbar-collapse -->
  </div>
</div>
<div class="navbar navbar-fixed-top" id="alohaToolbarNavbar">

 <div class="container" id="alohaToolbar">
  </div>
</div>

<!-- Main jumbotron for a primary marketing message or call to action -->
    <!--div class="jumbotron">
      <div class="container">
        <h1>Hello, world!</h1>
        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
      </div>
    </div-->

    <div class="container">
      <div id="aloha-loading" class="alert alert-info">      
        <p>Loading Aloha Editor</p>
      </div>
      <?php 
      if(@$_GET["file"]){
        $file = file_get_contents($_GET["file"]);
        if(isset($_GET["portion"])){
          $doc = new DOMDocument();
          @$doc->loadHTML('<?xml encoding="UTF-8">' .$file);
          $doc->encoding = 'UTF-8';
          $XPath = new DOMXPath($doc);
          $primary = $XPath->query('//*[contains(@class,"PrimaryPrelims")]//*[contains(@class,"Title")]');
          
          
          $XPath = new DOMXPath($doc);
          $tr = $XPath->query('//*[@id="' .trim($_GET["portion"]) . '"]');
          $tr = $tr->item(0);

          if(isset($_GET["lock"]) == true){
            $class = $tr->getAttribute("class");
            $classes = array_flip(explode(" ",trim($class)));
            unset($classes["locked"]);
             $class = implode(" ",array_flip($classes));
            $tr->setAttribute("class", $class . " locked");
            file_put_contents($_GET["file"], $doc->saveHTML());
            $tr->setAttribute("class",$class);
          }

          $primary = $primary->item(0);
          $primary->setAttribute("class","Title");
          $primary->nodeValue = $primary->nodeValue . " (Partial)";


          print '<div class="Primary">';
          if($primary){
            print "<div class='PrimaryPrelims'>";
            print ($doc->saveHTML($primary));
            print "</div>";
          }

          print '<div class="Body">';
          print ($doc->saveHTML($tr));
          print '</div></div>';
        }else{
          print $file;
        }
      }else{
        ?>
          <div class="Primary">
            <div class="PrimaryPrelims">
              <h1 class="Title editable"></h1>
              <h2 class="Number editable"></h2>
              <p class="LongTitle editable"></p>
            </div>
            <div class="Body">
            </div>
          </div>
          <?php
        }
        ?>
      </div>
    </div>

    <div class="footer">
      <div class="container">
        <p class="text-muted"></p>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script data-main="js/demo-app-load" src="/prototype/js/vendor/require.js"></script>

  </body>
  </html>