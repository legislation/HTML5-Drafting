<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Aloha Editor Demo</title><meta name="description" content="Aloha Editor Demo"><meta name="author" content="Aloha Editor Team">
<link rel="stylesheet"  href="app/css/jquery-ui.css" />
<script data-main="app/js/demo-app-load" src="lib/require.js"></script>

<script type="text/javascript">


</script>
<style>
.placeholder{
  height:20px;
}
.Body > .placeholder{
  height:40px;
  margin:5px;
}
.Part > .placeholder{
  height:40px;
  margin:5px;
}
.structural-view .structural{
  border:1px solid #ccc;
  margin:5px;
  background: white;
}
.structural-view .Part_handle,.structural-view .Chapter_handle,.structural-view .Pblock_handle, .structural-view .P1group_handle{
  background:#ddd;
  padding:0px 5px;
  border-bottom:1px solid #ccc;
  position:relative;
}
.structural-view .locked .Part_handle,.structural-view .locked .Chapter_handle,.structural-view .locked .Pblock_handle, .structural-view .locked .P1group_handle{
  background:none;
  border-bottom:none;
}

.structural-view .P1group_content{
  display:none;
}

.structural-view .P1group_handle{
  background:#eee;
}
.structural-view .Pblock{
  margin-left:10px;
}
.editing{
  background:#F1f1f1;
}
.editing .editable{
  background:white;
  margin:4px 0px;
  min-height: 20px;
}

.editing .P1group_handle,.editing .Pblock_handle{
  margin-right:30px;
}

.editing .Primary .locked ,.structural-view  .Primary .locked{
  background:#DDD;
  background-image:url("/aloha/img/lock.png");
  background-repeat: no-repeat;
  background-position:top right;
}
.editing .locked .editable{
  background:none;
  margin:4px 0px;

}
.addsection{
  padding-left:1%;
  padding-right:1%;
  width:96%;
  text-align: center;
}
.addhover{
  float: right;
}


ol{
  list-style:none !important;

}
ol ol{
  list-style:decimal !important;
}
ol ol ol{
  list-style:lower-alpha !important;

}
ol ol ol ol{
  list-style:lower-roman !important;

}

.structural-view .Body{
  font-size:11px;
}
.structural-view ol{
  margin-bottom:0px;
  margin-left:0px;
  min-height:20px;
}
.Body{
  font-size:13px;
}
.Body h1{
  font-size:2em;
}
.Body h2{
  font-size:1.8em;
}
.Body h3{
  font-size:1.6em;
}
.Body h4{
  font-size:1.4em;
}
.Body h5{
  font-size:1.2em;
}
.Body h6{
  font-size:1em;
}
#aloha-link-sidebar-panel-structural-map .Body{
  font-size:11px;
}
#aloha-link-sidebar-panel-structural-map .Body h1{
  font-size:1.5em;
}
#aloha-link-sidebar-panel-structural-map .Body h2{
  font-size:1.4em;
}
#aloha-link-sidebar-panel-structural-map .Body h3{
  font-size:1.3em;
}
#aloha-link-sidebar-panel-structural-map .Body h4{
  font-size:1.2em;
}
#aloha-link-sidebar-panel-structural-map .Body h5{
  font-size:1.1em;
}
#aloha-link-sidebar-panel-structural-map .Body h6{
  font-size:1em;
}
.P1group_handle .dropdown,.Pblock_handle .dropdown{
 margin-right:-30px;
}
#aloha-link-sidebar-panel-structural-map{
  height:600px;
}
.xref-button{
  background-color: #ddd;
  background-image: url("/aloha/img/link.png");
  background-repeat: no-repeat;
  background-position:50% 50% ;
  width:30px;
  height:1.3em;
  display:inline-block;
}

#aloha-link-sidebar-panel-structural-map .ui-accordion .ui-accordion-content {
  padding: 0;
  border-top: 0;
  overflow: auto;
}

