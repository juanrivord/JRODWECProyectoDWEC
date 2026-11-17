const DOM_LIST = document.querySelector("#recursos");
const DOM_LIST_RESOURCES = DOM_LIST.querySelectorAll("a");

console.log("Numero de elementos: " + DOM_LIST_RESOURCES.length);

const textos = Array.from(DOM_LIST_RESOURCES, h => h.textContent.trim());

console.log(textos);

const textosFiltrados = Array.from(DOM_LIST_RESOURCES, h =>{ if(h.textContent.toLowerCase().includes('guía')) return h.textContent.trim();});

console.log(textosFiltrados);