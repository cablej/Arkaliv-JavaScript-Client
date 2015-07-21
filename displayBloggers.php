<?php echo file_get_contents("template_before.html") ?>
<head>
<script>
$.post(REQUEST_URL, {action : "GetBloggers"}, function( data ) {
	var json = JSON.parse(data)
	
	for(blogger_index in json) {
	
		var blogger = json[blogger_index]
		
		$("#bloggers").append(getBloggerHTML(blogger))
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
<div id="bloggers">
</div>
</body>
<?php echo file_get_contents("template_after.html") ?>