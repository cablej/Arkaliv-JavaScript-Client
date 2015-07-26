<?php echo file_get_contents("template_before.html") ?>
<head>
<script>

page = getParameterByName("page")
if(page == "") page = 1;
	
$.post(REQUEST_URL, {action : "GetLinks", page : page, key : getCookie("key")}, function( data ) {
	var json = JSON.parse(data)
	
	if(json.length == 0) {
		$("#links").append("<p>Nothing to see here</p>");
	}
	
	for(link_index in json) {
	
		var link = json[link_index]
		
		$("#links").append(getLinkHTML(link, false))
	}
	
	if(json.length == 25) $("#links").after("<a href='?page=" + (parseInt(page) + 1) +"'><button>next</button></a>");
	
	if(page > 1) $("#links").after("<a href='?page=" + (parseInt(page) - 1) +"'><button>previous</button></a> ");
	
	pageLoaded()
});

$( document ).ready(function() {
	initializePage()
});
</script>

</head>
<body>
<?php echo file_get_contents("template_body.html") ?>
<div id="links">
</div>
</body>
<?php echo file_get_contents("template_after.html") ?>