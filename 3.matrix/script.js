function getRandomInt(min,max) { // Funcion que devuelve un numero aleatorio entre un minimo y un maximo
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
let matriz = Array(5).fill().map(() => Array(5).fill(0));

for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
        matriz[i][j]=getRandomInt(1,100);
    }
    console.log(matriz[i]);
}*/

/*
let matriz = Array(5).fill().map(
    () => Array(5).fill().map(
        () => getRandomInt(1,100)
    ));

for (let i = 0; i < matriz.length; i++) {
    console.log(matriz[i]);
    }
*/

let matriz = Array(5).fill().map(
    () => {
        let arrayRandom = new Array(5).fill().map(
            () => getRandomInt(1,100)
        );
        console.log(arrayRandom)
        return arrayRandom;
    });
    



