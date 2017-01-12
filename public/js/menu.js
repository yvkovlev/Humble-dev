$(document).ready(function(){
	var closeMenu = true;

	$(".menu-list").css("display", "none");
    $(".menu-bars").on("click", function(){
    	if (closeMenu) {
	        $(".dialogs-list").stop().fadeOut(300, function(){
	            $(".menu-list").stop().fadeIn(300);
	        });
	        $(".menu-bars i").stop().fadeOut(300, function(){
	        	$(".menu-bars").html("<i class='fa fa-reply'></i>");
	        	$(".menu-bars i").css("display", "none");
	        	$(".menu-bars i").stop().fadeIn(300);
	        });
	        closeMenu = false;
	    }
	    else {
	    	$(".menu-list").stop().fadeOut(300, function(){
	            $(".dialogs-list").stop().fadeIn(300);
	        });
	        $(".menu-bars i").stop().fadeOut(300, function(){
	        	$(".menu-bars").html("<i class='fa fa-bars'></i>");
	        	$(".menu-bars i").css("display", "none");
	        	$(".menu-bars i").stop().fadeIn(300);
	        });
	        closeMenu = true;
	    }
    });
});