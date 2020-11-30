/* [2] Conversión por valor RGB de cada color */ 

/* Variable global para el arreglo de colores */ 
var colorsArray; 

/* Inicialización de jQuery */ 
$(document).ready(function(){
    
    /* Funciones principales */
    
    /* Función para hacer el cambio de color con los valores RGB de cada color mediante input de texto */ 
    function inputChange() {
        /* Atajo a la función de solicitud HTTP */ 
        toGetFile();
        
        /* Se obtienen los valores de cada input de texto de color */
        var redRGBString = $("#redInput").val();
        var greenRGBString = $("#greenInput").val();
        var blueRGBString = $("#blueInput").val();
        
        /* Se parsean a integer cada valor de los inputs */ 
        var redNumber = parseInt(redRGBString);
        var greenNumber = parseInt(greenRGBString);
        var blueNumber = parseInt(blueRGBString);

        /* Dichos valores integers se pasan a String con el valor hexadecimal del integer */
        var redNumberToHex = redNumber.toString(16);
        var greenNumberToHex = greenNumber.toString(16);
        var blueNumberToHex = blueNumber.toString(16); 
        
        /* Si el integer de cada valor era cero, se setea el string como "00" */ 
        redNumberToHex = doubleZeroStringIfZero(redNumberToHex);
        greenNumberToHex = doubleZeroStringIfZero(greenNumberToHex);
        blueNumberToHex = doubleZeroStringIfZero(blueNumberToHex);
        
        /* Si el integer de cada valor es de un dígito (1-9), se agrega un cero a la izquierda del string */ 
        redNumberToHex = twoDigitsIfOneDigit(redNumberToHex);
        greenNumberToHex = twoDigitsIfOneDigit(greenNumberToHex);
        blueNumberToHex = twoDigitsIfOneDigit(blueNumberToHex); 
        
        var hexCode = redNumberToHex + greenNumberToHex + blueNumberToHex;
        
        /* CAMBIO DE COLOR */ 
        
        /* [2 -> 4] Se pasan los tres valores al DIV que muestra el color */ 
        showingColor(hexCode, redRGBString, greenRGBString, blueRGBString);
        
        /* CAMBIO A LA MISMA COLUMNA */ 
        
        /* [2 -> 2]Se asignan dichos valores a los inputs de rango de cada color */ 
        $("#redRange").val(redRGBString);
        $("#greenRange").val(greenRGBString);
        $("#blueRange").val(blueRGBString);
        
        $/* CAMBIO A LAS OTRAS COLUMNAS */ 
        
        /* [2 -> 1] Se pasan los tres valores al input hexadecimal al valor hexadecimal formado por los 3 colores */ 
        ("#hexInput").val(hexCode);
        
        /* [2 -> 3] Se arma el código hexadecimal. Si coincide con uno del arreglo de colores, se muestra
           en el menú dropdown */ 
        toNameColumn(hexCode, colorsArray);
        
    }
    
    /* Función para hacer el cambio de color con los valores RGB de cada color mediante input de rango */ 
    function rangeChange() {
        /* Atajo a la función de solicitud HTTP */ 
        toGetFile();
        
        /* Se obtienen los valores de cada input de texto de color */
        var redRGBString = $("#redRange").val();
        var greenRGBString = $("#greenRange").val();
        var blueRGBString = $("#blueRange").val();
        
        /* Se parsean a integer cada valor de los inputs */ 
        var redNumber = parseInt(redRGBString);
        var greenNumber = parseInt(greenRGBString);
        var blueNumber = parseInt(blueRGBString);
        
         /* Dichos valores integers se pasan a String con el valor hexadecimal del integer */
        var redNumberToHex = redNumber.toString(16);
        var greenNumberToHex = greenNumber.toString(16);
        var blueNumberToHex = blueNumber.toString(16);
        
        /* Si el integer de cada valor era cero, se setea el string como "00" */ 
        redNumberToHex = doubleZeroStringIfZero(redNumberToHex);
        greenNumberToHex = doubleZeroStringIfZero(greenNumberToHex);
        blueNumberToHex = doubleZeroStringIfZero(blueNumberToHex);
        
        /* Si el integer de cada valor es de un dígito (1-9), se agrega un cero a la izquierda del string */ 
        redNumberToHex = twoDigitsIfOneDigit(redNumberToHex);
        greenNumberToHex = twoDigitsIfOneDigit(greenNumberToHex);
        blueNumberToHex = twoDigitsIfOneDigit(blueNumberToHex);
        
        var hexCode = redNumberToHex + greenNumberToHex + blueNumberToHex;
        
        /* CAMBIO DE COLOR */ 
        
        /* [2 -> 4] Se pasan los tres valores al DIV que muestra el color */ 
        showingColor(hexCode, redRGBString, greenRGBString, blueRGBString);
        
        /* CAMBIO A LA MISMA COLUMNA */ 
        
        /* [2 -> 2] Se asignan dichos valores a los inputs de texto de cada color */ 
        $("#redInput").val(redRGBString);
        $("#greenInput").val(greenRGBString);
        $("#blueInput").val(blueRGBString);
        
        /* CAMBIO A LAS OTRAS COLUMNAS */ 
        
        /* [2 -> 1] Se pasan los tres valores al input hexadecimal al valor hexadecimal formado por los 3 colores */ 
        $("#hexInput").val(hexCode);
        
        /* [2 -> 3] Se arma el código hexadecimal. Si coincide con uno del arreglo de colores, se muestra
           en el menú dropdown */ 
        toNameColumn(hexCode, colorsArray);
    }
    
    /* Funciones auxiliares */
    
    /* Función de atajo a la función getFile() */ 
    function toGetFile() {
        getFile(); 
    }
    
    /* Función de solicitud de archivo myColors.txt */ 
    function getFile() {
        var colorsJSON; 
        var xmlhttp = new XMLHttpRequest();
        var url = "colors/myColors.txt";
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                getJSON(xmlhttp.responseText);
            }
        }
        
        xmlhttp.open("GET", url, true);
        xmlhttp.send(); 

    }
    
    /* Función para parsear el archivo en un arreglo de objetos */ 
    function getJSON(str) {
        colorsArray = JSON.parse(str);
    }

    /* Función para setear un string a "00" si es que el valor recibido del string es "0" */
    function doubleZeroStringIfZero(str) {
        if (str == "0") {
            str = "00";
        }
        return str; 
    }
    
    /* Función para agregar un cero a la izquierda del string si es que su largo es igual a 1 */ 
    function twoDigitsIfOneDigit(str) {
        if (str.length == 1) {
            str = "0" + str;
        }
        return str; 
    }
    
    /* Función para mostrar el color en el DIV correspondiente */ 
    function showingColor(hex, red, green, blue) {
        $(".color-visual").css("background-color", "#" + hex); 
        $("#hexCode").html(hex);
        $("#redRGB").html(red);
        $("#greenRGB").html(green);
        $("#blueRGB").html(blue);
    }
    
    /* Función de paso de datos a la columna de nombres de color */ 
    function toNameColumn(hex, colors) {
        var colorsLength = colors.length;
        
        for (var runColors = 0; runColors < colorsLength; runColors++) {
            if (hex == colors[runColors].hex) {
                $("#colorNameSelect").val(colors[runColors].color); 
            }
        }
    }
    
    /* Unión de funciones con eventos */ 
    
    /* Cada color tiene asociado un EventListener con input de texto e input de rango, y se activan
       cuando cambian, respectivamente */
    document.getElementById("redInput").addEventListener("input", inputChange);
    document.getElementById("redRange").addEventListener("input", rangeChange);
    document.getElementById("greenInput").addEventListener("input", inputChange);
    document.getElementById("greenRange").addEventListener("input", rangeChange);
    document.getElementById("blueInput").addEventListener("input", inputChange);
    document.getElementById("blueRange").addEventListener("input", rangeChange);
});