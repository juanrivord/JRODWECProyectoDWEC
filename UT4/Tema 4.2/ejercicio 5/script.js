// Añade un tercer curso. Muestra el nivel como texto en cada ficha y conserva el dato en dataset.
// Crea un array con los cursos que tienen plazas y pásalo a renderizarCursos(). 
// Selecciona un botón, localiza su ficha con closest() y lee su nivel.
// Cambia el aspecto de .completo en style.css.
// Comprueba que alternar entre el catálogo completo y el filtrado mantiene una ficha por curso.
const cursos = [
    { titulo: "Curso DOM", plazas: 0, nivel: "intermedio" },
    { titulo: "Curso CSS", plazas: 5, nivel: "inicial" },
    { titulo: "Curso HTML", plazas: 3, nivel: "inicial" }
];

function crearFicha(curso) {
    const ficha = document.createElement("article");
    ficha.classList.add("curso");
    ficha.dataset.nivel = curso.nivel;

    const titulo = document.createElement("h2");
    titulo.textContent = curso.titulo;

    const estado = document.createElement("p");
    const completo = curso.plazas === 0;
    estado.textContent = completo ? "Curso completo" : "Plazas disponibles: " + curso.plazas; 
    ficha.classList.toggle("completo", completo); 

    const nivel = document.createElement("p");
    nivel.textContent = "Dificultad: "+ curso.nivel;

    const boton = document.createElement("button"); 
    boton.type = "button"; boton.textContent = "Inscribirme"; 
    boton.disabled = completo; 

    ficha.append(titulo, estado, nivel, boton); 
    return ficha;
}

function renderizarCursos(cursos) {
    const catalogo = document.querySelector("#catalogo"); 
    const aviso = document.querySelector("#sin-cursos");

    catalogo.replaceChildren(); 

        for (const curso of cursos) {
            catalogo.append(crearFicha(curso)); 
        } 

    aviso.hidden = cursos.length > 0; 
}



renderizarCursos(cursos);
console.log(document.querySelectorAll(".curso").length);

// renderizarCursos([]);
 // 0 fichas y aviso visible 