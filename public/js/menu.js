$(document).ready(function(){
	var closeMenu = true;
	var closeNewDialog = true;
	$("#logOut").on('click', function(){
		$.ajax({
			url: 'api/logOut',
			method: 'get',
			success: function(response){
				if (response == 'success') window.location.href = "sign-in";
			}
		});
	});
	$('.companions-results').on('click', '.open-dialog', function(){
		var fullName = $(this).parent().parent().children('.result-name').children('span').html();
		$.ajax({
			method: 'put',
			url: 'api/createDialog',
			data: {companion: $(this).attr('id'), fullName: fullName, anonym: false},
			success: function(response){
				$(".response-feedback").html(response);
				if (response == "Диалог успешно создан") {
					setTimeout(function(){
						//window.location.href = "/";
						menuOpenClose();
						getUserDialogs();
					}, 1000);
				}
			}
		});
	});
	$('.companions-results').on('click', '.anonim-dialog', function(){
		var fullName = $(this).parent().parent().children('.result-name').children('span').html();
		$.ajax({
			method: 'put',
			url: 'api/createDialog',
			data: {companion: $(this).attr('id'), fullName: fullName, anonym: true},
			success: function(response){
				$(".response-feedback").html(response);
				if (response == "Диалог успешно создан") {
					setTimeout(function(){
						//window.location.href = "/";
						menuOpenClose();
						getUserDialogs();
					}, 1000);
				}
			}
		});
	});
	$("#searchCompanion").keyup(function(){
		if ($("#searchCompanion").val().length) {
			$.ajax({
				url: 'api/searchCompanion',
				method: 'get',
				data: {searchText: $("#searchCompanion").val()},
				success: function(response){
					if (!response.length || (response.length == 1 && response[0].login == getCookie('login'))) $(".companions-results").html("Совпадений не найдено");
					else {
						var result = "";
						response.forEach(function(item, response){
							if (item.login != getCookie('login')) {
								result += 
										"<div class='result'>" + 
						                    "<div class='result-photo-outher'>" + 
						                        "<div class='result-photo'>" + 
						                            "<img src='uploads/" + item._id + ".jpg" + "'>" + 
						                        "</div>" + 
						                    "</div>" + 
						                    "<div class='result-name'>" + 
						                        "<span>" + item.fullName + "</span>" + 
						                    "</div>" + 
						                    "<div class='result-actions'>" + 
						                        "<div class='anonim-dialog' id='" + item._id + "'>" +
						                        	"<div class='result-actions-fg'></div>" +
						                        	"<object type='image/svg+xml' data='svg/detective.svg' height='20' style='cursor: pointer;''></object>" + 
						                        "</div>" + 
						                        "<div class='open-dialog' id='" + item._id + "'>" +
						                        	"<div class='result-actions-fg'></div>" +
						                        	"<object type='image/svg+xml' data='svg/pencil-2.svg' height='20'></object>" +
						                        "</div>" + 
						                    "</div>" + 
						                "</div>" +
						                "<div class='response-feedback'></div>";
							}
						});
		                $(".companions-results").html(result);
		            }
				}
			});
		}
	});
	$(".menu-list").css("display", "none");
    $(".menu-bars").on("click", function(){
    	menuOpenClose();
    });

    $("#newDialog").css("display", "none");
    $("#newDialogAction").on("click", function(){
    	if (closeNewDialog) {
            $("#newDialog").css("display", "block");
            $("#newDialog").removeClass("fadeOut");
    		$("#newDialog").addClass("fadeIn");
    		$("#searchCompanion").focus();
    		closeNewDialog = false;
    	}
    	else {
            $("#newDialog").removeClass("fadeIn");
            $("#newDialog").addClass("fadeOut");
            setTimeout(function(){
                $("#newDialog").css("display", "none");
            }, 600);
    		closeNewDialog = true;
    	}
    });

    function menuOpenClose() {
    	if (closeMenu) {
	        $(".menu-list").css("display", "block");
	        $(".menu-list").removeClass("fadeOutLeft");
	        $(".dialogs-list").removeClass("fadeInRight");
	        $(".dialogs-list").addClass("fadeOutRight");
	        $(".menu-list").addClass("fadeInLeft");
	        closeMenu = false;
	    }
	    else {
	    	$(".dialogs-list").removeClass("fadeOutRight");
	        $(".menu-list").removeClass("fadeInLeft");
	        $(".menu-list").addClass("fadeOutLeft");
	        $(".dialogs-list").addClass("fadeInRight");
	        $("#newDialog").removeClass("fadeIn");
            $("#newDialog").addClass("fadeOut");
            $("#newDialog").css("display", "none");
            $("#searchCompanion").val("");
            $(".companions-results").html("");
    		closeNewDialog = true;
	        closeMenu = true;
	    }
    }
});