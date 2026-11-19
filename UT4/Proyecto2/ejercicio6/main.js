// Usa la cadena «<strong>Oferta</strong>». Asígnala al primer div con textContent y al segundo con innerHTML. 
// Compara su apariencia y sus hijos.
// Guarda una referencia al enlace de #mensaje. 
// Después sustituye el contenido del párrafo con textContent y comprueba qué ocurre con el enlace.

let cadena = "<strong>Oferta</strong>";

const DOM_OUTPUT_TEXT = document.getElementById("salida-texto").textContent = cadena;
const DOM_OUTPUT_HTML = document.getElementById("salida-html").innerHTML = cadena;
const DOM_LINK = document.getElementById("mensaje").textContent = "Te sustituyo";


