const DOM_LIST = document.querySelector("#recursos");
const DOM_LIST_RESOURCES = DOM_LIST.querySelectorAll("a");

console.log("Numero de elementos: " + DOM_LIST_RESOURCES.length);

let textos = [];
let i = 0;
DOM_LIST_RESOURCES.forEach((a) => {
    textos[i]=a.textContent.trim();
    i++;
});

console.log("Contenido de cada <a>: ");
console.log(textos);


let textosFiltrados = [];
DOM_LIST_RESOURCES.forEach((a) => {

    if(textosFiltrados[i]=a.textContent.toLowerCase().includes('guía')){
        textosFiltrados[i]=a.textContent.trim();
    }
    i++;

});

console.log("Contenido de cada <a> que contiene la palabra -guía-: ");
console.log(textosFiltrados);