.dropdown-toggle{
  float:right;
  font-size: 12px;
  margin-top:-36px;
 min-width: 20px;
  max-width: 20px;
  _width: 20px;
  margin-left: 0;
  margin-right: 0;
  text-align: center;
  padding:4px 0px;
  background-image: url("/aloha/img/down.png");
  background-repeat: no-repeat;
  background-position:center 4px ;
  height:22px;
  border:1px solid transparent;
}
.dropdown-toggle.open{
  background-color: #ffffff;
  zoom: 1;
  border-color: #999;
  border-color: rgba(0, 0, 0, 0.2);
  border-style: solid;
  border-width: 1px 1px 0px;
}

 
.dropdown-menu{
  font-size:10px;
  position:absolute;
  right:0px;
 /* top:10px;*/
  margin-top:-50px;
  border-radius:0px !important;
  border-width-top:1px !important;
}
.menu-dropdown{}
/*.editing .Primary{
  margin-top:80px;
}

#alohaContainer {
  margin-bottom: 10px;
  height: 80px;
}

.aloha-ui-pin-down {
  display:none !important;
}

.aloha-ui-toolbar {
  position: static !important;
}
.editing #editbar{
  display:block;
}*/
#editbar{
  display: none;
}
.aloha-sidebar-panel-content.structural-view ol{
  margin-left:0px;
  padding-left: 0px;
}
</style>
<!--script type="text/javascript">
require(["jquery"], function(){
  $(".editable").on("keyup",function(e){
    console.log(e,this);
    e.preventDefault();
    return false;
  });
});
</script-->
	<!-- Le HTML5 shim, for IE6-8 support of HTML elements --><!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
   <![endif]-->
 </head>
 <body>

   <div class="topbar">
    <div class="fill">
      <div class="container">
        <span id="brand"><a class="brand" href="#">Alpha</a></span>

        <ul class="nav" id="navigation">
         <li id="editing"><a href="#">Editing</a></li>
         <li id="stopediting" class="active"><a href="#">Editing</a></li>
         <li id="structural"><a href="#">Structural</a></li>
         <li id="notstructural" class="active"><a href="#">Structural</a></li>
         <li id="save"><a id="save" href="#">Save</a></li>
         <li><a href="index.php?lock=true">Pblock Locked</a></li>
         <li><a href="index.php">All unlocked</a></li>
       </ul>
       
      <!-- <a id="save-page" href="#"><span class="label warning">Save</span></a>

      <a id="edit-page" href="#"><span class="label notice">Edit</span></a>-->

    </div>
  </div>
  <div class="fill" id="editbar">
   <div id="alohaContainer" class="container">
   </div>

 </div>
</div>

