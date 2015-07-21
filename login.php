<?php echo file_get_contents("template_before.html") ?>
<head>
<script>
$( document ).ready(function() {
	initializePage()
	
	pageLoaded()
});
</script>

</head>
<body>
<?php echo file_get_contents("template_body.html") ?>

<div id="signup">
<center>
<p>Create an account</p>
<input id="sign-up-username-field" placeholder="username"></input><br><br>
<input id="sign-up-password-field" placeholder="password" type="password"></input><br><br>
<input id="sign-up-confirm-password-field" placeholder="confirm password" type="password"></input><br><br>
<input type="submit" value="Create account" onclick="createAccount($('#sign-up-username-field').val(), $('#sign-up-password-field').val(), $('#sign-up-confirm-password-field').val())"></input>
<p id="sign-up-error"></p>
</center>
</div>


<div id="signin">
<center>
<p>Sign in</p>
<input id="sign-in-username-field" placeholder="username"></input><br><br>
<input id="sign-in-password-field" placeholder="password" type="password"></input><br><br>
<input type="submit" value="Sign in" onclick="logIn($('#sign-in-username-field').val(), $('#sign-in-password-field').val())"></input>
</center>
<p id="sign-in-error"></p>
</div>

</body>
<?php echo file_get_contents("template_after.html") ?>