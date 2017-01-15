$(document).ready(function(){
	var closeMenu = true;

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