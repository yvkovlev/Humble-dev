$(document).ready(function(){
	var closeNewDialog = true;
    var nameInputDisabled = true;
    var passwordInputDisabled = true;

    $("#newDialog").css("display", "none");
    $("#newDialogAction").on("click", function(){
    	if (closeNewDialog) {
            $("#newDialog").css("display", "block");
            $("#newDialog").removeClass("fadeOut");
    		$("#newDialog").addClass("fadeIn");
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
    })

    $("#profile-settings").on("click", function(){
        $(".extra-left").css("display", "block");
        $(".extra-left").removeClass("translateLeftOut");
        $(".extra-left").addClass("translateLeftIn");
    });
    $(".extra-close-fg").on("click", function(){
        $(".extra-left").removeClass("translateLeftIn");
        $(".extra-left").addClass("translateLeftOut");
    });
    $("#edit-name").on("click", function(){
        if (nameInputDisabled) {
            $("#name-input").prop("disabled", false);
            $(this).css({"color": "#c4c6ca"});
            $("#name-input").addClass("active-input");
            $("#name-input").focus();
            nameInputDisabled = false;
        }
        else {
            $("#name-input").prop("disabled", true);
            $(this).css({"color": "#797f86"});
            $("#name-input").removeClass("active-input");
            nameInputDisabled = true;
        }
    });
    $("#edit-password").on("click", function(){
        if (passwordInputDisabled) {
            $("#password-input").prop("disabled", false);
            $(this).css({"color": "#c4c6ca"});
            $("#password-input").addClass("active-input");
            $("#password-input").focus();
            passwordInputDisabled = false;
        }
        else {
            $("#password-input").prop("disabled", true);
            $(this).css({"color": "#797f86"});
            $("#password-input").removeClass("active-input");
            passwordInputDisabled = true;
        }
    });

    $(".photo-settings-border").hover(function(){
        $(".load-fg").stop().fadeIn(100);
    }, function(){
        $(".load-fg").stop().fadeOut(100);
    })
});