$(document).ready(function(){
	$("#cap-rocket").css("display", "block");
	getUserDialogs();
	$('#chord').prop("volume", 0.2);
});

function getUserDialogs() {
	$('.dialogs-list').html("");
	$.ajax({
		type: 'get',
		url: 'api/getUserDialogs',
		success: function (response)
		{
			var dialogList = "";
			response.forEach(function(curDialog, response){
				var newMessage = "";
				if (!curDialog.newMessage) newMessage = "<span class='new-message-indicator'>NEW</span>";
				else newMessage = "<span class='last-message-time'>" + moment(curDialog.date).format('HH:mm') + "</span>";
				dialogList +=   "<div class='single-dialog animated' id='" + curDialog.id + "'>" + 
			                        "<div class='single-dialog-photo'>" + 
			                            "<div class='single-dialog-photo-border'>" + 
			                                "<img src='uploads/" + curDialog.userId + ".jpg" + "' title='" + curDialog.name + "'>" + 
			                            "</div>" + 
			                            "<div class='online-status-dialogs'></div>" + 
			                        "</div>" + 
			                        "<div class='single-dialog-body'>" + 
			                            "<div class='single-dialog-title'>" + 
			                                "<span class='dialog-title'>" + curDialog.name + "</span>" +
			                            "</div>" + 
			                            "<div class='single-dialog-last-message'>" + 
			                                "<span class='last-message'>" + curDialog.lastMessage + "</span>" + 
			                            "</div>" + 
			                            "<div class='single-dialog-time'>" + 
			                                newMessage +
			                            "</div>" + 
			                        "</div>" + 
			                    "</div>";
			});		
			$('.dialogs-list').prepend(dialogList);
			$('.last-message').linkify({
            		target: "_blank"
        	});
        	$(".dialogs-list span").Emoji(); 
		}
	});
}