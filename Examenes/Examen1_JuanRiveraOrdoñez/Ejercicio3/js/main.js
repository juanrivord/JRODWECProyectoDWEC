
/*
------------------------------------------------------------
    EJERCICIO 3: DEPURACIÓN DE CÓDIGO
    Corrige los 10 errores que hay en el siguiente código.
------------------------------------------------------------
*/

const nombre = "Alex";
// 1. He cambiado el valor de edad a 20, sin comillas, para asignarle Number en vez de String
let edad = 20;
// 2. mayorEdad esta const, luego hacemos una comprobacion y lo cambiamos, asi que no puede ser const, tiene que set let, para poder ser cambiado.
let mayorEdad = false;

// No se si es un error, pero he cambiado el if a una sentencia directa.
if (edad >= 18) mayorEdad = true;

// 3. La funcion ToUpperCase() estaba mal escrita, la c de Case estaba en minusculas
console.log("Usuario: " + nombre.toUpperCase());

let numeros = [10, 20, 30, 40];

// 4. La comprobacion de salida no puede ser <= ya que sino haria un recorrido más y no se encontraria nada en ese indice
for (let i = 0; i < numeros.length; i++) {
    console.log(numeros[i]);
}

function calcularMedia(lista) {
    let suma = 0;

    // 5. Hay que añadir un + en la asignacion ,si no lo unico que hace es cambiar de valor la variable suma al numero en el que se encuentre
    // No se si es otro error, pero en este caso en la arrow function no hace falta poner llaves, con la arrow es suficiente
    lista.forEach(numero => suma += numero);

    return suma / lista.length;
}

console.log("Media: " + calcularMedia(numeros).toFixed(2));

// 6. Le he quitado las comillas al precio, porque con las comillas se le estaba asignado un String, y tiene que ser un Number
let precio = 19.99;

// No se si es un error, pero he cambiado el if a una sentencia directa.
if (precio === 19.99) console.log("Precio correcto");

// 7. He corregido Math.random() y he añadido los parentesis a la función
const aleatorio = Math.floor(Math.random() * 10);

console.log("Número aleatorio: " + aleatorio);