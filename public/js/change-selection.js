$(document).ready(function(){
    $(".conversation-dialog").css("display", "none");
    $(".group-users-selection").on("click", function(){
        $(".single-user-selection").removeClass("active-selection");
        $(".group-users-selection").addClass("active-selection");
        $(".single-dialog").fadeOut(300, function(){
          $(".conversation-dialog").fadeIn(300);
        })
    }); 
    $(".single-user-selection").on("click", function(){
        $(".group-users-selection").removeClass("active-selection");
        $(".single-user-selection").addClass("active-selection");
        $(".conversation-dialog").fadeOut(300, function(){
          $(".single-dialog").fadeIn(300);
        })
    }); 
});