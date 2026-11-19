// Lee los tres controles con value. Convierte precio y cantidad y escribe el resumen del pedido con textContent. 
// Calcula el total con dos decimales.
// Rechaza el nombre o los campos vacíos, un precio no numérico o negativo y una cantidad que no sea un entero positivo.
// Muestra un mensaje de error en #resumen.
// Prueba modificando los atributos value del HTML y recargando.
// No necesitas eventos. El caso inicial debe dar 25.00 €.

const DOM_INPUT_NAME = document.getElementById('nombre');
const DOM_INPUT_PRICE = document.getElementById('precio');
const DOM_INPUT_QUANTITY = document.getElementById('cantidad');
const DOM_RESUME = document.getElementById('resumen');

let entradaOK = true;

if (DOM_INPUT_NAME.value === "") entradaOK = false;  

if(Number.isNaN(DOM_INPUT_PRICE.value) && DOM_INPUT_PRICE.value<0) entradaOK = false;

if(DOM_INPUT_QUANTITY.value<0) entradaOK = false;


if (entradaOK) {
    let total = Number(DOM_INPUT_PRICE.value) * Number(DOM_INPUT_QUANTITY.value);
    DOM_RESUME.textContent="Cantidad a pagar: " + total.toFixed(2) + "€";
} else {
    DOM_RESUME.textContent="Formato no valido";
}

