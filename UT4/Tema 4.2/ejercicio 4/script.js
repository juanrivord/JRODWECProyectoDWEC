// Selecciona únicamente el enlace destacado. 
// Desde él, obtén su li con parentElement y su section con closest().
// Localiza los li anterior y siguiente mediante navegación y muestra sus textos con trim().
// Comprueba con matches() si el li actual tiene la clase actual.
const highlightedLink = document.querySelector(".destacado");
const linkLi = highlightedLink.parentElement;
const linkSection = highlightedLink.closest("section");
const priorLi = linkLi.previousElementSibling;
const postLi = linkLi.nextElementSibling;

console.log("Li anterior: " + priorLi.textContent.trim());
console.log("Li siguiente: " + postLi.textContent.trim());


console.log("¿El Li actual tiene la clase actual? -> " + linkLi.matches(".actual"))

console.log("children DE SECTION: "+
    "\n--------------------")
console.log(linkSection.children);

console.log("childNodes DE SECTION: "+
    "\n--------------------")
console.log(linkSection.childNodes);

console.log("previusElementSibling del primer Li -> " + priorLi.previousElementSibling);