$(document).ready(function(){
	$(".sign-up-button").click(function(){
		var fullName = $("#fullName").val();
		var login = $("#login").val();
		var password = $("#password").val();
		var email = $("#email").val();
		alert(checkFullName(fullName) + " " + checkLogin(login) + " " + checkPassword(password) + " " + checkEmail(email)); 
		/*$.ajax({
			type: "post",
			url: "api/registrUser",
			data: {"fullName": fullName, "login": login, "password": password, "email": email},
			success: function(response){
				alert(response);
			}
		});*/
	});
});