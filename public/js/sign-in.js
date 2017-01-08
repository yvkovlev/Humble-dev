$(document).ready(function(){
	$(".sign-in-input-button").click(function(){
		var login = $("#login").val();
		var password = $("#password").val();
		$.ajax({
			type: "get",
			url: "api/getUser",
			data: {"login": login, "password": password},
			success: function(response) {
				if (response == "Success") window.location.href = "/";
			}
		});
	});
});