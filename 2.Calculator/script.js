let operation = prompt("Introduzca una operacion arimética(Ej. 3+5,2*1,3/2,5-2):");

// let result = eval(operation); Esta función hace automáticamente la operación.

let result;
let operator;

if (operation.length > 0) {

    operator = operation.match(/[+\-*/]/);

    if (operator != undefined) {
        let num1 = parseFloat(operation.split(operator)[0]);
        // console.log(typeof num1+" "+num1);
        let num2 = parseFloat(operation.split(operator)[1]);
        // console.log(typeof num2+" "+num2);
        // console.log(typeof operator+" "+operator);

        //Comprobamos si los numeros son Float o Integer mediante la funcion esValido().
        
        if(esValido(num1) && esValido(num2)){
            switch (operator[0]) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
        }
    
                alert("El resultado de la operación es: " + result); // Todo funciona bien
        }else{
            alert("ERROR: Introduzca numeros válidos"); // El IF de antes del Switch da error porque alguno de los 2 operandos no son numeros
        }
        
    } else{
        alert("ERROR: Introduzca un operador"); // No hay un operador/ no es un operador válido
    }
} else{
    alert("ERROR: Introduzca una operación"); // No se ha introducido una operacion correcta
}


function esValido(numero) { //Metodo para comprobar si el numero es float o integer

    if(Number.isInteger(numero)){
        return numero;
    }

    return Number.isFinite(numero) && (numero % 1 !== 0);
}
