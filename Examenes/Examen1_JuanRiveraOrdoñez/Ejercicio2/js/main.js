
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

// FALTA POR IMPLEMENTAR QUE CUANDO TENGA QUE SALIR 0 SALGA 1, DEJAR PARA EL FINAL

function showMenu() {
    return prompt(`
        Selecciona una opción:
        1. Mostrar asientos
        2. Mostrar reserved
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
    console.log("ASIENTOS\n===========");

    for (let i = 0; i < SEATS.length; i++) {
        let fila = "";
        for (let j = 0; j < SEATS[i].length; j++) {
            if (SEATS[i][j] === null) {
                fila += "[]" + (j < SEATS[i].length - 1 ? ", " : "");
            } else {
                fila += "[" + SEATS[i][j] + "]" + (j < SEATS[i].length - 1 ? ", " : "");
            }
        }
        fila += "";
        console.log(fila);
    }
}

function showReservations() {
    /*
    2. IMPLEMENTA LA FUNCIÓN PARA MOSTRAR LAS reserved DEL CINE
    Butaca 1,2: Ana
    Butaca 2,2: Luis
    Butaca 3,1: Marta
    Butaca 3,4: Carlos
    Butaca 4,5: Lucía
    Butaca 5,2: Javier
    */

    let reserved = [];

    for (let i = 0; i < SEATS.length; i++) {
        for (let j = 0; j < SEATS[i].length; j++) {
            if (SEATS[i][j] !== null) {
                let numButacaI= i+1;
                let numButacaJ= j+1;
                reserved.push("Butaca "+numButacaI+","+numButacaJ+": "+SEATS[i][j]);
            }
        }
        
    }

    console.log("Asientos reservados: ")
    for (let i = 0; i < reserved.length; i++) {
        console.log(reserved[i]);
    }

}

function showFreeSeats() {
    /*
    3. IMPLEMENTA LA FUNCIÓN PARA MOSTRAR LOS ASIENTOS LIBRES DEL CINE
    Butaca 1,1 | Butaca 1,2 | Butaca 1,4 | Butaca 1,5 |
    Butaca 2,1 | Butaca 2,3 | Butaca 2,4 | Butaca 2,5 |
    Butaca 3,2 | Butaca 3,3 | Butaca 3,5 |
    */

    console.log("ASIENTOS LIBRES\n=================")
    for (let i = 0; i < SEATS.length; i++) {
        let fila = "";
        for (let j = 0; j < SEATS[i].length; j++) {
            if (SEATS[i][j] === null) {
                i+=1;
                fila += "Butaca "+i+","+j +"|";
                i-=1;
            } 
        }
        fila += "";
        console.log(fila);
    }

}

function reserveSeat() {
    /*
    4. IMPLEMENTA LA FUNCIÓN PARA RESERVAR UN ASIENTO DEL CINE
    Cuando se haga la reserva muestra por consola el mensaje
    "Reserva realizada el día dd/mm/aaaa a las hh:mm:ss"
    Usa la fecha actual para mostrarla en el mensaje
    Usa Date.now()
    */

    let input = prompt("Introduzca un asiento libre, ejem(1.1,2,1,3,1): ")
    let cordinates = getCordinates(input);

    if (!cordinates) {
        alert("ERROR: Introduzca unas cordenadas válidas");
        input = prompt("Introduzca un asiento libre, ejem(1.1,2,1,3,1): ")
        cordinates = getCordinates(input);
    }

    let row = cordinates[0];
    let col = cordinates[1];

    if(SEATS[row][col] === null){
        
        let name = prompt("Introduzca un nombre de la reserva: ")
        SEATS[row][col] = name;

        let now = new Date(Date.now());

        let day = now.getDate();
        let month = now.getMonth()+1;
        let year = now.getFullYear();

        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        let finalDate = day+"/"+month+"/"+year;
        let finalHours = hours+":"+minutes+":"+seconds;

        alert("Reserva realizada el dia "+finalDate+" a las "+finalHours);

    }else{
        alert("ERROR: Ese asiento esta ocupado");
    }

    
}

function freeSeat() {
    /*
    5. IMPLEMENTA LA FUNCIÓN PARA LIBERAR UN ASIENTO DEL CINE
    */

    let input = prompt("Introduzca las coordenadas a liberar, ejem(1.1,2,1,3,1): ");
    let cordinates = getCordinates(input);

    if (!cordinates) {
        alert("ERROR: Introduzca unas cordenadas válidas");
        input = prompt("Introduzca las coordenadas a liberar, ejem(1.1,2,1,3,1): ");
        cordinates = getCordinates(input);
    }

    let row = cordinates[0];
    let col = cordinates[1];

    if(SEATS[row][col] !== null){
        
        SEATS[row][col] = null;

    }else{
        alert("ERROR: Ese asiento no esta ocupado");
    }
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

function getCordinates(input) {
    let textInput = String(input);
    let regex = /^([0-4])[.,]([0-4])$/;
    let coincidence = textInput.match(regex);

    if (!coincidence) {
        return false; 
    }

    let row = parseInt(coincidence[1], 10);
    let column = parseInt(coincidence[2], 10);

    return [row, column];
}