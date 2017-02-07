$(document).ready(function(){
	var closeMenu = true;
	var closeNewDialog = true;
	var fullName;
	$("#logOut").on('click', function(){
		$.ajax({
			url: 'api/logOut',
			method: 'get',
			success: function(response){
				if (response == 'success') window.location.href = "sign-in";
			}
		});
	});
	$('.open-dialog').on('click', function(){
		var id = $(this).attr("id");
		$.ajax({
			method: 'put',
			url: 'api/createDialog',
			data: {companion: id, fullName: fullName, anonym: false},
			success: function(response){
				if (response == "Диалог успешно создан") {
					$(".search-companion").removeClass("translateLeftIn");
    				$(".search-companion").addClass("translateLeftOut");
    				$(".cap").css("display", "none");
					$("#cap-empty").css("display", "block");
					$(".cap-response").css("display", "none");
					menuOpenClose();
					getUserDialogs();
				}
				else $(".cap-response").css("display", "block");
			}
		});
	});
	$('.anonim-dialog').on('click', function(){
		var id = $(this).attr("id");
		$.ajax({
			method: 'put',
			url: 'api/createDialog',
			data: {companion: id, fullName: fullName, anonym: true},
			success: function(response) {
				if (response == "Диалог успешно создан") {
					$(".search-companion").removeClass("translateLeftIn");
    				$(".search-companion").addClass("translateLeftOut");
    				$(".cap").css("display", "none");
					$("#cap-empty").css("display", "block");
					$(".cap-response").css("display", "none");
					menuOpenClose();
					getUserDialogs();
				}
				else $(".cap-response").css("display", "block");
			}
		});
	});
	$('.companions-results').on('click', '.result', function(){
		var id = $(this).attr("id");
		fullName = $(this).find(".result-name").html();
		$(".cap").css("display", "none");
		$(".extra-right").css("display", "block");
		$("#create-dialog").css("display", "block");
		$(".cap-user").css("background", "url(../uploads/" + id + ".jpg)");
		$(".cap-response").css("display", "none");
		$(".open-dialog").attr("id", id);
		$(".anonim-dialog").attr("id", id);
	});
	$("#searchCompanion").keyup(function(){
		if ($("#searchCompanion").val().length) {
			$.ajax({
				url: 'api/searchCompanion',
				method: 'get',
				data: {searchText: $("#searchCompanion").val()},
				success: function(response){
					if (!response.length || (response.length == 1 && response[0].login == getCookie('login'))) $(".companions-results").html("<div class='no-result'>Совпадений не найдено</div>");
					else {
						var result = "";
						response.forEach(function(item, response){
							if (item.login != getCookie('login')) {
								result += 
										"<div class='result' id='" + item._id + "'>" + 
						                    "<div class='result-photo-outher'>" + 
						                        "<div class='result-photo'>" + 
						                            "<img src='uploads/" + item._id + ".jpg" + "'>" + 
						                        "</div>" + 
						                    "</div>" + 
						                    "<div class='result-body'>" + 
						                        "<div class='result-name'>" + item.fullName + "</div>" + 
						                        "<div class='result-login'>@" + item.login + "</div>" +
						                    "</div>" + 
						                "</div>";						
							}
						});
		                $(".companions-results").html(result);
		            }
				}
			});
			$(".search-tip").css("display", "none");
		}
	});
	$("#capCompanionSearch").keyup(function(){
		if ($("#capCompanionSearch").val().length) {
			$.ajax({
				url: 'api/searchCompanion',
				method: 'get',
				data: {searchText: $("#capCompanionSearch").val()},
				success: function(response){
					if (!response.length || (response.length == 1 && response[0].login == getCookie('login'))) $(".cap-search-results").html("Совпадений не найдено");
					else {
						var result = "";
						response.forEach(function(item, response){
							if (item.login != getCookie('login')) {
								result += 
										"<div class='cap-search-result' id='" + item._id + "'>" + 
						                    "<div class='result-photo-outher'>" + 
						                        "<div class='result-photo'>" + 
						                            "<img src='uploads/" + item._id + ".jpg" + "'>" + 
						                        "</div>" + 
						                    "</div>" + 
						                    "<div class='result-body'>" + 
						                        "<div class='result-name'>" + item.fullName + "</div>" + 
						                        "<div class='result-login'>@" + item.login + "</div>" +
						                        "<div class='plane'></div>" +
						                    "</div>" + 
						                "</div>";						
							}
						});
		                $(".cap-search-results").html(result);
		            }
				}
			});
		}
		if ($(".cap-search-results").height() > 130) $(".cap-search-results-gradient").css("display", "block");
		if ($(".cap-search-results").height() <= 130) $(".cap-search-results-gradient").css("display", "none");
	});
	$('.cap-search-results').on('click', '.cap-search-result', function(){
		var id = $(this).attr("id");
		fullName = $(this).find(".result-name").html();
		$(".cap").css("display", "none");
		$(".extra-right").css("display", "block");
		$("#create-dialog").css("display", "block");
		$(".cap-user").css("background", "url(../uploads/" + id + ".jpg)");
		$(".cap-response").css("display", "none");
		$(".open-dialog").attr("id", id);
		$(".anonim-dialog").attr("id", id);
	});


	$(".menu-list").css("display", "none");
    $(".menu-bars").on("click", function(){
    	menuOpenClose();
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