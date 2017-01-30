$(document).ready(function(){
	var socket = io();
	socket.on('newMess', function(data){
		var newMessage = "";
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
		var messBody = $('.dialog-message-input').val();
		$('.dialog-message-input').val("");
		if (messBody) {
			$.ajax({
				url: 'api/sendMessage',
				method: 'put',
				data: {message: messBody, dialogId: $(this).attr('id')},
				success: function(response)
				{
					/*console.log(response);
					console.log(typeof(response));
					console.log(typeof(response.date));*/
					socket.emit('newMess', response);
				}
			});
		}
	});
});