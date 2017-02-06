$(document).ready(function(){
    $(".conversation-dialog").css("display", "none");
    $(".group-users-selection").on("click", function(){
        // $(".single-user-selection").removeClass("active-selection");
        // $(".group-users-selection").addClass("active-selection");
        // $(".single-dialog").fadeOut(1, function(){
        //     $(".conversation-dialog").css("display", "flex");
        //     $(".conversation-dialog").addClass("fadeIn");
        // })
    }); 
    $(".single-user-selection").on("click", function(){
        // $(".group-users-selection").removeClass("active-selection");
        // $(".single-user-selection").addClass("active-selection");
        // $(".conversation-dialog").fadeOut(1, function(){
        //     $(".single-dialog").css("display", "flex");
        //     $(".single-dialog").addClass("fadeIn");
        // })
    }); 
});