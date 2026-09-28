/*
* ---------- DEFINICION DE VARIABLES Y CLASES ----------
*/
class Item{ 
    constructor(name, description, quantity, maxStack) {
        this.name = name;
        this.description = description;
        this._quantity = quantity; // Valor privado
        this.maxStack = maxStack;
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
}



// ---------- MATRIZ "INVENTARIO" ----------

let inventario = Array(4).fill().map(() => Array(9).fill());

// ---------- MENU ----------
let opcion;

do {
    let entrada = prompt("INVENTARIO DE MINECRAFT" +
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

        if (entrada === null) {
            opcion = 0;
        } else {
            opcion = parseInt(entrada,10);
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

        default:
            alert("ERROR: Introduzca un valor entre 0 y 8");
        break;
    }
    
} while (opcion != 0); 


// ---------- FUNCIONES ----------


function showInventory(){
    for (let i = 0; i < inventario.length; i++) {
        let fila = "[";
        for (let j = 0; j < inventario[i].length; j++) {
            fila += inventario[i][j] + (j < inventario[i].length - 1 ? ", " : "");
        }
        fila += "]";
        console.log(fila);
    }

    // console.table(inventario);
}

function showQuickAccessBar(){

}

function searchItem(){

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




// ---------- VALORES HARCODEADOS ----------



let item1 = new Item("Piedra","Trozo solido de roca dura",45,64);
let item2 = new Item("Manzana","El fruto que eva se comio cuando no debia",16,64);
let item3 = new Item("Antorcha","Un palo con un cacho carbon que arde",36,64);
let item4 = new Item("Espada de diamante","Espada hecha del material mas duro del planeta",1,1);
let item5 = new Item("Pico de hierro","Pico hecho de 3 simples lingotes de hierro",1,1);


inventario [0][0]= item1.name + "("+item1.quantity+")";
inventario [1][4]= item2.name + "("+item2.quantity+")";
inventario [2][3]= item3.name + "("+item3.quantity+")";
inventario [3][1]= item5.name + "("+item5.quantity+")";
inventario [3][8]= item4.name + "("+item4.quantity+")";

showInventory();