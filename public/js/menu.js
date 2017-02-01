$(document).ready(function(){
	var closeMenu = true;
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
			data: {companion: $(this).attr('id'), fullName: fullName},
			success: function(response){
				alert(response);
			}
		});
	});
	$("#searchCompanion").keyup(function(){
		$.ajax({
			url: 'api/searchCompanion',
			method: 'get',
			data: {searchText: $("#searchCompanion").val()},
			success: function(response){
				if (response == "Fail") $(".companions-results").html("Совпадений не найдено");
				else {
					var result = 
					"<div class='result'>" + 
	                    "<div class='result-photo-outher'>" + 
	                        "<div class='result-photo'>" + 
	                            "<img src='uploads/" + response._id + ".jpg" + "'>" + 
	                        "</div>" + 
	                    "</div>" + 
	                    "<div class='result-name'>" + 
	                        "<span>" + response.fullName + "</span>" + 
	                    "</div>" + 
	                    "<div class='result-actions'>" + 
	                        "<div class='anonim-dialog' id='" + response._id + "'>" +
	                        	/*"<object type='image/svg+xml' data='svg/detective.svg' height='20' style='cursor: pointer;''></object>" + */
	                        "</div>" + 
	                        "asd<div class='open-dialog' id='" + response._id + "'>" +
	                        	// "<object type='image/svg+xml' data='svg/pencil-2.svg' height='20'></object>" +
	                        "asd</div>" + 
	                    "</div>" + 
	                "</div>";
	                $(".companions-results").html(result);
	            }
			}
		});
	});
	$(".menu-list").css("display", "none");
    $(".menu-bars").on("click", function(){
    	if (closeMenu) {
	        $(".menu-list").css("display", "block");
	        $(".menu-list").removeClass("fadeOutLeft");
	        $(".dialogs-list").removeClass("fadeInRight");
	        $(".dialogs-list").addClass("fadeOutRight");
	        $(".menu-list").addClass("fadeInLeft");
	        $(".menu-bars i").stop().fadeOut(300, function(){
	        	$(".menu-bars").html("<i class='fa fa-reply'></i>");
	        	$(".menu-bars i").css("display", "none");
	        	$(".menu-bars i").stop().fadeIn(300);
	        });
	        closeMenu = false;
	    }
	    else {
	    	$(".dialogs-list").removeClass("fadeOutRight");
	        $(".menu-list").removeClass("fadeInLeft");
	        $(".menu-list").addClass("fadeOutLeft");
	        $(".dialogs-list").addClass("fadeInRight");
	        $(".menu-bars i").stop().fadeOut(300, function(){
	        	$(".menu-bars").html("<i class='fa fa-bars'></i>");
	        	$(".menu-bars i").css("display", "none");
	        	$(".menu-bars i").stop().fadeIn(300);
	        });
	        closeMenu = true;
	    }
    });
});