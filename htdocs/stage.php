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

$billExists = false;
if(isset($_GET["bill"])){
  $bill = $_GET["bill"];
  $billExists = file_exists("../history/{$bill}/draft.html");
}
if($billExists === false){
  header("Response-Type: 404");
  print "<h1>404: file not found</h1>";
  exit(0);
}
$pieces = @file_get_contents("../history/{$bill}/stages.json");

$commons = array();
$commons = array("house"=>"commons","children"=>array());
$commons["children"][] = array("house"=>"commons","number"=>1,"desc"=>"First Reading","complete"=>"true");
$commons["children"][] = array("house"=>"commons","number"=>2,"desc"=>"Second Reading","complete"=>"true");
$commons["children"][] = array("house"=>"commons","number"=>"C","desc"=>"Committee");
$commons["children"][] = array("house"=>"commons","number"=>"R","desc"=>"Report");
$commons["children"][] = array("house"=>"commons","number"=>3,"desc"=>"Third Reading");

$lords = array("house"=>"lords","children"=>array());

$lords["children"][] = array("house"=>"lords","number"=>1,"desc"=>"First Reading");
$lords["children"][] = array("house"=>"lords","number"=>2,"desc"=>"Second Reading");
$lords["children"][] = array("house"=>"lords","number"=>"C","desc"=>"Committee");
$lords["children"][] = array("house"=>"lords","number"=>"R","desc"=>"Report");
$lords["children"][] = array("house"=>"lords","number"=>3,"desc"=>"Third Reading");

if($pieces){
  $stages = json_decode($pieces,true);

}else{
$stages[] = $commons;
$stages[] = $lords;



$stages[] = array("desc"=>"Consideration of Ammendments","number"=>"&nbsp;");
$stages[] = array("house"=>"royal","desc"=>"Royal Assent","number"=>"RA");
}

file_put_contents("../history/{$bill}/stages.json",json_encode($stages,true));

?>
<style>
body{font-family: Verdana}
.stages{margin:0px auto;text-align: center;width:100%;background:#eee;padding:4px 0px;}
.stages,.stages ol{list-style-type: none;padding-left: 0px;}
.stages li{background:transparent;display:inline-block;width:1.8em;line-height: 1.8em;text-align: center;margin: 2px;border-radius:1.8em;font-size:0.8em;}
.stages li.children{width:auto;padding:10px;display:inline-block;background:white;margin:0px 10px;border: 2px solid silver;font-size:1em}
.stages li.children h4{margin:0px;font-size: 0.8em;padding:0px;}
.stages li.children-lords{border-color:#B12D32;}
.stages li.children-commons{border-color:#2B6D54;}
.stages li.lords{border-color:#B12D32;background-color:#B12D32;color:white;}
.stages li.commons{border-color:#2B6D54;background-color:#2B6D54;color:white;}
.stages li.royal{border-color:#6F4199;background-color:#6F4199;color:white;}
</style>
<?php


print "<ol class='stages'>";
foreach($stages as $details){
  if(@$details["children"]){
    printf("<li class='children children-%s'><h4>House of %s</h4><ol class='stages-%s'>",$details["house"],ucwords($details["house"]),$details["house"]);
    foreach($details["children"] as $det){
      if(@$det["complete"]){
        printf("<li class='%s' title='%s'>%s</li>",@$det["house"],@$det["desc"],@$det["number"]);
      }else{
        printf("<li class='%s' title='%s'>%s</li>","placeholder",@$det["desc"],"&nbsp;");
      }
    }
    print "</ol></li>";
  }elseif(@$det["complete"]){
    printf("<li class='%s' title='%s'>%s</li>",@$details["house"],@$details["desc"],@$details["number"]);
  }else{
    printf("<li class='%s' title='%s'>%s</li>","placeholder",@$details["desc"],"&nbsp;");
  }
}
print "</ol>";
?>  