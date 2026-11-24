const DOM_PHOTO = document.querySelector("#foto");
const DOM_DESTINY = document.querySelector("#destino");
const DOM_DESTINY_INFO = document.querySelector("#informacion");

foto.src = "img/playa.jfif";
foto.alt = "Foto de una playa";

DOM_DESTINY_INFO.removeAttribute("title");

let destinyPrice = Number(DOM_DESTINY.dataset.precio);

console.log("Precio para dos personas: " + (destinyPrice*2) + "€");

DOM_DESTINY.dataset.destinyType = "playa";
DOM_DESTINY.querySelector("#reserva").disabled = false;