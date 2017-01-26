$(document).ready(function(){
	$(".sign-in-input-button").click(function(){
		var login = $("#login").val();
		var password = $("#password").val();
		$.ajax({
			type: "post",
			url: "api/login",
			data: {login: login, password: password},
			success: function(response) {
				//alert(response);//if (response == "Success") window.location.href = "/";
				console.log(response);
			}
		});
	});
});