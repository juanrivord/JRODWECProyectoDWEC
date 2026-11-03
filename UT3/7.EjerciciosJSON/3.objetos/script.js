let player;

fetch("objetos.json")

  .then(response => response.json())

  .then(data => { // Al ser asincrono, lo metemos aqui para que lo haga cuando haya cogido los datos y espere
    player = data;
    localStorage.setItem("objetos",JSON.stringify(player));
  })

  .catch(error => console.error('Error en el proceso:', error.message));

let datosJSON = JSON.parse(localStorage.getItem("objetos"));

console.log("Nombre: "+datosJSON.nombre);
