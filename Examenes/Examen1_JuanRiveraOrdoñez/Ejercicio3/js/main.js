
/*
------------------------------------------------------------
    EJERCICIO 3: DEPURACIÓN DE CÓDIGO
    Corrige los 10 errores que hay en el siguiente código.
------------------------------------------------------------
*/

const nombre = "Alex";
let edad = "20";
const mayorEdad = false;

if (edad >= 18) {
    mayorEdad = true;
}

console.log("Usuario: " + nombre.toUppercase());

let numeros = [10, 20, 30, 40];

for (let i = 0; i <= numeros.length; i++) {
    console.log(numeros[i]);
}

function calcularMedia(lista) {
    let suma = 0;

    lista.forEach(numero => {
        suma = numero;
    });

    return suma / lista.length;
}

console.log("Media: " + calcularMedia(numeros).toFixed(2));

let precio = "19.99";

if (precio === 19.99) {
    console.log("Precio correcto");
}

const aleatorio = Math.floor(Math.random * 10) + 1;

console.log("Número aleatorio: " + aleatorio);