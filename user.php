<?php echo file_get_contents("template_before.html") ?>
<head>
<script>
$.post( "../request.php", {action : "GetUser", user : getParameterByName("user"), type : "both", sort : "new"}, function( data ) {
	var json = JSON.parse(data)
	console.log(json)
	for(link_index in json["links"]) {
		var link = json["links"][link_index]
		
		$("#links").append(getLinkHTML(link))
	}
});

$( document ).ready(function() {
	$("#username").text(getParameterByName("user"))
});

</script>

</head>
<body>
<?php echo file_get_contents("template_body.html") ?>
<h1 id="username">Arkaliv</h1>
<div id="links">
</div>
</body>
<?php echo file_get_contents("template_after.html") ?>