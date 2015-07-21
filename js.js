var REQUEST_URL = "../request.php"
var converter = new Markdown.Converter();

/*

Set up for every page

*/

function initializePage() {
	var username = getCookie("username")
	if(username != "") {
		$("#username").text(getCookie("username"))
		$("#login").hide()
		$("#logout").show()
	}
}

function pageLoaded() {
	MathJax.Hub.Typeset();
}

/*

HTTP POST requests to REQUEST_URL

*/

function logIn(usernameEntered, passwordEntered) {
	$.post(REQUEST_URL, {action : "SignIn", username : usernameEntered, password : passwordEntered}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#sign-in-error").text(json["error"])
			return
		}	
		document.cookie = "username=" + json["username"]
		document.cookie = "key=" + json["key"]
		window.location = "index.php"
	});
}

function createAccount(usernameEntered, passwordEntered, confirmPasswordEntered) {
	
	if(passwordEntered != confirmPasswordEntered) {
		$("#sign-up-error").text("Passwords are not the same.")
		return
	}

	$.post(REQUEST_URL, {action : "SignUp", username : usernameEntered, password : passwordEntered}, function( data ) {
		var json = JSON.parse(data)
		if(json.hasOwnProperty('error')) {
			$("#sign-up-error").text(json["error"])
			return
		}	
		document.cookie = "username=" + json["username"]
		document.cookie = "key=" + json["key"]
		window.location = "index.php"
	});
}

function uploadPost(title, url, text, bloggerName) {
	var user_key = getCookie("key")
	if(user_key == "") {
		$("#upload-link-error").text("Please log in.")
		return
	}
	
	bloggerName = bloggerName == undefined ? "" : bloggerName
	
	$.post(REQUEST_URL, {action : "UploadPost", key: user_key, title : title, url: url, text : text, bloggerName: bloggerName}, function( data ) {
		var link = JSON.parse(data)
	
		console.log(link)
	
		if(link.hasOwnProperty('error')) {
			$("#upload-link-error").text(link["error"])
			return
		}
		
		var id = link["link"]["id"]
		
		window.location = "link.php?id=" + id
	});
}

function reply(parent, parentComment, text) {
	var user_key = getCookie("key")
	if(user_key == "") {
		$("#save-comment-error").text("Please log in.")
		return
	}
	$.post(REQUEST_URL, {action : "AddComment", key: user_key, parent : parent, parentComment: parentComment, text: text}, function( data ) {
		var link = JSON.parse(data)
	
		console.log(link)
	
		if(link.hasOwnProperty('error')) {
			$("#save-comment-error").text(json["error"])
			return
		}
		
		window.location = "link.php?id=" + parent
	});
}

function logout() {
	document.cookie = "username="
	document.cookie = "key="
	window.location = "index.php"
}

function vote(id, type) {
$("#" + id + "-" + type).fadeTo( 0, 1);
}

/*

HTML templates for given types, such as links and comments

*/

function getLinkHTML(link, expanded) {
	var url = link["url"]

	if(url.indexOf("http://") != 0 && url.indexOf("https://") != 0) {
		url = "http://" + url;
	}
	
	var commentsPlural = link["numComments"] == 1 ? "" : "s"
	
	var selfText = ""
	
	if(link["isSelf"] == 1) {
		url = "link.php?id=" + link["id"]
		if(expanded) {
			selfText = "<div class='link-text'><p>" + converter.makeHtml(link["selfText"]) +"</p></div>"
		}
	}

	var div = "<div class='link'><div id='vote-section'><img class='vote-arrow upvote-arrow' id='" + link["id"] + "-upvote' onclick='vote(\x22" + link["id"] + "\x22, \x22upvote\x22)' src='images/up-arrow.png' /><br><img class='vote-arrow downvote-arrow' id='" + link["id"] + "-downvote' onclick='vote(\x22" + link["id"] + "\x22, \x22downvote\x22)' src='images/up-arrow.png' /></div><div class='titleSection'><p class='title'><a href='" + url + "'>" + link["title"] + "</a></p><p class='tagline'>Submitted " + timeSince(dateFromTimestamp(link["date"])) +" by <a href='user.php?user=" + link["author"] +"'>" + link["author"] + "</a></p>" + selfText +"<ul class='flat-list buttons'><li><a href='link.php?id=" + link["id"] + "'>" + link["numComments"] + " comment" + commentsPlural +"</a></li><li><a style='cursor:pointer' id='" + link["id"] + "' onclick=\x22appendReply('" + link["id"] + "', '', '" + link["id"] + "')\x22>reply</a></li></ul></div></div>";

	return div;
}

function getCommentHTML(comment) {

	var div = "<div class='comment' style='margin-left:" + comment["level"] * 40 + "px;'><div class='tagline'><a href='user.php?user=" + comment["author"] +"'>" + comment["author"] + "</a> <span>" + timeSince(dateFromTimestamp(comment["date"])) + "</span></div><div class='comment-text'><p>" + converter.makeHtml(comment["text"]) +"</p></div><ul class='flat-list buttons'><li><a href='#'>permalink</a></li><li><a style='cursor:pointer' id='" + comment["id"] +"' onclick=\x22appendReply('" + comment["parent"] +"', '" + comment["id"] +"', '" + comment["id"] +"')\x22>reply</a></li></ul></div>";

	return div;
}

function getBloggerHTML(blogger) {
	var div = "<div class='blogger'><div class='titleSection'><p class='title'><a href='displayBlogger.php?name=" + blogger["bloggerName"] + "'>" + blogger["bloggerName"] + "</a></p><p class='tagline'>" + blogger["numPosts"] + " posts. Last post " + timeSince(dateFromTimestamp(blogger["mostRecentDate"])) +"</p></div></div>";

	return div;
}

function appendReply(parent, parentComment, reply_id) {
	if($("#" + reply_id + "-textarea").length != 0) {
		$("#" + reply_id + "-textarea").focus()
		return;
	}
	$("#" + reply_id).after("<div id='" + reply_id + "-div'><br><textarea class='comment-textarea' data-provide='markdown' id='" + reply_id + "-textarea'></textarea><br><br><input type='submit' value='Save' onclick=\x22reply('" + parent + "', '" + parentComment + "', $('#" + reply_id + "-textarea').val())\x22></input> <input type='submit' value='Cancel' onclick=\x22$('#" + reply_id + "-div').remove()\x22></input><p id='save-comment-error'></p></div>");
	$("#" + reply_id + "-textarea").focus()
}

/*

Helper methods

*/

//Returns the HTTP GET parameter by the given name, or "" if it does not exist
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Returns the Cookie for the given name, or "" if it does not exist
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

//Returns the time since a given Date.
var timeSince = function(date) {
    if (typeof date !== 'object') {
        date = new Date(date);
    }

    var seconds = Math.floor((new Date() - date) / 1000 + 60*60);
    var intervalType;

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }

    if (interval > 1 || interval === 0) {
        intervalType += 's';
    }
    
    if(interval < 0) return "just now"

    return interval + ' ' + intervalType + " ago";
};

//returns a date from a given MYSQL timestamp
function dateFromTimestamp(timestamp) {
	var t = timestamp.split(/[- :]/);
	return new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
}