<div class="container" id="container">

  <div id="aloha-loading" class="alert-message notice">
    <p>Loading Aloha Editor</p>
  </div>

  <?php
  if($_GET["lock"]){
    require_once("leg/Tribunals (Scotland) Act 2014.lock.html");
  }else{
    require_once("leg/Tribunals (Scotland) Act 2014.html");
  }
  ?>
  <!--h1 id="top-text" class="editable">SIMON BILL [HL]</h1>
  <h2 class="editable" id="long_title">ENTER LONG TITLE</h2>
  <p class="editable" id="long_desc">BE IT ENACTED by the Queen’s most Excellent Majesty, by and with the advice and consent of the Lords Spiritual and Temporal, and Commons, in this present Parliament assembled, and by the authority of the same, as follows:—</p>


  <section id="section_1" class="editable">
    <header>Section 2</header>
    <div>
      <p>ENTER CLAUSE TEXT</p>
    </div>
  </section>
  <section id="section_2" class="editable">
    <header id="section_2_header">ENTER CLAUSE TITLE</header>
    <div id="section_2_body">
      <p>ENTER CLAUSE TEXT</p>
    </div>
  </section-->

  <!--<div xmlns="http://www.w3.org/1999/xhtml" class="LegSnippet legContainer">


    <div class="LegPrelims">
      <h1 class="LegTitle editable">Children (Access to Parents) Bill</h1>
      <h2 class="LegNo editable"></h2>
      <p class="LegLongTitle editable">Require courts, local authorities and other bodies, when determining or enforcing issues of residence and contact, to operate under the presumption that the rights of a child include the right to grow up knowing and having access to and contact with both of the parents involved in the residence or contact case concerned, unless exceptional circumstances are demonstrated that such contact is not in the best interests of the child; to create an offence if a relevant body or person does not operate under or respect such a presumption; and for connected purposes.</p>
      <p class="LegEnactingText editable">B<span class="LegSmallCaps">e it enacted</span> by the Queen’s most Excellent Majesty, by and with the advice and consent of the Lords Spiritual and Temporal, and Commons, in this present Parliament assembled, and by the authority of the same, as follows:—</p>
    </div>
    <div class="">
    <div class="LegP1group" id="p00028">
      <h3 class="LegP1group">Chapter 1 - <span class="editable">Somethinga</span></h3>
      <div class="LegP1 editable" id="p00030">
      <span class="LegRHS LegP1Text ">After section 1(1) of the Children Act 1989 insert—</span>
      
      <div class="LegP2Container" id="p00035">
        <span class="LegLHS LegP2NoC1Amend"><span class="LegAmendQuote">“</span>(1A)</span>

        <span class="LegRHS LegP2TextC1Amend">In respect of subsection (1), the court must act on the presumption that the child’s welfare is best served through having reasonable access to and contact with both parents unless exceptional circumstances are demonstrated that such access and contact is not in the best interests of the child.<span class="LegAmendQuote">”</span>. </span>

      </div>
      
      
    </div></div>
    <div class="LegP1group" id="p00040">
      <h3 class="LegP1group">
        <span class="LegLHS LegP1No">2</span>
        <span class="LegRHS LegP1groupTitle">Duties of local authorities and other bodies</span></h3><div class="LegP1" id="p00042">
      <div class="LegP2Container" id="p00045">
        <div class="LegLHS LegP2No">(1)</div>
        
        <p class="LegRHS LegP2Text">When a local authority or other body carries out any functions or makes any decisions in connection with the upbringing of a child, the child’s welfare shall be the paramount consideration.</p>
        
      </div>
      <div class="LegP2Container" id="p00049">
        <span class="LegLHS LegP2No">(2)</span>
        
        <span class="LegRHS LegP2Text">In respect of subsection (1), the local authority or other body must act on the presumption that the child’s welfare is best served through having access to and contact with both parents sufficient to enable him or her to have a meaningful relationship with both parents unless exceptional circumstances are demonstrated that such contact is not in the best interests of the child.</span>
        
      </div>
      <div class="LegP2Container" id="p00053">
        <span class="LegLHS LegP2No">(3)</span>
        
        <span class="LegRHS LegP2Text">Breach of the duties under this section shall be an offence.</span>
        
      </div>
      <div class="LegP2Container" id="p00057">
        <span class="LegLHS LegP2No">(4)</span>
        
        <span class="LegRHS LegP2Text">The Secretary of State may make regulations by statutory instrument setting out the scale of sentences for an offence under this section.</span>
        
      </div>
    </div></div>
    <div class="LegP1group" id="p00061"><h3 class="LegP1group"><span class="LegLHS LegP1No">3</span><span class="LegRHS LegP1groupTitle">Short title, commencement and extent</span></h3><div class="LegP1" id="p00063">
      <div class="LegP2Container" id="p00066">
        <span class="LegLHS LegP2No">(1)</span>
        
        <span class="LegRHS LegP2Text">This Act may be cited as the Children (Access to Parents) Act 2011.</span>
        
      </div>
      <div class="LegP2Container" id="p00070">
        <span class="LegLHS LegP2No">(2)</span>
        
        <span class="LegRHS LegP2Text">This Act shall come into force at the end of a period of 12 months beginning with the day on which it is passed.</span>
        
      </div>
      <div class="LegP2Container" id="p00074">
        <span class="LegLHS LegP2No">(3)</span>
        
        <span class="LegRHS LegP2Text">This Act extends to England, Wales and Northern Ireland.</span>
        
      </div>
    </div>
  </div>
</div>-->

</div>
</body>
</html>

