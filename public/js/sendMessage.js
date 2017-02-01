$(document).ready(function(){
	var socket = io();
	var scrollTop = 0;
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
	                                "<span>" + data.message.replace(/\n/g, '<br>') + "</span>" + 
	                            "</div>" + 
	                            "<div class='message-out-time'>" + 
	                                "<span>" + moment(data.date).format('HH:mm') + "</span>" + 
	                            "</div>" + 
	                        "</div>" + 
	                    "</div>"; 
		}
		else if (curDialog == data.dialog){
			var fromId = "";
			if (!data.anonym) fromId = data.fromId;
			else fromId = 'anonym';
			newMessage += "<div class='message-outher'>" +
	                        "<div class='message-in'>" + 
	                            "<div class='message-in-photo'>" + 
	                                "<div class='message-in-photo-border'>" +
	                                    "<img src='uploads/" + fromId + ".jpg" + "'>" +
	                                "</div>" +
	                            "</div>" + 
	                            "<div class='message-in-text-box'>" + 
	                                "<span>" + data.message.replace(/\n/g, '<br>') + "</span>" + 
	                            "</div>" + 
	                            "<div class='message-in-time'>" + 
	                                "<span>" + moment(data.date).format('HH:mm') + "</span>" + 
	                            "</div>" + 
	                        "</div>" + 
	                    "</div>";
        }
        $(".dialog-area").append(newMessage);
        if ($(".message-outher:last-child").height() >= $(".dialog-area").height()) {
        	scrollTop = $(".message-outher:last-child").position().top + $(".dialog-area").scrollTop() - 10;
        }
        else {
        	scrollTop = $(".message-outher:last-child").position().top + $(".dialog-area").scrollTop();
        }
		$(".dialog-area").scrollTop(scrollTop);
	});
	socket.emit('setRooms', {login: getCookie('login')});
	$('.dialog-send-button').on('click', function(){
		sendMessage();
	});
	$(".dialog-message-input").keypress(function(e){
	    if(e.keyCode == 13 && e.shiftKey){
	    	var rows = Number($(".dialog-message-input").attr("rows"));
	    	if (rows < 2) {
	    		$(".dialog-message-input").attr("rows", rows+=1);
	    		rows = rows + 1;
	    	}
	    	else if (rows >= 2 && rows < 6) {
	    		$(".dialog-message-input").attr("rows", rows+=1);
	    		$(".dialog-footer").css("height", "+=20");
	    		var lineHeight = Number($(".dialog-footer").css("height").replace('px','')) + 20;
	    		$(".dialog-message-input-outher").css("line-height", lineHeight + "px")
	    		rows = rows + 1;
	    	}
	    }
	    else if (e.keyCode == 13) {
	    	sendMessage();
	    	e.preventDefault();
	    }
	});
	$(".dialog-message-input").keyup(function(e){
		if (!($('.dialog-message-input').val())) {
			$(".dialog-message-input").attr("rows", 1);
			$(".dialog-footer").css("height", "60px");
			$(".dialog-message-input-outher").css("line-height", 60 + "px");
		}
	});
	function sendMessage () {
		var messBody = $('.dialog-message-input').val();
		$(".dialog-message-input").attr("rows", 1);
		$('.dialog-message-input').val("");
		$('.dialog-message-input').val().replace(/\n$/m, ' ');
		$(".dialog-footer").css("height", "60px");
		$(".dialog-message-input-outher").css("line-height", 60 + "px");
		if (messBody) {
			$.ajax({
				url: 'api/sendMessage',
				method: 'put',
				data: {message: messBody, dialogId: $('.dialog-send-button').attr('id')},
				success: function(response)
				{
					socket.emit('newMess', response);
				}
			});
		}
	};
});