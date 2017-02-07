$(document).ready(function(){
	var deleteConfirmClose = true;
    var clearConfirmClose = true;
	var photoClose = true;
    var videoClose = true;
    var geopositionClose = true;
    var settingsClose = true;
    var emojiClose = true;
    $("#photo").click(function(){
        if (photoClose) {
            $(".add-video-popup").fadeOut(300);
            $(".add-geoposition-popup").fadeOut(300);
            $(".settings-popup").fadeOut(300);
            $(".add-photo-popup").fadeIn(300);
            photoClose = false;
            videoClose = true;
            geopositionClose = true;
            settingsClose = true;
        }
        else {
            $(".add-photo-popup").fadeOut(300);
            photoClose = true;
        }
    });
    $("#video").click(function(){
        if (videoClose) {
            $(".add-photo-popup").fadeOut(300);
            $(".add-geoposition-popup").fadeOut(300);
            $(".settings-popup").fadeOut(300);
            $(".add-video-popup").fadeIn(300);
            videoClose = false;
            photoClose = true;
            geopositionClose = true;
            settingsClose = true;
        }
        else {
            $(".add-video-popup").fadeOut(300);
            videoClose = true;
        }
    });
    $("#geoposition").click(function(){
        if (geopositionClose) {
            $(".add-photo-popup").fadeOut(300);
            $(".add-video-popup").fadeOut(300);
            $(".settings-popup").fadeOut(300);
            $(".add-geoposition-popup").fadeIn(300);
            geopositionClose = false;
            photoClose = true;
            videoClose = true;
            settingsClose = true;
        }
        else {
            $(".add-geoposition-popup").fadeOut(300);
            geopositionClose = true;
        }
    });
    $("#settings").click(function(){
        if (settingsClose) {
            $(".add-photo-popup").fadeOut(300);
            $(".add-video-popup").fadeOut(300);
            $(".add-geoposition-popup").fadeOut(300);
            $(".settings-popup").fadeIn(300);
            settingsClose = false;
            geopositionClose = true;
            photoClose = true;
            videoClose = true;
        }
        else {
            $(".settings-popup").fadeOut(300);
            settingsClose = true;
        }
    });
    $(document).click(function(event){ 
        if (!$(event.target).closest(".settings-popup").length && !$(event.target).closest("#settings").length) {
            $(".settings-popup").fadeOut(300);
            settingsClose = true;
            setTimeout(function(){
                $('#deleteDialog > .action-info').html("Удалить чат");
                $('#clearDialog > .action-info').html("Очистить чат");
                $(".actions-confirm").css("display", "none");
                setTimeout(function(){
                    deleteConfirmClose = true;
                    clearConfirmClose = true;
                }, 1);
            }, 300);
        }
        event.stopPropagation();
    });


    $('#clearDialog').on('click', function(){
        if (clearConfirmClose) {
            $('#clearDialog > .action-info').html("Вы уверены?");
            $("#clearDialog > .actions-confirm").css("display", "block");
            clearConfirmClose = false;
        }
    });
    $("#clearDialogRefuse").on("click", function(){
        $('#clearDialog > .action-info').html("Очистить чат");
        $("#clearDialog > .actions-confirm").css("display", "none");
        setTimeout(function(){
            clearConfirmClose = true;
        }, 1);
    });
	$('#clearDialogConfirm').on('click', function(){
		var curDialog = $('.single-dialog.active-dialog').attr('id');
        $('#clearDialog > .action-info').html("Очистить чат");
        $("#clearDialog > .actions-confirm").css("display", "none");
        setTimeout(function(){
            clearConfirmClose = true;
        }, 1);
		$.ajax({
			url: 'api/clearDialog',
			type: 'delete',
			data: {dialogId: curDialog},
			success: function(response) {
				$(".dialog-area").empty();
				$('.active-dialog .last-message').html('В беседе нет сообщений');
                emptyDialog();
			}
		});
	});
	$('#deleteDialog').on('click', function(){
		if (deleteConfirmClose) {
			$('#deleteDialog > .action-info').html("Вы уверены?");
			$("#deleteDialog > .actions-confirm").css("display", "block");
			deleteConfirmClose = false;
		}
	});
	$("#deleteDialogRefuse").on("click", function(){
		$('#deleteDialog > .action-info').html("Удалить чат");
		$("#deleteDialog > .actions-confirm").css("display", "none");
		setTimeout(function(){
			deleteConfirmClose = true;
		}, 1);
	});
	$('#deleteDialogConfirm').on('click', function(){
		var curDialog = $('.single-dialog.active-dialog').attr('id');
		$('#deleteDialog > .action-info').html("Удалить чат");
		$("#deleteDialog > .actions-confirm").css("display", "none");
        $(".active-dialog").remove();
		setTimeout(function(){
			deleteConfirmClose = true;
		}, 1);
		$.ajax({
			url: 'api/clearDialog',
			type: 'delete',
			data: {dialogId: curDialog},
			success: function(response) {
				$.ajax({
					url: 'api/deleteDialog',
					type: 'delete',
					data: {dialogId: curDialog},
					success: function(response) {
						$(".extra-right").css("display", "block");
                        $("#cap-empty").css("display", "block");
						$(".settings-popup").fadeOut(300);
                        $('.dialog-send-button').removeAttr('id');
						settingsClose = true;
					}
				});
			}
		});
	});
    $("#emoji").click(function(){
        if (emojiClose) {
            $(".emoji-popup").fadeIn(300);
            emojiClose = false;
        }
        else {
            $(".emoji-popup").fadeOut(300);
            emojiClose = true;
        }
    });
    $(".emoji-table span").on("click", function(){
        var smile = $(this).find("img").attr("alt");
        $(".dialog-message-input").val($(".dialog-message-input").val() + ' ' + smile + ' ');
    });
    $(".dialog-send-button").on("click", function(){
        $(".emoji-popup").fadeOut(300);
        emojiClose = true;
    });
    $(".dialog-message-input").keypress(function(e){
        if (e.keyCode == 13) {
            $(".emoji-popup").fadeOut(300);
            emojiClose = true;
        }
    });
});

function emptyDialog() {
    var companionPhotoSrc = $(".active-dialog").find("img").attr("src");
    if ($(".dialog-area").html() == '') {
        var emptyMessage = "<div class='empty-dialog'>" +
                    "<div class='empty-dialog-photo'>" +
                        "<img src='" + companionPhotoSrc + "'>" +
                    "</div>" +
                    "<div class='empty-dialog-info'>У Вас пока нет сообщений</div>" +
                "</div>";
        $(".dialog-area").append(emptyMessage);        
    }
}