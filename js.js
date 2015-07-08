function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getLinkHTML(link) {
	var url = link["url"]

	if(url.indexOf("http://") != 0 && url.indexOf("https://") != 0) {
		url = "http://" + url;
	}

	var div = "<div class='link'><div class='titleSection'><p class='title'><a href='" + url + "'>" + link["title"] + "</a></p><p class='tagline'>Submitted " + timeSince(dateFromTimestamp(link["date"])) +" ago by <a href='user.php?user=" + link["author"] +"'>" + link["author"] + "</a></p><ul class='flat-list buttons'><li><a href='link.php?id=" + link["id"] + "'>" + link["numComments"] + " comments</a></li></ul></div></div>";

	return div;
}

function getCommentHTML(comment) {
	var div = "<div class='comment' style='margin-left:" + comment["level"] * 40 + "px;'><div class='tagline'><a href='user.php?user=" + comment["author"] +"'>" + comment["author"] + "</a> <span>" + timeSince(dateFromTimestamp(comment["date"])) + " ago</span></div><div class='comment-text'><p>" + comment["text"] +"</p></div><ul class='flat-list buttons'><li><a href='#'>permalink</a></li><li><a href='#'>reply</a></li></ul></div>";

	return div;
}

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

    return interval + ' ' + intervalType;
};

function dateFromTimestamp(timestamp) {
	var t = timestamp.split(/[- :]/);
	return new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
}