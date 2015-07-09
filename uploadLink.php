<?php echo file_get_contents("template_before.html") ?>
<head>
<script>
$( document ).ready(function() {
	initializePage()
});
</script>

</head>
<body>
<?php echo file_get_contents("template_body.html") ?>

<div id="upload-link">
<center>
<input id="link-title-field" placeholder="Title"></input><br><br>
<input id="link-url-field" placeholder="Url"></input><br><br>
<input type="submit" value="Submit link" onclick="uploadLink($('#link-title-field').val(), $('#link-url-field').val())"></input>
<p id="upload-link-error"></p>
</center>
</div>

</body>
<?php echo file_get_contents("template_after.html") ?>