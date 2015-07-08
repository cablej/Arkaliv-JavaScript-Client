<?php echo file_get_contents("template_before.html") ?>
<head>
<script>
$.post( "../request.php", {action : "GetLinks"}, function( data ) {
	var json = JSON.parse(data)
	
	for(link_index in json) {
	
		var link = json[link_index]
		
		$("#links").append(getLinkHTML(link))
	}
});
</script>

</head>
<body>
<?php echo file_get_contents("template_body.html") ?>
<div id="links">
</div>
</body>
<?php echo file_get_contents("template_after.html") ?>