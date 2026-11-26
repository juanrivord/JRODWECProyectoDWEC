const DOM_LIST = document.querySelector("#pendientes");
const deliverLi = document.querySelector("#entregar");
const readLi = document.querySelector("#leer");
const newLi = document.createElement("li");

newLi.textContent = "Probar el código";

deliverLi.before(newLi);

readLi.remove();