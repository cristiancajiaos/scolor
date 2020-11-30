/* Navegación */ 
$(document).ready(function(){
    /* El DIV de subida aparece cuando el scroll hacia arriba es de 50px */ 
    
    $(window).scroll(function(){
        if ($(document).scrollTop() > 50) {
            $(".upicon").css("display", "block");      
        } else {
            $(".upicon").css("display", "none");
        }
    });
    
    /* Subida hacia arriba al presionar el link del DIV de subida */ 
    $(".link-upicon").on("click", function(){
            $("html, body").animate({scrollTop: $(".web-header").offset().top}, 200);
    }); 
    
    /* Opacidad del DIV de subida sube a 1 al pasarle el mouse al link */
    $(".link-upicon").on("mouseover", function(){
        $(".upicon").css("opacity", "1");
    });
    
    /* Opacidad del DIV de subida baja a 0.5 al sacar el mouse del link */ 
    $(".link-upicon").on("mouseout", function(){
        $(".upicon").css("opacity", "0.5"); 
    });
});