/* [3] Conversión por nombre de cada color, con input de texto y menú dropdown */ 

/* Variable global para el arreglo de colores */ 
var colorsArray; 

/* Inicialización de jQuery */ 
$(document).ready(function(){
      
    /* Funciones principales */
    
    /* Función para cambiar el color en base al input de texto */ 
    function changeNameInput() {
        toGetFile(); 
        
        /* Se obtiene el valor del input y se pasa a minúsculas */ 
        var colorInput = $("#colorNameInput").val();
        colorInput = colorInput.toLowerCase();
        
        // var colorsLength = colorsArray.length;
        
        /* Se recorre el arreglo de colores, previa asignación de un timeout  */
        setTimeout(function(){
            for (var runColors = 0; runColors < colorsArray.length; runColors++) {
                if (colorInput == colorsArray[runColors].color) {
                    var colorInputToHex = colorsArray[runColors].hex;

                    var colorInputToRedNumber = hexStringToNumber(colorInputToHex.slice(0,2));
                    var colorInputToGreenNumber = hexStringToNumber(colorInputToHex.slice(2,4));
                    var colorInputToBlueNumber = hexStringToNumber(colorInputToHex.slice(4,6));
                
                    /* CAMBIO DE COLOR */ 
                    showingColor(colorInputToHex, colorInputToRedNumber, colorInputToGreenNumber, colorInputToBlueNumber); 
                
                    /* CAMBIO A LAS OTRAS COLUMNAS */ 
                
                    /* [3 -> 2] Se pasan los valores de los colores a los inputs de número y rango */
                    toColorsColumn(colorInputToRedNumber, colorInputToGreenNumber, colorInputToBlueNumber);
                
                    /* [3 -> 1] Se pasa el valor hexadecimal al input correspondiente */ 
                    $("#hexInput").val(colorInputToHex); 
                }
            }
        }, 100);
        
    }
    
    /* Función para cambiar el color en base al menú dropdown */ 
    function changeNameSelect() {
        toGetFile(); 
        
        /* Se obtiene el valor del menú dropdown y se pasa a minúsculas */ 
        var colorSelect = $("#colorNameSelect").val();
        colorSelect = colorSelect.toLowerCase();

        // colorsLength = colorsArray.length;
        
        /* Se recorre el arreglo de colores, previa asignación de un timeout */ 
        setTimeout(function(){
            for (var runColors = 0; runColors < colorsArray.length; runColors++) {
                if (colorSelect == colorsArray[runColors].color) {
                    var colorSelectByData = colorsArray[runColors].color;
                    var colorSelectToHex = colorsArray[runColors].hex;
                
                    /* Se obtienen los números de los colores a partir de sus valores hexadecimales */ 
                    var colorSelectToRedNumber = hexStringToNumber(colorSelectToHex.slice(0,2));
                    var colorSelectToGreenNumber = hexStringToNumber(colorSelectToHex.slice(2,4));
                    var colorSelectToBlueNumber = hexStringToNumber(colorSelectToHex.slice(4,6));
                
                    /* CAMBIO DE COLOR */ 
                
                    /* Se pasan los valores al DIV que muestra el color */ 
                    showingColor(colorSelectToHex, colorSelectToRedNumber, colorSelectToGreenNumber, colorSelectToBlueNumber); 
                
                    /* CAMBIO A LA MISMA COLUMNA */ 
                
                    /* CAMBIO A LAS OTRAS COLUMNAS */ 
                
                    /* [3 -> 2] Se pasan los valores numéricos a la columna de colores */
                    toColorsColumn(colorSelectToRedNumber, colorSelectToGreenNumber, colorSelectToBlueNumber);
                
                    /* [3 -> 1] Se pasa el valor hexadecimal entero a su columna respectiva */ 
                    $("#hexInput").val(colorSelectToHex); 
                }
            }
        }, 100);
        
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
    
    /* Función que hace el cambio manual de valor hexadecimal a número */
    function hexStringToNumber(str) {
        
            /* La conversión manual funciona del siguiente modo: 
               El valor hexadecimal va a estar en las siguientes formas:
               (Numero/Cero/Letra) (Numero/Cero/Letra): 00, 01, 20, c0.
               
               El dígito hexadecimal tiene la siguiente correspondencia:
               0-9: Valor correspondiente a su número
               a: 10
               b: 11
               c: 12
               d: 13
               e: 14
               f: 15
               
               Para la conversión:
               - Para cada dígito salvo el último, se obtiene el valor y se multiplica por 16
               - Para el último dígito, se obtiene el valor
               
               Para definir el número del string, se va a trabajar con un arreglo de caracteres, 
               y dependiendo de la posición y valor de cada caracterse va a definir 
               cuanto se va a sumar. También hay que procesar el cero */ 
        
            /* Se define el arreglo de objetos con la correspondencia letra-número */ 
            var lettersNumbersAssociates = 
                [{ letter:"a", num:10}, 
                 { letter:"b", num:11}, 
                 { letter:"c", num:12}, 
                 { letter:"d", num:13}, 
                 { letter:"e", num:14}, 
                 { letter:"f", num:15}
                ];
        
            /* Se define el arreglo de caracteres */
            var stringHexArray = str.split("");
        
            /* Variables auxiliares */
            var runHexArray, runLettersNumbers, multiply;
        
            /* Se inicializa la suma */ 
            var sum = 0;
        
            /* Se procede a recorrer el arreglo de valores del string */ 
            for ( runHexArray = 0; runHexArray < stringHexArray.length; runHexArray++) {
                /* ¿Es el último dígito? */ 
                if (runHexArray == stringHexArray.length-1) {
                    multiply = 1;
                } else {
                    multiply = 16;
                }

                if (parseInt(stringHexArray[runHexArray])) {
                    /* El dígito actual es un numero */
                    sum += parseInt(stringHexArray[runHexArray]) * multiply;
                } else if (stringHexArray[runHexArray] == 0) {
                    /* El dígito actual es cero */ 
                } else {
                    /* El dígito actual es una letra */
                    for (runLettersNumbers = 0; runLettersNumbers < lettersNumbersAssociates.length; runLettersNumbers++) {
                        /* Se recorre el arreglo de objetos y con la correspondencia se obtiene el valor de la letra */ 
                        if (lettersNumbersAssociates[runLettersNumbers].letter == stringHexArray[runHexArray]) {
                            sum += lettersNumbersAssociates[runLettersNumbers].num * multiply;
                        }
                    }
                }
            } /* Fin del recorrido del arreglo */ 
            
           /* Se regresa la suma */ 
           return sum; 
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
    function toColorsColumn(red, green, blue) {
        $("#redInput").val(red);
        $("#redRange").val(red);
        $("#greenInput").val(green);
        $("#greenRange").val(green);
        $("#blueInput").val(blue);
        $("#blueRange").val(blue);
    }
    
    /* Se unen las funciones con sus respectivos inputs
       Input y select tiene asociado un EventListener, y se activan
       cuando cambian, respectivamente */
    document.getElementById("colorNameInput").addEventListener("input", changeNameInput);
    document.getElementById("colorNameSelect").addEventListener("change", changeNameSelect); 
});