<?php echo file_get_contents("template_before.html") ?>
<head>
<script>
$.post( "../request.php", {action : "GetLink", id : getParameterByName("id")}, function( data ) {
	var json = JSON.parse(data)
	
	var link = json["link"]
	
	$("#comments").append(getLinkHTML(link))
	
	
	for(comment_index in json["comments"]) {
	
		var comment = json["comments"][comment_index]
		
		$("#comments").append(getCommentHTML(comment))
	}
});
</script>

</head>
<body>
<?php echo file_get_contents("template_body.html") ?>
<div id="link">
</div>
<div id="comments">
</div>
</body>
<?php echo file_get_contents("template_after.html") ?>