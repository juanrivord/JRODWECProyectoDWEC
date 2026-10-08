/*
* ---------- DEFINICION DE VARIABLES Y CLASES ----------
*/
class Item{ 
    constructor(name, description, maxStack, quantity) {
        this.name = name;
        this.description = description;
        this.maxStack = maxStack;
        this._quantity = quantity;
        
    }

    set quantity(value){ 
        this._quantity = (value >= 0 && value <= this.maxStack) ? value : this.maxStack;
    }

    get quantity(){
        return this._quantity;
    }

    showInfo(){
        console.log("Nombre: "+this.name,
            "\nDescripción: "+this.description,
            "\nMáximo de Stack: "+this.maxStack,
            "\nCantidad: "+this._quantity);
    }

    showInfoShorted(){
        return this.name+"("+this._quantity+")"
    }

}



// ---------- MATRIZ "inventory" ----------

let inventory = Array(4).fill().map(() => Array(9).fill());

// ---------- VALORES HARCODEADOS ----------



let item1 = new Item("Piedra","Trozo solido de roca dura",64,64);
let item2 = new Item("Manzana","El fruto que eva se comio cuando no debia",64,16);
let item3 = new Item("Antorcha","Un palo con un cacho carbon que arde",64,32);
let item4 = new Item("Espada de diamante","Espada hecha del material mas duro del planeta",1,1);
let item5 = new Item("Pico de hierro","Pico hecho de 3 simples lingotes de hierro",1,1);
let item6 = new Item("prueba","prueba",1,1);


inventory [0][0]= item1;
inventory [1][2]= item2;
inventory [2][8]= item3;
inventory [1][4]= item4;
inventory [2][3]= item5;
inventory [3][1]= item6;

// ---------- MENU ----------
/*
let opcion;

do {
    let input = prompt("inventario DE MINECRAFT" +
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
*/

// ---------- FUNCIONES ----------

// Mostrar inventory
function showInventory(){

    console.log("Inventario"+
                "\n===========");


        for (let i = 0; i < inventory.length; i++) {
        let fila = "[";
        for (let j = 0; j < inventory[i].length; j++) {
            if (inventory[i][j] === undefined) {
                fila += "VACIO" + (j < inventory[i].length - 1 ? ", " : ""); // Comprobacion ultimo elemento
            } else {
                fila += inventory[i][j].name + "("+inventory[i][j].quantity+")" + (j < inventory[i].length - 1 ? ", " : "");
            }
            
        }
        fila += "]";
        
        console.log(fila);
    }

    // console.table(inventory);
}


