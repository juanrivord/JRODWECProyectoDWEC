const player ={
  nombre: "Alex",
  nivel: 3,
  activo: true
};

console.log("TEXTO ANTES DE CONVERTIR:");
console.log("---------------------------");

console.log("Nombre: " + player.nombre + " - Nivel: " + player.nivel);
console.log("Tipo de nivel: "+typeof player.nivel);
console.log("Tipo de activo: "+typeof player.activo);

player.nivel+=1;


console.log("TEXTO DESPUES DE CONVERTIR:");
console.log("---------------------------");
const texto = JSON.stringify(player);
console.log(texto);