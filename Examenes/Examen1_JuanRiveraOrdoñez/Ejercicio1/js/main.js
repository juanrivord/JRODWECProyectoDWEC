import {Book} from './book.js';
import {library} from './library.js';

/*
----------------------------------------------
    EJERCICIO 1. BIBLIOTECA DE LIBROS
----------------------------------------------
*/

function showMenu() {
    return prompt(`
        Selecciona una opción:
        1. Mostrar todos los libros
        2. Mostrar libros por género
        3. Mostrar precio medio
        4. Mostrar libro más leído
        5. Mostrar libros acabados
        6. Salir
    `);
}

function showBooks(){
    /*
    1. MUESTRA TODOS LOS LIBROS DE LA BIBLIOTECA EN UN FORMATO DE TABLA
    Titulo | Género | Precio | Horas Leídas

    */

    console.log("LIBROS\n===========");

    console.log("TITULO | GENERO | PRECIO | HORAS LEIDAS")
    for (let i = 0; i < library.length; i++) {
        console.log(library[i].title + ", "+library[i].genre + ", "+library[i].price + ", "+library[i].hoursReaded);
    }

    // console.table(library);
}



function showBooksByGenre() {
    //Genres es un array que contiene todos los géneros de los libros de la biblioteca sin repetir
    let genres = [...new Set(library.map(book => book.genre))];

    let option = prompt(`
        Selecciona un género:
        1. Ficción
        2. Distópico
        3. Romance
        4. Fantasía
        5. Thriller
        6. Misterio
        7. Clásico
        8. Poesía
        9. Aventura
        10. Épico
        11. Modernista
        12. Drama
        13. Realismo mágico
        14. Ensayo
        15. Suspense
        16. Terror
        17. Histórico
    `);
    /*
    2. IMPLEMENTA LA FUNCIÓN PARA MOSTRAR LOS LIBROS SEGÚN EL GÉNERO SELECCIONADO
    */

    let librosGenero = [];
    for (let i = 0; i < library.length; i++) {
        if(library[i].genre === option){
            librosGenero.push(library[i]);
        }
        
    }

    console.log("TITULO | GENERO | PRECIO | HORAS LEIDAS")
    for (let i = 0; i < librosGenero.length; i++) {
        console.log(librosGenero[i].title + ", "+librosGenero[i].genre + ", "+librosGenero[i].price + ", "+librosGenero[i].hoursReaded);
    }
}



function showAveragePrice() {
    let acumulator = 0;
    let counter = 0;

    for (let i = 0; i < library.length; i++) {
        counter++;
        acumulator += library[i].price;
    }

    console.log("El precio medio de los libros es : "+acumulator/counter);
}

function showMostReadBook() {
    /*
    4. IMPLEMENTA LA FUNCIÓN PARA MOSTRAR EL LIBRO MÁS LEÍDO DE LA BIBLIOTECA
    */

    let mostHours = 0;
    let titleMostHours = "";

    for (let i = 0; i < library.length; i++) {
        if (library[i].hoursReaded > mostHours) {
            mostHours = library[i].hoursReaded;
            titleMostHours = library[i].title;
        }
            
    }

    console.log("El libro mas leido es: "+titleMostHours+" con "+mostHours+" horas leidas");
}

function showFinishedBooks() {
    /*
    5. IMPLEMENTA LA FUNCIÓN PARA MOSTRAR LOS LIBROS TERMINADOS
    Añade un nuevo atributo a la clase Book llamado "finished" que sea un booleano.
    Modifica el menú y el switch para añadir una nueva opción que permita mostrar los libros terminados.
    En el archivo library.js está un array de libros con el atributo "finished" añadido. Utiliza ese array para mostrar los libros terminados.
    */

    let finished = [];

    for (let i = 0; i < library.length; i++) {
        if (library[i].finished) {
            finished.push(library[i]);
        } 
    }

    console.log("LIBROS ACABADOS")
    console.log("TITULO | GENERO | PRECIO | HORAS LEIDAS")
    for (let i = 0; i < finished.length; i++) {
        console.log(finished[i].title + ", "+finished[i].genre + ", "+finished[i].price + ", "+finished[i].hoursReaded); 
    }
}



let continueLoop = true;
while (continueLoop) {
    let option = showMenu();

    switch (option) {
        case '1':
            showBooks();
            break;
        case '2':
            showBooksByGenre();
            break;
        case '3':
            showAveragePrice();
            break;
        case '4':
            showMostReadBook();
            break;
        case '5':
            showFinishedBooks();
            break;
        case '6':
        continueLoop = false;
        break;
        default:
            alert('Opción no válida');
    }
}
