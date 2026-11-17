// Crea un objeto producto con nombre «Mochila», descripción «Mochila de clase», precio 24.5 y un array con las tres características del HTML. 
// Actualiza la ficha con textContent. Muestra el precio con dos decimales y numera las características usando los textos del array. 
// Ejecuta dos veces la función de actualización. Comprobación: el precio es 24.50 € y cada característica conserva una sola numeración.

let producto = {
    nombre: "Mochila",
    descripcion: "Mochila de clase",
    precio: 24.50,
    caracteristicas: Array.from(document.querySelectorAll("ul li"), li => li.textContent)
}

const DOM_NAME = document.querySelector(".nombre");
DOM_NAME.innerHTML=producto.nombre;

const DOM_DESCRIPTION = document.querySelector(".descripcion");
DOM_DESCRIPTION.innerHTML=producto.descripcion;

const DOM_PRICE = document.querySelector(".precio");
DOM_PRICE.innerHTML=producto.precio.toFixed(2);

const DOM_CHARACTERISTICS = document.querySelectorAll(".caracteristicas li");

let i = 0;
DOM_CHARACTERISTICS.forEach((li) => {
    DOM_CHARACTERISTICS[i].innerHTML = i + ". " + producto.caracteristicas[i];
    i++;
});
