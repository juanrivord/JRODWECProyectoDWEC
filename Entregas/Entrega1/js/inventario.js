/*
* ---------- DEFINICION DE VARIABLES Y CLASES ----------
*/
class Item{ 
    constructor(name, description, quantity, maxStack) {
        this.name = name;
        this.description = description;
        this.maxStack = maxStack;
        this.quantity = quantity; // Valor privado
        
    }

    set quantity(value){ // Si el valor "value" que pasamos es menor a 0 o mayor al maximo de stack devuelve 0, sino, el valor pasado.
        this._quantity = (value >= 0 && value <= this.maxStack) ? value : 0;
    }

    get quantity(){
        return this._quantity;
    }

    showInfo(){
        console.log("Nombre: "+this.name,
            "\nDescripción: "+this.description,
            "\nCantidad: "+this._quantity,
            "\nMáximo de Stack: "+this.maxStack);
    }

    showInfoShorted(){
        return this.name+"("+this._quantity+")"
    }
}



// ---------- MATRIZ "INVENTARIO" ----------

let inventario = Array(4).fill().map(() => Array(9).fill());

// ---------- VALORES HARCODEADOS ----------



let item1 = new Item("Piedra","Trozo solido de roca dura",45,64);
let item2 = new Item("Manzana","El fruto que eva se comio cuando no debia",16,64);
let item3 = new Item("Antorcha","Un palo con un cacho carbon que arde",36,64);
let item4 = new Item("Espada de diamante","Espada hecha del material mas duro del planeta",1,1);
let item5 = new Item("Pico de hierro","Pico hecho de 3 simples lingotes de hierro",1,1);


inventario [0][0]= item1;
inventario [1][2]= item1;
inventario [2][8]= item1;
inventario [1][4]= item2;
inventario [2][3]= item3;
inventario [3][1]= item4;
inventario [3][8]= item5;

// ---------- MENU ----------
let opcion;

do {
    let input = prompt("INVENTARIO DE MINECRAFT" +
        "\n======================================" +
        "\n1. Mostrar inventario completo " +
        "\n2. Mostrar barra de accesos rápidos" +
        "\n3. Buscar un objeto" +
        "\n4. Añadir un objeto al inventario" +
        "\n5. Mover un objeto" +
        "\n6. Eliminar un objeto" +
        "\n7. Mostrar huecos libres" +
        "\n8. Mostrar el objeto más abundante" +
        "\n0. Salir");

        if (input === null) {
            opcion = 0;
        } else {
            opcion = parseInt(input,10); 
            // Pasamos la opcion a INT ya que el switch no acepta strings, parseInt (cadena_a_convertir,base_a_la_que_convertir)
            // En este caso como son numero naturales, la base es 10
        }

    switch (opcion) {
        case 1:
            showInventory();
        break;

        case 2:
            showQuickAccessBar();
        break;
        
        case 3:
            searchItem();
        break;

        case 4:
            addItem();
        break;

        case 5:
            moveItem();
        break;

        case 6:
            deleteItem();
        break;

        case 7:
            countFreeSpaces();
        break;

        case 8:
            getMostQuantityStack();
        break;

        case 0:
            break;

        default:
            alert("ERROR: Introduzca un valor entre 0 y 8");
        break;
    }
    
} while (opcion !== 0); 


// ---------- FUNCIONES ----------

// Mostrar inventario
function showInventory(){

    console.log("INVENTARIO"+
        "\n===========");

    // Para formatear la salida creo la fila que voy a enseñar en el bucle de las filas (obvio) y le añado como primer valor "["
    // Y luego cada vez que encuentro algo en la fila, se lo concateno a la variable fila que he creado añadiendo una ","
    // Para asegurar no poner comas al final del todo, compruebo si es el ultimo elemento y con un operador ternario añado una , o nada "".
    for (let i = 0; i < inventario.length; i++) {
        let fila = "[";
        for (let j = 0; j < inventario[i].length; j++) {
            if (inventario[i][j] === undefined) {
                fila += "VACIO" + (j < inventario[i].length - 1 ? ", " : ""); // Comprobacion ultimo elemento
            } else {
                fila += inventario[i][j].name +"("+inventario[i][j].quantity+")" +(j < inventario[i].length - 1 ? ", " : "");
            }
            
        }
        fila += "]";
        
        console.log(fila);
    }

    // console.table(inventario);
}


// Mostrar barra de accesos rapidos
function showQuickAccessBar(){
    let quickAccesBar = inventario[0];
    let fila = "[";

    quickAccesBar.forEach((element, index) => { // Añado el indice en el foreach para hacer la comprobacion de ultimo elemento.
        let separador = (index < quickAccesBar.length - 1) ? ", " : ""; // Esta comprobacion se hace igual que antes, pero en un bucle for each usando el index.

        if(element === undefined){
            fila += "VACIO"+separador; // Al meter el separador en una variable se la añado al final de los dos resultados.
        }else{
            fila += element.showInfoShorted()+separador;
        }

        
    });
    fila += "]";
    console.log("BARRA DE ACCESO RAPIDO"+
        "\n=======================");
    console.log(fila);
}


// Buscar un item
function searchItem() {
    let input = prompt("Introduce el nombre del item a buscar: ");

    if (input === null || input.trim() === "") { //Compruebo si esta vacio o la entrada ha sido nula. trim() quita los espacios.
        alert("Introduce un item válido");
        return;
    }

    // Para poder formatear la salida de una manera leible, lo que hago es a parte de capturar el objeto a buscar en "input".
    // Creo un array de posiciones para almacenar las posiciones en las que se encuentra.
    // Creamos un contador para sumar las cantidades de los objetos.
    // Y una flag para regular si el item que buscamos existe o no
    let itemToSearch = input.trim().toLowerCase();
    let positions = [];
    let quantityCounter = 0;
    let found = null;

    for (let i = 0; i < inventario.length; i++) {
        for (let j = 0; j < inventario[i].length; j++) {
            let actualItem = inventario[i][j];

            // Esta comprobacion busca que el item exista, y sea el mismo que estamos buscando
            if (actualItem !== undefined && actualItem.name.toLowerCase() === itemToSearch) {
                positions.push("["+i+"]"+"["+j+"]"); // .push añade al array que hemos creado antes lo que queramos, en este caso las posiciones
                quantityCounter += actualItem.quantity; // sumamos la cantidad que tenga el item
                if (!found) found = actualItem; // Añadimos el item a la variable ya que existe, para poder tratarlo luego, esto solo ocurre una vez.
            }
        }
    }

    if (positions.length === 0) { // Si el array de posiciones no ha recibido ninguna posicion, damos por hecho que no esta o no existe
        alert("El item solicitado no existe o no se encuentra en el inventario");
        return;
    }

    // La salida formateada
    console.log("BUSCANDO ITEM\n==============");
    console.log("Item: "+found.name);
    console.log("Descripción: "+found.description);
    console.log("Ubicaciones: "+positions.join(", ")); // Simplemente añadimos una ", " entre cada indice del array
    console.log("Cantidad total: "+quantityCounter);
}

function addItem(){

}

function moveItem(){

}

function deleteItem(){

}

function countFreeSpaces(){

}

function getMostQuantityStack(){

}




// ---------- PRUEBAS ----------

// showInventory();
// showQuickAccessBar();