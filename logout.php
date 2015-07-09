<?php echo file_get_contents("template_before.html") ?>
<head>
<script>
$( document ).ready(function() {
	initializePage()
	logout()
});
</script>

</head>
<body>
<?php echo file_get_contents("template_body.html") ?>

<?php echo file_get_contents("template_after.html") ?>