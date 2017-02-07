$(document).ready(function(){
	$(".sign-up-button").click(function(){
		var fullName = $("#fullName").val();
		var login = $("#login").val();
		var password = $("#password").val();
		var email = $("#email").val();
		if (checkFullName(fullName) && checkLogin(login) && checkPassword(password) && checkEmail(email)) {
			if ($('#checkbox').prop('checked') == true) {
				$.ajax({
					url: 'api/checkLogin',
					type: 'get',
					data: {login: login},
					success: function(response){	
						if (response == 'success') {
							$.ajax({
								type: "post",
								url: "api/registrUser",
								data: {"fullName": fullName, "login": login, "password": password, "email": email},
								success: function(response){
									if (response == 'Success') {
										$("#fullName").val('');
										$("#login").val('');
										$("#password").val('');
										$("#email").val('');
										$(".sign-up-button").fadeOut(300, function(){
											$(".success-feedback").fadeIn(300);
										});
										setTimeout(function(){
											window.location.href = "/sign-in"
										}, 2000);
									}
									if (response == 'Fail') {
										$(".sign-up-button a").html('Произошла ошибка, нажмите чтобы повторить.')
									}
								}
							});
						}
						else $(".error-msg").html("Такой логин уже занят, попробуйте другой.");
					}
				});
			}
			else {
				$(".warning").fadeIn(200);
			}
		}
	});
	$("#fullName").change(function(){
		var fullName = $("#fullName").val();
		if (checkFullName(fullName)){
			$(".full-name .error").fadeOut(200);
			$(".full-name .success").fadeIn(200);
		}
		else {
			$(".full-name .success").fadeOut(200);
			$(".full-name .error").fadeIn(200);
		}
	});
	$("#login").change(function(){
		var login = $("#login").val();
		$.ajax({
			url: 'api/checkLogin',
			type: 'get',
			data: {login: login},
			success: function(response){
				if (checkLogin(login) && response == 'success'){
					$(".login .error").fadeOut(200);
					$(".login .success").fadeIn(200);
					$(".error-msg").html("");
				}
				else {
					if (response == 'fail') {
						$(".error-msg").html("Такой логин уже занят, попробуйте другой.");
					}
					$(".login .success").fadeOut(200);
					$(".login .error").fadeIn(200);
				}
			}
		});
	});
	$("#password").change(function(){
		var password = $("#password").val();
		if (checkPassword(password)){
			$(".password .error").fadeOut(200);
			$(".password .success").fadeIn(200);
		}
		else {
			$(".password .success").fadeOut(200);
			$(".password .error").fadeIn(200);
		}
	});
	$("#email").change(function(){
		var email = $("#email").val();
		if (checkEmail(email)){
			$(".email .error").fadeOut(200);
			$(".email .success").fadeIn(200);
		}
		else {
			$(".email .success").fadeOut(200);
			$(".email .error").fadeIn(200);
		}
	});
	$('#checkbox').on("click", function(){
		if ($(this).prop('checked') == true) {
			$(".warning").fadeOut(200);
		}
	});
});