$(document).ready(function(){
	$(".single-dialog").on('click', function(){
		$(".single-dialog").removeClass("active-dialog");
		$(this).addClass("active-dialog");
	
	});
	$.ajax({
		type: 'get',
		url: 'api/getDialog',
		success: function(response) {
			var dialog = "";
			var arr = response.messages;
			arr.forEach(function(mess, arr){
				if (mess.from == getCookie("login"))
				{
					dialog += "<div class='message-outher'>" +
			                        "<div class='message-out'>" + 
			                            "<div class='message-out-photo'>" + 
			                                "<div class='message-out-photo-border'>" +
			                                    "<img src='images/1.jpeg'>" +
			                                "</div>" +
			                            "</div>" + 
			                            "<div class='message-out-text-box'>" + 
			                                "<span>" + mess.message + "</span>" + 
			                            "</div>" + 
			                            "<div class='message-out-time'>" + 
			                                "<span>12.47</span>" + 
			                            "</div>" + 
			                        "</div>" + 
			                    "</div>"; 
				}
				else {
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
	            }
			});
	        $(".dialog-area").append(dialog);
		}
	});
});