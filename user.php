<?php echo file_get_contents("template_before.html") ?>
<head>
<script>
$.post(REQUEST_URL, {action : "GetUser", user : getParameterByName("user"), type : "both", sort : "new"}, function( data ) {
	var json = JSON.parse(data)
	console.log(json)
	for(link_index in json["links"]) {
		var link = json["links"][link_index]
		
		$("#links").append(getLinkHTML(link))
	}
});

$( document ).ready(function() {
	$("#username-header").text(getParameterByName("user"))
	initializePage()
});

</script>

</head>
<body>
<?php echo file_get_contents("template_body.html") ?>
<h1 id="username-header">Arkaliv</h1>
<div id="links">
</div>
</body>
<?php echo file_get_contents("template_after.html") ?>