$(document).ready(function(){
	var scrollTop;
	var scrolledOnce = false;
	$('.dialogs-list').on('click', '.single-dialog', function(){
		$(".single-dialog").removeClass("active-dialog");
		$(this).addClass("active-dialog");
		$('.dialog-send-button').attr('id', $(this).attr('id'));
		$.ajax({
			type: 'get',
			url: 'api/getDialog',
			data: {'dialogId': $(this).attr('id')},
			success: function(response) {
				var dialog = "";
				response.forEach(function(mess, response){
					if (mess.from == getCookie('login'))
					{
						dialog += "<div class='message-outher'>" +
				                        "<div class='message-out'>" + 
				                            "<div class='message-out-photo'>" + 
				                                "<div class='message-out-photo-border'>" +
				                                    "<img src='images/1.jpeg'>" +
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
				                                    "<img src='images/1.jpeg'>" +
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
				$(".dialog-area").empty();
		        $(".dialog-area").append(dialog);
		        if (!scrolledOnce) {
        			scrollTop = $(".message-outher:last-child").offset().top - 561;
					$(".dialog-area").scrollTop(scrollTop);
					scrolledOnce = true;
				}
				$(".extra-right").css("display", "none");
			}
		});
	});
});