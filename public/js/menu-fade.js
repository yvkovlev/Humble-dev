$(document).ready(function(){
	var closeNewDialog = true;

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
});