<?php
/* PUT data comes in on the stdin stream */
$putdata = file_get_contents("php://input");

print_r($putdata);

if($putdata){
	file_put_contents("saved.json",$putdata);
}
?>
<!DOCTYPE html>
<html>
<head>
	<script src="/mercury/javascripts/mercury_loader.js?src=/mercury" type="text/javascript"></script>
	<script src="/mercury/javascripts/jquery-1.7.js" type="text/javascript"></script>
	<script type="text/javascript">
	$(document).ready(function(){
		$("[data-mercury]").on("keyup",keyup);
	
		});

		function keyup(e){
			//console.log(e,this);
		}

	</script>
</head>
<body>
	<div>
		<?php 
		if(file_exists("saved.json")){
			require_once("save.php");
		}else{
			?>

			<h1 data-mercury="simple" id="main_title">SIMON BILL [HL]</h1>
			<h2 data-mercury="simple" id="long_title">ENTER LONG TITLE</h2>
			<p data-mercury="simple" id="long_desc">BE IT ENACTED by the Queen’s most Excellent Majesty, by and with the advice and consent of the Lords Spiritual and Temporal, and Commons, in this present Parliament assembled, and by the authority of the same, as follows:—</p>
			<section id="section_1" data-mercury="full">
				<header>Section 2</header>
				<div>
					<p>ENTER CLAUSE TEXT</p>
				</div>
			</section>
			<section id="section_2">
				<header id="section_2_header" data-mercury="simple">ENTER CLAUSE TITLE</header>
				<div id="section_2_body" data-mercury="simple">
					<p>ENTER CLAUSE TEXT</p>
				</div>
			</section>
			<div id="section_new"  data-mercury="full">
			</div>
			<?php
		}
		?>
	</div>
</body>
</html>