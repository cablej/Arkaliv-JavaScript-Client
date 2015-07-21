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
	
	pageLoaded()
	
});

</script>

</head>
<body>
<?php echo file_get_contents("template_body.html") ?>

<div id="upload-link">
<center>
<input id="post-title-field" placeholder="Title"></input><br><br>
<textarea class="self-text-field" placeholder="Text"></textarea><br><br>
Is blog post: <input id="is-blog-checkbox" type="checkbox"></input><br><br>
<input type="submit" value="Submit post" onclick="uploadPost($('#post-title-field').val(), '', $('.self-text-field').val(), $('#blogger-name-field').val())"></input>
<p id="upload-link-error"></p>
</center>
</div>

</body>
<?php echo file_get_contents("template_after.html") ?>