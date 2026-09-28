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

let inventario = Array(4).fill().map(
    () => {
        let inventarioCOL = new Array(9).fill()
        // console.log(inventarioCOL);
    });


// ---------- MENU ----------

/*
do {
    let opcion = prompt("INVENTARIO DE MINECRAFT"+
        "\n======================================"+
        "\n1. Mostrar inventario completo "+
        "\n2. Mostrar barra de accesos rápidos"+
        "\n3. Buscar un objeto"+
        "\n4. Añadir un objeto al inventario"+
        "\n5. Mover un objeto"+
        "\n6. Eliminar un objeto"+
        "\n7. Mostrar huecos libres"+
        "\n8. Mostrar el objeto más abundante"+
        "\n0. Salir");
    
} while (opcion != 0); */





// ---------- FUNCIONES ----------


function showInventory(){
    for (let i = 0; i < inventario.length; i++) {
        for (let j = 0; j < i.length; j++) {
            console.log(inventario[i][j]);  
        }
    }
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



let item1 = new Item("Espada","Espada de diamante",1,1);

item1.showInfo();

showInventory();