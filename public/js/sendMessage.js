$(document).ready(function(){
	var socket = io();
	var scrollTop = 0;
	var chord = document.getElementById('chord');
	var login = getCookie('login');
	socket.on('newMess', function(data){
  		var newMessage = "", curDialog = $('.single-dialog.active-dialog').attr('id');
  		var dialog = "";
  		console.log(data);
  		if ($('#' + data.dialog).html() == undefined) {
  			var fromId, from;
  			if (data.anonym) {
  				from = 'Anonym';
  				fromId = 'anonym';
  			} else {
  				from = data.from;
  				fromId = data.fromId;
  			}
  			dialog = "<div class='single-dialog animated' id='" + data.dialog + "'>" + 
                        "<div class='single-dialog-photo'>" + 
                            "<div class='single-dialog-photo-border'>" + 
                                "<img src='uploads/" + fromId + ".jpg" + "'>" + 
                            "</div>" + 
                            "<div class='online-status-dialogs'></div>" + 
                        "</div>" + 
                        "<div class='single-dialog-body'>" + 
                            "<div class='single-dialog-title'>" + 
                                "<span class='dialog-title'>" + from + "</span>" +
                            "</div>" + 
                            "<div class='single-dialog-last-message'>" + 
                                "<span class='last-message'>" + data.message + "</span>" + 
                            "</div>" + 
                            "<div class='single-dialog-time'>" + 
                                "<span class='new-message-indicator'>NEW</span>" +
                            "</div>" + 
                        "</div>" + 
                    "</div>";
            $('.dialogs-list').prepend(dialog);
  		} else {
  			var selector = "#" + data.dialog + " .single-dialog-last-message .last-message";
	  		$(selector).html(data.message);
	  		selector = "#" + data.dialog + " .single-dialog-time";

  			if (curDialog == data.dialog)
  			{
  				$(selector).html("<span class='last-message-time'>" + moment(data.date).format('HH:mm') + "</span>");
  				dialog = "<div class='single-dialog animated active-dialog' id='" + data.dialog + "'>" +
  						$('#' + data.dialog).html() + 
  					"</div>";
  				if (data.from != login) chord.play();
  			}
  			else
  			{
  				$(selector).html("<span class='new-message-indicator'>NEW</span>");
  				dialog = "<div class='single-dialog animated' id='" + data.dialog + "'>" +
  						$('#' + data.dialog).html() + 
  					"</div>";
  	  			if (data.from != login) chord.play();
  			}
  			$('#' + data.dialog).remove();
  			$('.dialogs-list').prepend(dialog);
  		}
		if (data.from == login && curDialog == data.dialog)
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
	socket.emit('setRooms', {login: login});
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