const TITLE = document.getElementById("titulo");
const AUTHOR = document.getElementById("autor");
const SUMMARY = document.getElementById("resumen");
const DATE = document.getElementById("fecha");

console.log("Titulo"+
    "\n------------"+
    "\nEtiqueta: " + TITLE.tagName +
    "\nContenido: " + TITLE.textContent +
    "\nElemento: " + TITLE);

console.log("Autor"+
    "\n------------"+
    "\nEtiqueta: " + AUTHOR.tagName +
    "\nContenido: " + AUTHOR.textContent +
    "\nElemento: " + AUTHOR);


console.log("Resumen"+
    "\n------------"+
    "\nEtiqueta: " + SUMMARY.tagName +
    "\nContenido: " + SUMMARY.textContent +
    "\nElemento: " + SUMMARY);

if(DATE != null){

    console.log("Fecha"+
    "\n------------"+
    "\nEtiqueta: " + DATE.tagName +
    "\nContenido: " + DATE.textContent +
    "\nElemento: " + DATE);
    
} else{
    console.error("No se ha encontrado fecha");
}