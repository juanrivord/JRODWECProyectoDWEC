const DOM_CULTURE = document.getElementById("cultura");
const DOM_CULTURE_FIRST_P = DOM_CULTURE.querySelector("p");
const DOM_CULTURE_LINK = DOM_CULTURE.querySelector(".destacado");

const DOM_CULTURE_IMPORTANT_SUMMARY = DOM_CULTURE.querySelector(".resumen.importante");
const DOM_CULTURE_IMPORTANT_SUMMARY2 = DOM_CULTURE.querySelector(".resumen .importante");

console.log("Elemento DOM cultura: " + DOM_CULTURE.textContent);

console.log("Primer <p>: " + DOM_CULTURE_FIRST_P.textContent);

console.log("Enlace destacado: " + DOM_CULTURE_LINK.textContent);

console.log("Resumen importante: " + DOM_CULTURE_IMPORTANT_SUMMARY.textContent);

console.log(DOM_CULTURE_IMPORTANT_SUMMARY2);