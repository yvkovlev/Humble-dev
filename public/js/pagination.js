$(document).ready(function(){
    var close1 = true;
    var close2 = true;
    var close3 = true;
    $("#pagination-1").on("click", function(){
        if (close1) {
            pagination(1);
            close1 = false;
            close2 = true;
            close3 = true;
            $("#pagination-1").addClass("active-pagination");
        }
    });
    $("#pagination-2").on("click", function(){
        if (close2) {
            pagination(2);            
            close2 = false;
            close1 = true;
            close3 = true;
            $("#pagination-2").addClass("active-pagination");
        }
    });
    $("#pagination-3").on("click", function(){
        if (close3) {
            pagination(3);
            close3 = false;
            close1 = true;
            close2 = true;
            $("#pagination-3").addClass("active-pagination");
        }
    });

    function pagination (number) {
        $(".app-presentation img").fadeOut(600, function(){
            $(".app-presentation").html("<img id='phone-image-"+number+"' src='images/phone-image-"+number+".png'>");
            $(".app-presentation img").css("display", "none");
            $(".app-presentation img").fadeIn(600);
        });
        $(".app-description h2").fadeOut(600, function(){
            if (number == 1){
                $(".app-description").html("<h2 id='app-description-"+number+"'>Тысячи пользователей по всему миру готовы начать с тобой общаться!</h2>");
            }
            if (number == 2){
                $(".app-description").html("<h2 id='app-description-"+number+"'>Находите друзей и знакомых, объединяйтесь в группы и общайтесь на любые темы!</h2>");
            }
            if (number == 3){
                $(".app-description").html("<h2 id='app-description-"+number+"'>Совсем не обязательно выдавать себя, Вы можете общаться абсолютно анонимно!</h2>");
            }
            $(".app-description h2").css("display", "none");
            $(".app-description h2").fadeIn(600);
        });
        $("#pagination-1").removeClass("active-pagination");
        $("#pagination-2").removeClass("active-pagination");
        $("#pagination-3").removeClass("active-pagination");
    };
});

