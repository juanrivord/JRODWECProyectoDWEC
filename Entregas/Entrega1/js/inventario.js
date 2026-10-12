/*
* ---------- DEFINICION DE VARIABLES Y CLASES ----------
*/
class Item { 
    constructor(name, description, maxStack, quantity) {
        this.name = name;
        this.description = description;
        this.maxStack = maxStack;
        this._quantity = quantity;
    }

    set quantity(value) { 
        this._quantity = (value >= 0 && value <= this.maxStack) ? value : this.maxStack;
    }

    get quantity() {
        return this._quantity;
    }

    showInfo() {
        console.log("Nombre: " + this.name,
            "\nDescripción: " + this.description,
            "\nMáximo de Stack: " + this.maxStack,
            "\nCantidad: " + this._quantity);
    }

    showInfoShorted() {
        return this.name + "(" + this._quantity + ")";
    }
}

// ---------- MATRIZ "inventory" ----------
let inventory = Array(4).fill().map(() => Array(9).fill());

// ---------- VALORES HARCODEADOS ----------
let item1 = new Item("Piedra", "Trozo solido de roca dura", 64, 64);
let item2 = new Item("Manzana", "El fruto que eva se comio cuando no debia", 64, 16);
let item3 = new Item("Antorcha", "Un palo con un cacho carbon que arde", 64, 32);
let item4 = new Item("Espada de diamante", "Espada hecha del material mas duro del planeta", 1, 1);
let item5 = new Item("Pico de hierro", "Pico hecho de 3 simples lingotes de hierro", 1, 1);
let item6 = new Item("prueba", "prueba", 1, 1);

inventory[0][0] = item1;
inventory[1][2] = item2;
inventory[2][8] = item3;
inventory[1][4] = item4;
inventory[2][3] = item5;
inventory[3][1] = item6;

// ---------- MENU ----------
let opcion;

