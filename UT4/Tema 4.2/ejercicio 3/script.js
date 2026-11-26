const deliverLi = document.querySelector("#entregar");
const readLi = document.querySelector("#leer");

let newLi = document.createElement("li");

newLi.textContent = "Probar el código";

deliverLi.before(newLi);

readLi.remove();