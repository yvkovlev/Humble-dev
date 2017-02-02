$(document).ready(function(){
	getUserDialogs();
});

function getUserDialogs() {
	$("#cap-rocket").css("display", "block");
	$('.dialogs-list').html("");
	$.ajax({
		type: 'get',
		url: 'api/getUserDialogs',
		success: function (response)
		{
			var dialogList = "";
			response.forEach(function(curDialog, response){
				dialogList +=   "<div class='single-dialog animated' id='" + curDialog.id + "'>" + 
			                        "<div class='single-dialog-photo'>" + 
			                            "<div class='single-dialog-photo-border'>" + 
			                                "<img src='uploads/" + curDialog.userId + ".jpg" + "'>" + 
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
			                                "<span class='last-message-time'>" + moment(curDialog.date).format('HH:mm') + "</span>" + 
			                            "</div>" + 
			                        "</div>" + 
			                    "</div>";
			});		
			$('.dialogs-list').prepend(dialogList);
		}
	});
}