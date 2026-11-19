// Crea un objeto producto con nombre «Mochila», descripción «Mochila de clase», precio 24.5 y un array con las tres características del HTML. 
// Actualiza la ficha con textContent. Muestra el precio con dos decimales y numera las características usando los textos del array. 
// Ejecuta dos veces la función de actualización. Comprobación: el precio es 24.50 € y cada característica conserva una sola numeración.

let producto = {
    nombre: "Mochila",
    descripcion: "Mochila de clase",
    precio: 24.50,
    caracteristicas: Array.from(document.querySelectorAll("ul li"), li => li.textContent)
}

function updateData(){

const DOM_NAME = document.querySelector(".nombre").textContent=producto.nombre;
const DOM_DESCRIPTION = document.querySelector(".descripcion").textContent=producto.descripcion;
const DOM_PRICE = document.querySelector(".precio").textContent=producto.precio.toFixed(2);
const DOM_CHARACTERISTICS = document.querySelectorAll(".caracteristicas li").forEach((li, i) => {
    DOM_CHARACTERISTICS[i].innerHTML = i + ". " + producto.caracteristicas[i];
    i++;
});
}


updateData();
updateData();
