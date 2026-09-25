if(confirm("¿Es moises un larper?")) // Pregunta al usuario
    {
        console.log("Si, es un larper (mensaje para juan)"); // Mensaje en consola
        let confirmacion = alert("Si, es un larper"); // Mensaje en ventana emergente
        console.log(typeof confirmacion);
    } else{
        let respuesta = prompt("Entonces, ¿Que es moises?"); // Pregunta al usuario esperando una respuesta (devuelve un string)
        console.log(typeof respuesta);
    }