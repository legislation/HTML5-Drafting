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
    <meta charset="utf-8" />
    <title>Aloha Editor Demo</title>
    <meta name="description" content="Aloha Editor Demo" />
    <meta name="author" content="Aloha Editor Team" />
    <link rel="stylesheet" href="css/jquery-ui.css" />
    <link rel="stylesheet" href="css/bootstrap.css" />
    <link rel="stylesheet" href="css/aloha.css" />
    <link rel="stylesheet" href="css/aloha-editor-demo.css" />
    <link rel="stylesheet" href="css/main.css" />
    
    <script data-main="js/demo-app-load" src="/js/vendor/require.js"></script>
    <script type="text/javascript">
    </script>
  </head>
  <body>
    <div class="topbar">
      <div class="fill">
        <div class="container">
          <span id="brand">
           <a class="brand" href="#">Alpha</a>
          </span>
          <ul class="nav" id="navigation">
            <li id="editing"><a href="#">Editing</a></li>
            <li id="stopediting" class="active"><a href="#">Editing</a></li>
            <li id="structural"><a href="#">Structural</a></li>
            <li id="notstructural" class="active"><a href="#">Structural</a></li>
            <!--li id="save"><a id="save" href="#">Save</a></li-->
            <li><a href="si.php?lock=true">Pblock Locked</a></li>
            <li><a href="si.php">All unlocked</a></li>
          </ul>
        </div>
      </div>
      <div class="fill" id="editbar">
        <div id="alohaContainer" class="container"> </div>
      </div>
    </div>
    <div class="container" id="container">
      <div id="aloha-loading" class="alert-message notice">
      <p>Loading Aloha Editor</p>
    </div>
    <?php 
      if(@$_GET["lock"]){
        require_once("../legislation/The Wireless Telegraphy (Limitation of Number of Licences) Order 2012.lock.html");
      }else{
        require_once("../legislation/The Wireless Telegraphy (Limitation of Number of Licences) Order 2012.html");
      }
    ?>
    </div>
  </body>
</html>
