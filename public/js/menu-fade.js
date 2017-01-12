$(document).ready(function(){
	var closeNewDialog = true;

    $("#newDialog").css("display", "none");
    $("#newDialogAction").on("click", function(){
    	if (closeNewDialog) {
    		$("#newDialog").css("display", "block");
    		closeNewDialog = false;
    	}
    	else {
            $("#newDialog").css("display", "none");
    		closeNewDialog = true;
    	}
    })
});