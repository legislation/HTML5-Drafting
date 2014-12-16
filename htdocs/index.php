<?php
  header("Location: bills.php");
  exit(0);
?>
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
            <li id="save"><a href="#">Save</a></li>
            <li id="editing"><a href="#">Editing</a></li>
            <li id="stopediting" class="active" style="display:none"><a href="#">Editing</a></li>
            <li id="structural"><a href="#">Structural</a></li>
            <li id="notstructural" class="active" style="display:none"><a href="#">Structural</a></li>
            <!--li id="save"><a id="save" href="#">Save</a></li-->
          
            <li<?php print isset($_GET["leg"]) || isset($_GET["lock"]) || isset($_GET["saved"]) ? "" : " class='active'" ?>><a href="/">New</a></li>
            <li<?php print isset($_GET["saved"]) ? " class='active'":""?>><a href="/?saved=true">Saved</a></li>
            <li<?php print isset($_GET["leg"]) ? " class='active'":""?>><a href="/?leg=2014-asp-10">Tribunals (Scotland) Act 2014</a></li>
            <li<?php print isset($_GET["lock"]) ? " class='active'":""?>><a href="/?lock=true">Tribunals (Scotland) Act 2014 (Pblock Locked)</a></li>
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
        require_once("../legislation/Tribunals (Scotland) Act 2014.lock.html");
      }elseif(@$_GET["leg"] == "2014-asp-10"){
        //require_once("../legislation/Tribunals (Scotland) Act 2014.html");
        require_once("../legislation/ukpga-2013-29.html");
      }elseif(@$_GET["saved"]){
        require_once("saves/save.html");
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
  </body>
</html>
