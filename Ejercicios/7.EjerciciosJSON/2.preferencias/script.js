let player;

fetch("preferencias.json")

  .then(response => response.json())

  .then(data => { // Al ser asincrono, lo metemos aqui para que lo haga cuando haya cogido los datos y espere
    player = data;
    localStorage.setItem("preferencias",JSON.stringify(player));
  })

  .catch(error => console.error('Error en el proceso:', error.message));

let datosJSON = JSON.parse(localStorage.getItem("preferencias"))

console.log("Datos extraidos:" 
  + "\nnombre: "+datosJSON.usuario
  + "\nsonido: "+datosJSON.sonido
  + "\nvolumen: "+datosJSON.volumen
  + "\nodiomas: "+datosJSON.idiomas
  + "\nfavoritos: "+datosJSON.favoritos
);