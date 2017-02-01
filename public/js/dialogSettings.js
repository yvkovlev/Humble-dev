$(document).ready(function(){
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
		var curDialog = $('.single-dialog.active-dialog').attr('id');
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
					}
				});
			}
		});
	});
});