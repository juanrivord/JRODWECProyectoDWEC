
/*
----------------------------------------------
    EJERCICIO 2. RESERVA DE ASIENTOS DE CINE
----------------------------------------------
*/

const SEATS = [
    [null, null, "Ana", null, null],
    [null, "Luis", null, null, null],
    ["Marta", null, null, "Carlos", null],
    [null, null, null, null, "Lucía"],
    [null, "Javier", null, null, null]
];

function showMenu() {
    return prompt(`
        Selecciona una opción:
        1. Mostrar asientos
        2. Mostrar reservas
        3. Mostrar asientos libres
        4. Reservar asiento
        5. Liberar asiento
        6. Salir
    `);
}

function showSeats() {
    /*
    1. IMPLEMENTA LA FUNCIÓN PARA MOSTRAR LOS ASIENTOS DEL CINE
    Fila 1: [ ] [ ] [Ana] [ ] [ ]
    Fila 2: [ ] [Luis] [ ] [ ] [ ]
    Fila 3: [Marta] [ ] [ ] [Carlos] [ ]
    Fila 4: [ ] [ ] [ ] [ ] [Lucía]
    Fila 5: [ ] [Javier] [ ] [ ] [ ]
    */
}

function showReservations() {
    /*
    2. IMPLEMENTA LA FUNCIÓN PARA MOSTRAR LAS RESERVAS DEL CINE
    Butaca 1,2: Ana
    Butaca 2,2: Luis
    Butaca 3,1: Marta
    Butaca 3,4: Carlos
    Butaca 4,5: Lucía
    Butaca 5,2: Javier
    */

}

function showFreeSeats() {
    /*
    3. IMPLEMENTA LA FUNCIÓN PARA MOSTRAR LOS ASIENTOS LIBRES DEL CINE
    Butaca 1,1 | Butaca 1,2 | Butaca 1,4 | Butaca 1,5 |
    Butaca 2,1 | Butaca 2,3 | Butaca 2,4 | Butaca 2,5 |
    Butaca 3,2 | Butaca 3,3 | Butaca 3,5 |
    */

}

function reserveSeat() {
    /*
    4. IMPLEMENTA LA FUNCIÓN PARA RESERVAR UN ASIENTO DEL CINE
    Cuando se haga la reserva muestra por consola el mensaje
    "Reserva realizada el día dd/mm/aaaa a las hh:mm:ss"
    Usa la fecha actual para mostrarla en el mensaje
    Usa Date.now()
    */
}

function freeSeat() {
    /*
    5. IMPLEMENTA LA FUNCIÓN PARA LIBERAR UN ASIENTO DEL CINE
    */
}


let continueLoop = true;
while (continueLoop) {
    let option = showMenu();
    switch (option) {
        case "1":
            showSeats();
            break;
        case "2":
            showReservations();
            break;
        case "3":
            showFreeSeats();
            break;
        case "4":
            reserveSeat();
            break;
        case "5":
            freeSeat();
            break;
        case "6":
            continueLoop = false;
            break;
        default:
            alert("Opción no válida");
    }
}