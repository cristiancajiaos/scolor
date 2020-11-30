/* [1] Conversión por valor hexadecimal */ 

/* Variable global para el arreglo de colores */ 
var colorsArray;

/* Inicialización de jQuery */ 
$(document).ready(function(){
    
    /* Función principal */
    
    /* Función para hacer el cambio de color con un valor hexadecimal */
    function hexInputChange() {
        /* Solicitud de HTTP */ 
        getFile();

        /* Obtener valor */
        var stringHex = $("#hexInput").val();
        
        /* Patrón que detecta valores hexadecimales
           Patrón de 3 grupos, cada uno para los valores rojo, verde y azul */ 
        var pattern = /^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
        
        /* Si ha introducido el código hexadecimal de 6 dígitos, se encuentra en condiciones de
           comparar el string con el patrón */ 
        if (stringHex.match(pattern)) {
            /* Se ejecuta el patrón con el string */ 
            var match = pattern.exec(stringHex);

            /* Se obtienen los valores individuales, y se hace una conversión manual de hexadecimal a número, para cada color */
            var redNumber = hexStringToNumber(match[1]);
            var greenNumber = hexStringToNumber(match[2]);
            var blueNumber = hexStringToNumber(match[3]);
            
            /* CAMBIO DE COLOR */
            
            /* [1 -> 4] Se pasan los valores al DIV que muestra el color */ 
            showingColor(stringHex, redNumber, greenNumber, blueNumber); 
            
            /* CAMBIO A LAS OTRAS COLUMNAS */ 
            
            /* [1 -> 2] Se pasa el valor a la columna de selección por rango/input de colores */ 
            toColorsColumn(redNumber, greenNumber, blueNumber); 
            
            /* [1 -> 3] Se compara el valor con el arreglo de colores. Si existe, se cambia en el menú dropdown */ 
            toNameColumn(stringHex, colorsArray); 
        }
    }
    
    /* Funciones auxiliares */  
    
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
    
    /* Función de paso de datos a la columna de colores individuales */ 
    function toColorsColumn(red, green, blue) {
        $("#redInput").val(red);
        $("#redRange").val(red);
        $("#greenInput").val(green);
        $("#greenRange").val(green);
        $("#blueInput").val(blue);
        $("#blueRange").val(blue);
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
    
    /* Unión de eventos a funciones */ 
    
    /* Se une la función hexInputChange cuando se introduce texto en el elemento hexInput */ 
    document.getElementById("hexInput").addEventListener("input", hexInputChange);
});