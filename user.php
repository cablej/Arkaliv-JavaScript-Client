<?php echo file_get_contents("template_before.html") ?>
<head>
<script>
$.post(REQUEST_URL, {action : "GetUser", user : getParameterByName("user"), type : "both", sort : "new"}, function( data ) {
	var json = JSON.parse(data)
	console.log(json)
	for(link_index in json["links"]) {
		var link = json["links"][link_index]
		
		$("#links").append(getLinkHTML(link, false))
	}
	
	for(comment_index in json["comments"]) {
		var comment = json["comments"][comment_index]
		
		$("#comments").append(getCommentHTML(comment))
	}
	
	pageLoaded()
});

$( document ).ready(function() {
	$("#username-header").text(getParameterByName("user"))
	initializePage()
});

</script>

</head>
<body>
<?php echo file_get_contents("template_body.html") ?>
<h2 id="username-header">Arkaliv</h1>
<div id="comments">
<h3>Comments</h3>
</div>
<div id="links">
<h3>Links</h3>
</div>
</body>
<?php echo file_get_contents("template_after.html") ?>