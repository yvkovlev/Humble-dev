$(document).ready(function(){
  	var scrollTop;
	$('.dialogs-list').on('click', '.single-dialog', function(){
		var dialogName = $(this).find(".dialog-title").html();
		$(".dialog-name").html(dialogName);
		$(".single-dialog").removeClass("active-dialog");
		$(this).addClass("active-dialog");
		$('.dialog-send-button').attr('id', $(this).attr('id'));
		$(".dialog-area").empty();
		$(".extra-right").css("display", "none");
		$.ajax({
			type: 'get',
			url: 'api/getDialog',
			data: {'dialogId': $(this).attr('id')},
			success: function(response) {
				var dialog = "";
				var scrolledOnce = false;
				response.forEach(function(mess, response){
					if (mess.from == getCookie('login'))
					{
						dialog += "<div class='message-outher'>" +
				                        "<div class='message-out'>" + 
				                            "<div class='message-out-photo'>" + 
				                                "<div class='message-out-photo-border'>" +
				                                    "<img src='uploads/" + mess.fromId + ".jpg" + "'>" +
				                                "</div>" +
				                            "</div>" + 
				                            "<div class='message-out-text-box'>" + 
				                                "<span>" + mess.message.replace(/\n/g, '<br>') + "</span>" + 
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
				                                    "<img src='uploads/" + mess.fromId + ".jpg" + "'>" +
				                                "</div>" +
				                            "</div>" + 
				                            "<div class='message-in-text-box'>" + 
				                                "<span>" + mess.message.replace(/\n/g, '<br>') + "</span>" + 
				                            "</div>" + 
				                            "<div class='message-in-time'>" + 
				                                "<span>12.47</span>" + 
				                            "</div>" + 
				                        "</div>" + 
				                    "</div>";
		            }
				});
		        $(".dialog-area").append(dialog);
		        if (!scrolledOnce) {
        			if ($(".message-outher:last-child").height() >= $(".dialog-area").height()) {
						scrollTop = $(".message-outher:last-child").position().top + $(".dialog-area").scrollTop() - 10;
					}
					else {
						scrollTop = $(".message-outher:last-child").position().top + $(".dialog-area").scrollTop();
					}
					$(".dialog-area").scrollTop(scrollTop);
					scrolledOnce = true;
				}
			}
		});
	});
});