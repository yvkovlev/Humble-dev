$(document).ready(function(){
	$.ajax({
		type: 'get',
		url: 'api/getUserDialogs',
		success: function (response)
		{
			alert(response);
		}
	});
});