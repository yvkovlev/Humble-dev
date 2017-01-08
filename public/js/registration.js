$(document).ready(function(){
	$(".sign-up-button").click(function(){
		var fullName = $("#fullName").val();
		var login = $("#login").val();
		var password = $("#password").val();
		var email = $("#email").val();
		alert(checkFullName(fullName) + " " + checkLogin(login) + " " + checkPassword(password) + " " + checkEmail(email)); 
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
						//window.location.href = "/"
					}, 1000);
				}
				if (response == 'Fail') {
					$(".sign-up-button a").html('Произошла ошибка, нажмите что бы повторить.')
				}
			}
		});
	});
});