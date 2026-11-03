console.log('Preparando partida...');

setTimeout(() => {
     console.log('Partida lista'); 
     console.log('Puedes seguir jugando');
    }, 3000);

const avisar = setTimeout(() => { 
    console.log("Revisa tu inventario"); 
}, 5000);

clearTimeout(avisar);