// Mostrar barra de accesos rapidos
function showQuickAccessBar(){
    let quickAccesBar = inventory[0];
    let fila = "[";

    quickAccesBar.forEach((element, index) => { 
        let separador = (index < quickAccesBar.length - 1) ? ", " : ""; 

        if(element === undefined){
            fila += "VACIO"+separador; 
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

    if (input === null || input.trim() === "") { // Si se introduce algo raro o nada se va
        alert("Introduce un item válido");
        return;
    }

    let itemToSearch = input.trim().toLowerCase();
    let positions = [];
    let quantityCounter = 0;
    let found = null;

    // Recorrido de la matriz mediante funcion callback
    forEachSlot((actualItem, i, j) => {
        if (actualItem !== undefined && actualItem.name.toLowerCase() === itemToSearch) {
            positions.push("["+i+"]"+"["+j+"]"); // .push añade al array que hemos creado antes lo que queramos, en este caso las posiciones
            quantityCounter += actualItem.quantity; 
            if (!found) found = actualItem; // Añadimos el item a la variable ya que existe, para poder tratarlo luego, esto solo ocurre una vez.
        }
    });

    if (positions.length === 0) {
        alert("El item solicitado no existe o no se encuentra en el inventory");
        return;
    }

    // La salida formateada
    console.log("BUSCANDO ITEM\n==============");
    console.log("Item: "+found.name);
    console.log("Descripción: "+found.description);
    console.log("Ubicaciones: "+positions.join(", ")); // Simplemente añadimos una ", " entre cada indice del array
    console.log("Cantidad total: "+quantityCounter);
}





// Añadir un item
function addItem() {

    let inputName = prompt("Introduzca el nombre del ítem: ");
    if (!inputName || inputName.trim() === "") {
        alert("Operación cancelada o nombre no válido.");
        return;
    }

    inputName = inputName.trim();
    let existingItem = findItemInInventory(inputName); // Comprobacion de si el item ya existe dentro del inventario

    let finalName = existingItem ? existingItem.name : inputName;
    let description;
    let maxStack;

    // Si ya existe en el inventario, reutilizamos su información
    if (existingItem !== null) {
        description = existingItem.description;
        maxStack = existingItem.maxStack;
        alert("El ítem ya existe en el inventario. Stack máximo (" + maxStack + ").");

    } else {// Si es nuevo, pedimos descripción y stack máximo

        description = prompt("Introduzca la descripción del ítem: ");
        if (description === null) return;

        let maxInput = prompt("Introduzca el tamaño máximo de stack (número entero positivo): ");
        while (!Number.isInteger(Number(maxInput)) || Number(maxInput) <= 0) {
            maxInput = prompt("ERROR: Introduzca un número entero mayor que 0: ");
            if (maxInput === null) return;
        }
        maxStack = parseInt(maxInput, 10);
    }


    // Pedimos la cantidad total que el usuario desea añadir
    let canInput = prompt("Introduzca la cantidad que desea añadir: ");
    while (!Number.isInteger(Number(canInput)) || Number(canInput) <= 0) {
        canInput = prompt("ERROR: Debe introducir una cantidad entera positiva: ");
        if (canInput === null) return;
    }


    // Variables de control de cantidad (necesarias para las operaciones de añadir)
    let remainingQuantity = parseInt(canInput, 10); 
    let originalRequested = remainingQuantity;



    // Rellenamos los stacks existentes que tengan espacio, si remainingQuantity es 0, detenemos el recorrido devolviendo false
    forEachSlot((slot) => {
        if (remainingQuantity <= 0) return false;

        if (slot !== undefined && slot.name.toLowerCase() === finalName.toLowerCase()) {
            let availableSpace = slot.maxStack - slot.quantity;

            if (availableSpace > 0) { // Añadimos la cantidad al slot y restamos del total del item
                let toAdd = Math.min(availableSpace, remainingQuantity);
                slot.quantity += toAdd;
                remainingQuantity -= toAdd;
            }
        }
    });



    // Si aún sobra cantidad, ocupar casillas vacías (undefined)
    forEachSlot((slot, i, j) => {
        if (remainingQuantity <= 0) return false;

        if (slot === undefined) {
            let toAdd = Math.min(maxStack, remainingQuantity);

            // Creamos un nuevo objeto Item independiente para esta casilla
            inventory[i][j] = new Item(finalName, description, maxStack, toAdd);
            remainingQuantity -= toAdd;
        }
    });


    
    // Resultado final + mensaje al usuario
    if (remainingQuantity === 0) {

        alert("Se añadieron con éxito las " + originalRequested + " unidades de " + finalName + ".");

    } else if (remainingQuantity < originalRequested) {

        let added = originalRequested - remainingQuantity;
        alert("ERROR:Espacio insuficiente. Se pudieron añadir " + added + " unidades, pero " + remainingQuantity + " no cabian.");

    } else {

        alert("ERROR:Inventario lleno No hay espacio disponible para añadir " + finalName + ".");

    }

    showInventory();
}


function moveItem(){

}

function deleteItem(){

}

function countFreeSpaces(){

}

function getMostQuantityStack(){

}


// ---------- FUNCIONES AÑADIDAS ----------

// Funcion auxiliar para recorrer la matriz devolviendo lo que requiera la funcion.
// BTW el parametro callback no es un numero ni texto ni nada, lo que hace es esperar instrucciones ejecutables, una funcion vaya.
function forEachSlot(callback) {
    for (let i = 0; i < inventory.length; i++) {
        for (let j = 0; j < inventory[i].length; j++) {
            let continueLoop = callback(inventory[i][j], i, j); // Cuando llega aqui, devuelve a la funcion que llame esta funcion: El objeto, la fila y la columna
            if (continueLoop === false) { // Si el callback devuelve false, rompemos el recorrido
                return;
            }
        }
    }
}

// Buscar y devuelve la referencia del item en caso de encontrarlo
function findItemInInventory(itemToSearch) {
    if (!itemToSearch) return null;

    let searchName = (typeof itemToSearch === 'object' && itemToSearch !== null) ? itemToSearch.name : itemToSearch;

    searchName = searchName.trim().toLowerCase();
    let found = null;

    // Busqueda reutilizando forEachSlot
    forEachSlot((actualItem) => {
        if (actualItem !== undefined && actualItem.name.toLowerCase() === searchName) {
            found = actualItem;
            return false; // Detenemos la busqueda al encontrar la primera coincidencia
        }
    });

    return found;
}


// ---------- PRUEBAS ----------

showInventory();
showQuickAccessBar();