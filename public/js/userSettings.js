$(document).ready(function(){
	getUser();
	$('#saveImg').on('click', function(){
		var file = $('#photo-input').prop('files')[0];
		if (file)
		{
			var formData = new FormData();
			formData.append('file', file);
			console.log(formData);
			$.ajax({
				url: 'api/uploadImg',
				method: 'post',
				data: formData,
			    processData: false,
			    contentType: false,
			    success: function(data){
			        window.location.href = "/";
			    }
			});
		}
	});
	$("#refuseImg").on('click', function(){
		getUser();
		$(".save-changes").css("display", "none");
		$(".photo-settings-border label").html("<div class='load-fg'>" +
                                            		"<div class='load-title'>Изменить фотографию профиля</div>" +
                                            		"<div class='load-icon'>" +
                                                		"<i class='fa fa-camera' aria-hidden='true'></i>" +
                                            		"</div>" +
                                        		"</div>");
	})
	$('.extra-block-button').on('click', function(){
		var newFullName = $('#name-input').val();
		var newPassword = $('#password-input').val();
		if (newPassword != "") {
			$("#name-input").prop("disabled", true);
            $("#edit-name").css({"color": "#797f86"});
            $("#name-input").removeClass("active-input");
            //nameInputDisabled = true;
		}
		if (newFullName != "") {
			$("#password-input").prop("disabled", true);
            $("#edit-password").css({"color": "#797f86"});
            $("#password-input").removeClass("active-input");
            //passwordInputDisabled = true;
		}
		$.ajax({
			url: 'api/saveUserSettings',
			data: {newFullName: newFullName, newPassword: newPassword},
			type: 'put',
			success: function(response){
				console.log(response);
			}
		});
	});

	function getUser() {
		$.ajax({
			url: 'api/getUser',
			method: 'get',
			data: {login: getCookie('login')},
			success: function(response){
				$('#name-input').attr('placeholder', response.fullName);
				$('#userImg').attr('src', 'uploads/' + response._id + '.jpg');
				$(".user-info-photo-border img").attr('src', 'uploads/' + response._id + '.jpg');
				$(".user-info-name").html(response.fullName + " <span class='online-status'><i class='fa fa-circle'></i></span>");
				$(".user-info-login").html("@" + response.login);
			}
		});
	};
});