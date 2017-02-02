$(document).ready(function(){
	var deleteConfirmClose = true;
	var photoClose = true;
    var videoClose = true;
    var geopositionClose = true;
    var settingsClose = true;
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
        }
        event.stopPropagation();
    });

	$('#clearDialog').on('click', function(){
		var curDialog = $('.single-dialog.active-dialog').attr('id');
		$.ajax({
			url: 'api/clearDialog',
			type: 'delete',
			data: {dialogId: curDialog},
			success: function(response) {
				$(".dialog-area").empty();
				$('.single-dialog.active-dialog > .single-dialog-body > .single-dialog-last-message > .last-message').html('В беседе нет сообщений');
			}
		});
	});
	$('#deleteDialog').on('click', function(){
		if (deleteConfirmClose) {
			$('#deleteDialog > .action-info').html("Вы уверены?");
			$(".actions-confirm").css("display", "block");
			deleteConfirmClose = false;
		}
	});
	$("#deleteDialogRefuse").on("click", function(){
		$('#deleteDialog > .action-info').html("Удалить чат");
		$(".actions-confirm").css("display", "none");
		setTimeout(function(){
			deleteConfirmClose = true;
		}, 1);
	});
	$('#deleteDialogConfirm').on('click', function(){
		var curDialog = $('.single-dialog.active-dialog').attr('id');
		$('#deleteDialog > .action-info').html("Удалить чат");
		$(".actions-confirm").css("display", "none");
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
						console.log(response);
						$(".extra-right").css("display", "block");
						$(".settings-popup").fadeOut(300);
						settingsClose = true;
					}
				});
			}
		});
	});
});