do {
    let input = prompt("INVENTARIO DE MINECRAFT" +
        "\n======================================" +
        "\n1. Mostrar inventario completo" +
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
        opcion = parseInt(input, 10);
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

// Mostrar inventory
function showInventory() {
    console.log("Inventario\n===========");

    for (let i = 0; i < inventory.length; i++) {
        let fila = "[";
        for (let j = 0; j < inventory[i].length; j++) {
            if (inventory[i][j] === undefined) {
                fila += "VACIO" + "[" + i + "," + j + "]" + (j < inventory[i].length - 1 ? ", " : "");
            } else {
                fila += inventory[i][j].name + "[" + i + "," + j + "]" + "(" + inventory[i][j].quantity + ")" + (j < inventory[i].length - 1 ? ", " : "");
            }
        }
        fila += "]";
        console.log(fila);
    }
}

// Mostrar barra de accesos rapidos
function showQuickAccessBar() {
    let quickAccesBar = inventory[0];
    let fila = "[";

    quickAccesBar.forEach((element, index) => { 
        let separador = (index < quickAccesBar.length - 1) ? ", " : ""; 

        if (element === undefined) {
            fila += "VACIO" + separador; 
        } else {
            fila += element.showInfoShorted() + separador;
        }
    });
    fila += "]";
    console.log("BARRA DE ACCESO RAPIDO\n=======================");
    console.log(fila);
}

// Buscar un item
function searchItem() {
    let input = prompt("Introduce el nombre del item a buscar: ");

    if (input === null || input.trim() === "") {
        alert("Introduce un item válido");
        return;
    }

    let itemToSearch = input.trim().toLowerCase();
    let positions = [];
    let quantityCounter = 0;
    let found = null;

    forEachSlot((actualItem, i, j) => {
        if (actualItem !== undefined && actualItem.name.toLowerCase() === itemToSearch) {
            positions.push("[" + i + "][" + j + "]");
            quantityCounter += actualItem.quantity; 
            if (!found) found = actualItem;
        }
    });

    if (positions.length === 0) {
        alert("El item solicitado no existe o no se encuentra en el inventario");
        return;
    }

    console.log("BUSCANDO ITEM\n==============");
    console.log("Item: " + found.name);
    console.log("Descripción: " + found.description);
    console.log("Ubicaciones: " + positions.join(", "));
    console.log("Cantidad total: " + quantityCounter);
}

// Añadir un item
function addItem() {
    let inputName = prompt("Introduzca el nombre del ítem: ");
    if (!inputName || inputName.trim() === "") {
        alert("Operación cancelada o nombre no válido.");
        return;
    }

    inputName = inputName.trim();
    let existingItem = findItemInInventory(inputName);

    let finalName = existingItem ? existingItem.name : inputName;
    let description;
    let maxStack;

    if (existingItem !== null) {
        description = existingItem.description;
        maxStack = existingItem.maxStack;
        alert("El ítem ya existe en el inventario. Stack máximo (" + maxStack + ").");
    } else {
        description = prompt("Introduzca la descripción del ítem: ");
        if (description === null) return;

        let maxInput = prompt("Introduzca el tamaño máximo de stack (número entero positivo): ");
        while (!Number.isInteger(Number(maxInput)) || Number(maxInput) <= 0) {
            maxInput = prompt("ERROR: Introduzca un número entero mayor que 0: ");
            if (maxInput === null) return;
        }
        maxStack = parseInt(maxInput, 10);
    }

    let canInput = prompt("Introduzca la cantidad que desea añadir: ");
    while (!Number.isInteger(Number(canInput)) || Number(canInput) <= 0) {
        canInput = prompt("ERROR: Debe introducir una cantidad entera positiva: ");
        if (canInput === null) return;
    }

    let remainingQuantity = parseInt(canInput, 10); 
    let originalRequested = remainingQuantity;

    forEachSlot((slot) => {
        if (remainingQuantity <= 0) return false;

        if (slot !== undefined && slot.name.toLowerCase() === finalName.toLowerCase()) {
            let availableSpace = slot.maxStack - slot.quantity;

            if (availableSpace > 0) {
                let toAdd = Math.min(availableSpace, remainingQuantity);
                slot.quantity += toAdd;
                remainingQuantity -= toAdd;
            }
        }
    });

    forEachSlot((slot, i, j) => {
        if (remainingQuantity <= 0) return false;

        if (slot === undefined) {
            let toAdd = Math.min(maxStack, remainingQuantity);
            inventory[i][j] = new Item(finalName, description, maxStack, toAdd);
            remainingQuantity -= toAdd;
        }
    });

    if (remainingQuantity === 0) {
        alert("Se añadieron con éxito las " + originalRequested + " unidades de " + finalName + ".");
    } else if (remainingQuantity < originalRequested) {
        let added = originalRequested - remainingQuantity;
        alert("ERROR: Espacio insuficiente. Se pudieron añadir " + added + " unidades, pero " + remainingQuantity + " no cabían.");
    } else {
        alert("ERROR: Inventario lleno. No hay espacio disponible para añadir " + finalName + ".");
    }

    showInventory();
}

// Mover un item
function moveItem() {
    showInventory();

    let inputPosition = prompt("Elija un item para mover: Ej: 0.0 - 0.2 - 3.5");
    let coordinates = getCordinates(inputPosition);

    while (!coordinates) {
        alert("ERROR: Introduzca unas coordenadas válidas");
        inputPosition = prompt("Elija un item para mover: Ej: 0.0 - 0.2 - 3.5");
        if (inputPosition === null) return;
        coordinates = getCordinates(inputPosition);
    }

    let originRow = coordinates[0];
    let originCol = coordinates[1];
    let selectedItem = findItemWithCordinates(originRow, originCol);

    if (!selectedItem) {
        alert("La casilla seleccionada está vacía. No hay ningún ítem para mover.");
        return;
    }

    let itemName = (typeof selectedItem === "object" && selectedItem !== null) ? selectedItem.name : selectedItem;

    let outputPosition = prompt("Item elegido: " + itemName + "\nElija una posición a la que mover:");
    coordinates = getCordinates(outputPosition);

    while (!coordinates) {
        alert("ERROR: Introduzca unas coordenadas válidas");
        outputPosition = prompt("Item elegido: " + itemName + "\nElija una posición a la que mover:");
        if (outputPosition === null) return;
        coordinates = getCordinates(outputPosition);
    }

    let targetRow = coordinates[0];
    let targetCol = coordinates[1];

    if (originRow === targetRow && originCol === targetCol) {
        alert("La posición de destino es la misma que la de origen.");
        return;
    }

    let targetItem = findItemWithCordinates(targetRow, targetCol);

    if (!targetItem) {
        inventory[targetRow][targetCol] = selectedItem;
        inventory[originRow][originCol] = undefined;
        alert("El objeto fue movido a la casilla [" + targetRow + ", " + targetCol + "].");
    } else if (targetItem.name.toLowerCase() === selectedItem.name.toLowerCase()) {
        let availableSpace = targetItem.maxStack - targetItem.quantity;

        if (availableSpace <= 0) {
            alert("El stack de destino ya está completo (" + targetItem.maxStack + "). No se pueden añadir más unidades.");
            return;
        }

        if (selectedItem.quantity <= availableSpace) {
            targetItem.quantity += selectedItem.quantity;
            inventory[originRow][originCol] = undefined;
            alert("Se agruparon todas las unidades en la casilla de destino.");
        } else {
            targetItem.quantity = targetItem.maxStack;
            selectedItem.quantity -= availableSpace;
            alert("Se llenó el stack de destino. Quedan " + selectedItem.quantity + " unidades en la posición de origen.");
        }
    } else {
        alert("ERROR: Casilla ocupada por otro objeto (" + targetItem.name + ").");
    }

    showInventory();
}

// Eliminar un item
function deleteItem() {
    showInventory();

    let inputPosition = prompt("Elija la posición del item a eliminar: Ej: 0.0 - 0.2 - 3.5");
    let coordinates = getCordinates(inputPosition);

    while (!coordinates) {
        alert("ERROR: Introduzca unas coordenadas válidas");
        inputPosition = prompt("Elija la posición del item a eliminar: Ej: 0.0 - 0.2 - 3.5");
        if (inputPosition === null) return;
        coordinates = getCordinates(inputPosition);
    }

    let row = coordinates[0];
    let col = coordinates[1];
    let selectedItem = findItemWithCordinates(row, col);

    if (!selectedItem) {
        alert("La casilla seleccionada ya está vacía. No hay nada que eliminar.");
        return;
    }

    let confirmation = confirm("¿Está seguro de que desea eliminar " + selectedItem.name + " (" + selectedItem.quantity + " unidades) de la posición [" + row + ", " + col + "]?");

    if (confirmation) {
        inventory[row][col] = undefined;
        alert("Objeto eliminado correctamente.");
        showInventory();
    } else {
        alert("Operación cancelada.");
    }
}

// Mostrar huecos libres
function countFreeSpaces() {
    let totalFree = 0;
    let quickBarFree = 0;

    forEachSlot((slot, i) => {
        if (slot === undefined) {
            totalFree++;
            if (i === 0) {
                quickBarFree++;
            }
        }
    });

    console.log("HUECOS LIBRES\n=======================");
    console.log("Huecos libres en todo el inventario: " + totalFree + " / 36");
    console.log("Huecos libres en la barra rápida: " + quickBarFree + " / 9");
    alert("Huecos libres totales: " + totalFree + "\nHuecos libres en barra rápida: " + quickBarFree);
}

// Mostrar el objeto más abundante
function getMostQuantityStack() {
    let totalsByName = {};

    forEachSlot((slot) => {
        if (slot !== undefined) {
            let key = slot.name.toLowerCase();
            if (!totalsByName[key]) {
                totalsByName[key] = {
                    name: slot.name,
                    totalQuantity: 0
                };
            }
            totalsByName[key].totalQuantity += slot.quantity;
        }
    });

    let keys = Object.keys(totalsByName);

    if (keys.length === 0) {
        alert("El inventario está completamente vacío.");
        return;
    }

    let mostAbundant = null;

    keys.forEach((key) => {
        if (!mostAbundant || totalsByName[key].totalQuantity > mostAbundant.totalQuantity) {
            mostAbundant = totalsByName[key];
        }
    });

    console.log("OBJETO MÁS ABUNDANTE\n=====================");
    console.log("Nombre: " + mostAbundant.name);
    console.log("Cantidad total acumulada: " + mostAbundant.totalQuantity);
    alert("El objeto más abundante es " + mostAbundant.name + " con un total de " + mostAbundant.totalQuantity + " unidades.");
}

// ---------- FUNCIONES AÑADIDAS ----------

function forEachSlot(callback) {
    for (let i = 0; i < inventory.length; i++) {
        for (let j = 0; j < inventory[i].length; j++) {
            let continueLoop = callback(inventory[i][j], i, j);
            if (continueLoop === false) {
                return;
            }
        }
    }
}

function findItemInInventory(itemToSearch) {
    if (!itemToSearch) return null;

    let searchName = (typeof itemToSearch === 'object' && itemToSearch !== null) ? itemToSearch.name : itemToSearch;
    searchName = searchName.trim().toLowerCase();
    let found = null;

    forEachSlot((actualItem) => {
        if (actualItem !== undefined && actualItem.name.toLowerCase() === searchName) {
            found = actualItem;
            return false;
        }
    });

    return found;
}

function findItemWithCordinates(row, col) {
    if (row < 0 || row >= inventory.length) {
        return null;
    }
    if (col < 0 || col >= inventory[row].length) {
        return null;
    }

    let item = inventory[row][col];
    return item !== undefined ? item : null;
}

function getCordinates(input) {
    let textInput = String(input);
    let regex = /^([0-3])[.,]([0-8])$/;
    let coincidence = textInput.match(regex);

    if (!coincidence) {
        return false; 
    }

    let row = parseInt(coincidence[1], 10);
    let column = parseInt(coincidence[2], 10);

    return [row, column];
}