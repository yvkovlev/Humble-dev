$(document).ready(function(){
  	var scrollTop;
	$('.dialogs-list').on('click', '.single-dialog', function(){
		var dialogName = $(this).find(".dialog-title").html();
		var curDialog = $(this).attr('id');
		var selector = "#" + curDialog + " .single-dialog-time";
		var companionPhotoSrc = $(this).find("img").attr("src");
		$(".dialog-name").html(dialogName);
		$(".single-dialog").removeClass("active-dialog");
		$(".online-status-dialogs").removeClass("active-status");
		$(this).addClass("active-dialog");
		$(this).find(".online-status-dialogs").addClass("active-status");
		$('.dialog-send-button').attr('id', $(this).attr('id'));
		$(".dialog-area").empty();
		$(".extra-right").css("display", "none");
		$(".cap").css("display", "none");
		$.ajax({
			type: 'get',
			url: 'api/getDialog',
			data: {'dialogId': $(this).attr('id')},
			success: function(response) {
				var dialog = "", scrolledOnce = false, lastdate, arr = response.messages;
				arr.forEach(function(mess, arr){
					lastdate = "<span class='last-message-time'>" + moment(mess.date).format('HH:mm') + "</span>";
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
				                                "<span>" + moment(mess.date).format('HH:mm') + "</span>" + 
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
				                                "<span>" + moment(mess.date).format('HH:mm') + "</span>" + 
				                            "</div>" + 
				                        "</div>" + 
				                    "</div>";
		            }
				});
				if (!arr.length) {
					dialog = "<div class='empty-dialog'>" +
                        		"<div class='empty-dialog-photo'>" +
                            		"<img src='" + companionPhotoSrc + "'>" +
                        		"</div>" +
                        		"<div class='empty-dialog-info'>У Вас пока нет сообщений</div>" +
                    		"</div>";
				}
				$(selector).html(lastdate);
		        $(".dialog-area").append(dialog);
		        $(".dialog-area span").Emoji();
		        $(".emoji-table span").Emoji();
		        $('.dialog-area').linkify({
            		target: "_blank"
        		}); 
		        if (response.anonym) $(".dialog-class span").html("Анонимный диалог");
		        else $(".dialog-class span").html("Открытый диалог");
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