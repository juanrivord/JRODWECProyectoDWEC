let personaje = null;

fetch("./personaje.json")
  .then(response => response.json())

  // 3. Bloque para asignar y usar los datos
  .then(data => {
    localStorage.setItem("personaje",JSON.stringify(data));
  })

  personaje = JSON.parse(localStorage.getItem("personaje"));

  console.log("Vida: "+personaje.estadisticas.vida);

  console.log("Zona: "+personaje.posicion.zona);

  personaje.estadisticas.vida-=20;

  personaje.estadisticas.posicion.x+=5;

  personaje.inventario.push("escudo");

  localStorage.setItem("practica_personaje",JSON.stringify(personaje));