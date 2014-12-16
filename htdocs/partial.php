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
        <li class="active"><a href="partial.php?file=<?php print $_GET["file"] ?>">Document Overview</a></li>
      </ul>
     
      <div class="nav navbar-right">
        <div id="save"><a href="#" class="btn btn-success">Save</a></div>
      </div>
    </div><!--/.navbar-collapse -->
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
      <?php 
      if(@$_GET["file"]){
        $file = file_get_contents($_GET["file"]);
        print $file;
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
    <script data-main="js/partial" src="/prototype/js/vendor/require.js"></script>
   
  </body>
  </html>