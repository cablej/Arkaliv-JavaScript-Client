<?php echo file_get_contents("template_before.html") ?>
<head>
<script>
$.post(REQUEST_URL, {action : "GetLink", id : getParameterByName("id"), key : getCookie("key")}, function( data ) {
	var json = JSON.parse(data)
	
	var link = json["link"]
	
	$("#comments").append(getLinkHTML(link, true))
	
	
	for(comment_index in json["comments"]) {
	
		var comment = json["comments"][comment_index]
		
		$("#comments").append(getCommentHTML(comment))
	}
	
	pageLoaded()
});

$( document ).ready(function() {
	initializePage()
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