class Producto{
    constructor(nombre,precio,stock){
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}
    
let teclado = new Producto("Teclado",29.99,15);
let raton = new Producto("Ratón",14.50,30);

console.log("Producto 1: "+"Nombre: "+teclado.nombre+" Precio: "+teclado.precio);
console.log("Producto 2: "+"Nombre: "+raton.nombre+" Precio: "+raton.precio);

console.log("Stock total: "+(raton.stock+teclado.stock));