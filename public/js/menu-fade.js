$(document).ready(function(){
    $("#profile-settings, .user-info-photo").on("click", function(){
        openUserSettings();
    });
    $("#newDialogAction").on("click", function(){
        openSearchCompanion();
    })
    $(".extra-close-fg").on("click", function(e){
        $(e.target).closest(".extra-left").removeClass("translateLeftIn");
        $(e.target).closest(".extra-left").addClass("translateLeftOut");
        $(".photo-settings-border").removeClass("zoomIn");
        $(".photo-settings-border").addClass("zoomOut");
    });
    $(".photo-settings-border").hover(function(){
        $(".load-fg").stop().fadeIn(100);
    }, function(){
        $(".load-fg").stop().fadeOut(100);
    })

    function openUserSettings() {
        $(".user-settings").css("display", "block");
        $(".user-settings").removeClass("translateLeftOut");
        $(".user-settings").addClass("translateLeftIn");
        $(".photo-settings-border").removeClass("zoomOut");
        $(".photo-settings-border").addClass("zoomIn");
    }
    function openSearchCompanion() {
        $(".search-companion").css("display", "block");
        $(".search-companion").removeClass("translateLeftOut");
        $(".search-companion").addClass("translateLeftIn");
    }
});