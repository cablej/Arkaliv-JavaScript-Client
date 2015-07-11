<?php echo file_get_contents("template_before.html") ?>
<head>
<script>
$( document ).ready(function() {
	initializePage()
	
	
	$("#is-blog-checkbox").change(function() {	
		if(this.checked) {
			if($("#blogger-name-div").length == 0) {
				$("#is-blog-checkbox").after("<div id='blogger-name-div'><br><input id='blogger-name-field' placeholder='Blogger name'></input></div>")
			}
		} else {
			if($("#blogger-name-div").length != 0) {
				$("#blogger-name-div").remove()
			}
		}
	});
	
});

</script>

</head>
<body>
<?php echo file_get_contents("template_body.html") ?>

<div id="upload-link">
<center>
<input id="link-title-field" placeholder="Title"></input><br><br>
<input id="link-url-field" placeholder="Url"></input><br><br>
Is blog post: <input id="is-blog-checkbox" type="checkbox"></input><br><br>
<input type="submit" value="Submit link" onclick="uploadLink($('#link-title-field').val(), $('#link-url-field').val(), $('#blogger-name-field').val())"></input>
<p id="upload-link-error"></p>
</center>
</div>

</body>
<?php echo file_get_contents("template_after.html") ?>