$(document).ready(function(){
	var socket = io();
	socket.on('newMess', function(data){
		var newMessage = "", curDialog = $('.single-dialog.active-dialog').attr('id');
		if (data.from == getCookie('login') && curDialog == data.dialog)
		{
			newMessage += "<div class='message-outher'>" +
	                        "<div class='message-out'>" + 
	                            "<div class='message-out-photo'>" + 
	                                "<div class='message-out-photo-border'>" +
	                                    "<img src='uploads/" + data.fromId + ".jpg" + "'>" +
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
		else if (curDialog == data.dialog){
			newMessage += "<div class='message-outher'>" +
	                        "<div class='message-in'>" + 
	                            "<div class='message-in-photo'>" + 
	                                "<div class='message-in-photo-border'>" +
	                                    "<img src='uploads/" + data.fromId + ".jpg" + "'>" +
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
					socket.emit('newMess', response);
				}
			});
		}
	});
});