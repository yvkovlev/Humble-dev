$(document).ready(function(){
	/*$.ajax({
		type: 'get',
		url: 'api/getDialog',
		success: function(response) {
			var dialog = "";
			var arr = response.messages;
			arr.forEach(function(mess, arr){
				dialog += "<div class='message-outher'>" +
	                        "<div class='message-in'>" + 
	                            "<div class='message-in-photo'>" + 
	                                "<div class='message-in-photo-border'>" +
	                                    "<img src='images/1.jpeg'>" +
	                                "</div>" +
	                            "</div>" + 
	                            "<div class='message-in-text-box'>" + 
	                                "<span>" + mess.message + "</span>" + 
	                            "</div>" + 
	                            "<div class='message-in-time'>" + 
	                                "<span>12.47</span>" + 
	                            "</div>" + 
	                        "</div>" + 
	                    "</div>";
			});
	        $(".dialog-area").append(dialog);
		}
	});*/
	function getCookie(name) {
	  var matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	alert(getCookie("login"));
});