$(document).ready(function(){
    var photoClose = true;
    var videoClose = true;
    var geopositionClose = true;
    var settingsClose = true;
    $("#photo").click(function(){
        if (photoClose) {
            $(".add-video-popup").fadeOut(300);
            $(".add-geoposition-popup").fadeOut(300);
            $(".settings-popup").fadeOut(300);
            $(".add-photo-popup").fadeIn(300);
            photoClose = false;
            videoClose = true;
            geopositionClose = true;
            settingsClose = true;
        }
        else {
            $(".add-photo-popup").fadeOut(300);
            photoClose = true;
        }
    });
    $("#video").click(function(){
        if (videoClose) {
            $(".add-photo-popup").fadeOut(300);
            $(".add-geoposition-popup").fadeOut(300);
            $(".settings-popup").fadeOut(300);
            $(".add-video-popup").fadeIn(300);
            videoClose = false;
            photoClose = true;
            geopositionClose = true;
            settingsClose = true;
        }
        else {
            $(".add-video-popup").fadeOut(300);
            videoClose = true;
        }
    });
    $("#geoposition").click(function(){
        if (geopositionClose) {
            $(".add-photo-popup").fadeOut(300);
            $(".add-video-popup").fadeOut(300);
            $(".settings-popup").fadeOut(300);
            $(".add-geoposition-popup").fadeIn(300);
            geopositionClose = false;
            photoClose = true;
            videoClose = true;
            settingsClose = true;
        }
        else {
            $(".add-geoposition-popup").fadeOut(300);
            geopositionClose = true;
        }
    });
    $("#settings").click(function(){
        if (settingsClose) {
            $(".add-photo-popup").fadeOut(300);
            $(".add-video-popup").fadeOut(300);
            $(".add-geoposition-popup").fadeOut(300);
            $(".settings-popup").fadeIn(300);
            settingsClose = false;
            geopositionClose = true;
            photoClose = true;
            videoClose = true;
        }
        else {
            $(".settings-popup").fadeOut(300);
            settingsClose = true;
        }
    });
});