$(document).ready(function(){
    var nameInputDisabled = true;
    var passwordInputDisabled = true;

    $("#profile-settings, .user-info-photo").on("click", function(){
        openUserSettings();
    });
    $(".extra-close-fg").on("click", function(){
        $(".extra-left").removeClass("translateLeftIn");
        $(".extra-left").addClass("translateLeftOut");
        $(".photo-settings-border").removeClass("zoomIn");
        $(".photo-settings-border").addClass("zoomOut");
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

    function openUserSettings() {
        $(".extra-left").css("display", "block");
        $(".extra-left").removeClass("translateLeftOut");
        $(".extra-left").addClass("translateLeftIn");
        $(".photo-settings-border").removeClass("zoomOut");
        $(".photo-settings-border").addClass("zoomIn");
    }
});