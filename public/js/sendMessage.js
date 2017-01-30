$(document).ready(function(){
	var socket = io();
	socket.on('newMess', function(data){
		var newMessage = "";
		console.log(data);
		if (data.from == getCookie('login'))
		{
			newMessage += "<div class='message-outher'>" +
	                        "<div class='message-out'>" + 
	                            "<div class='message-out-photo'>" + 
	                                "<div class='message-out-photo-border'>" +
	                                    "<img src='images/1.jpeg'>" +
	                                "</div>" +
	                            "</div>" + 
	                            "<div class='message-out-text-box'>" + 
	                                "<span>" + data.message + "</span>" + 
	                            "</div>" + 
	                            "<div class='message-out-time'>" + 
	                                "<span>12.47</span>" + 
	                            "</div>" + 
	                        "</div>" + 
	                    "</div>"; 
		}
		else {
			newMessage += "<div class='message-outher'>" +
	                        "<div class='message-in'>" + 
	                            "<div class='message-in-photo'>" + 
	                                "<div class='message-in-photo-border'>" +
	                                    "<img src='images/1.jpeg'>" +
	                                "</div>" +
	                            "</div>" + 
	                            "<div class='message-in-text-box'>" + 
	                                "<span>" + data.message + "</span>" + 
	                            "</div>" + 
	                            "<div class='message-in-time'>" + 
	                                "<span>12.47</span>" + 
	                            "</div>" + 
	                        "</div>" + 
	                    "</div>";
        }
        $(".dialog-area").append(newMessage);
	});
	socket.emit('setRooms', {login: getCookie('login')});
	$('.dialog-send-button').on('click', function(){
		sendMessage();
	});
	$(".dialog-message-input").keypress(function(e){
	    if(e.keyCode == 13 && e.shiftKey){
	    	var rows = Number($(".dialog-message-input").attr("rows"));
	    	if (rows < 3) {
	    		$(".dialog-message-input").attr("rows", rows+=1);
	    		$(".dialog-message-input").css("marginTop", "-=9");
	    		$(".dialog-message-input").css("marginBottom", "-=9");
	    		rows = rows + 1;
	    	}
	    	else if (rows >= 3 && rows < 5) {
	    		$(".dialog-message-input").attr("rows", rows+=1);
	    		$(".dialog-footer").css("height", "+=20");
	    		$(".dialog-message-input").css("marginBottom", "0");
	    		rows = rows + 1;
	    	}
	    }
	    else if (e.keyCode == 13) {
	    	sendMessage();
	    }
	});
	function sendMessage () {
		var messBody = $('.dialog-message-input').val();
		$('.dialog-message-input').val("");
		$(".dialog-message-input").attr("rows", 1);
		$(".dialog-footer").css("height", "60px")
		$(".dialog-message-input").css("margin", "18px 0");
		if (messBody) {
			$.ajax({
				url: 'api/sendMessage',
				method: 'put',
				data: {message: messBody, dialogId: $('.dialog-send-button').attr('id')},
				success: function(response)
				{
					/*console.log(response);
					console.log(typeof(response));
					console.log(typeof(response.date));*/
					socket.emit('newMess', response);
				}
			});
		}
	};
});