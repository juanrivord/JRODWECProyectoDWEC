console.log("Idioma principal: "+navigator.language);

console.log("Idiomas preferidos: "+navigator.languages);

console.log(navigator.onLine ? "Hay conexión" : "Sin conexión");

console.log(navigator.cookieEnabled ? "Cookies habilitadas" : "Cookies no habilitadas");

console.log("URL: "+location.href);

console.log("Protocolo: "+location.protocol);
console.log("Host: "+location.hostname);
console.log("Puerto: "+location.port);
console.log("Path: "+location.pathname);

// location.href = "https://github.com/juanrivord?tab=repositories";

// history.back();

// history.forward();

// history.go(-2)

console.log(history.length); // numero de historial

console.log("Ancho de pantalla: "+screen.width+"px");
console.log("Alto de pantalla: "+screen.height+"px");
console.log("Ancho de pantalla disponible: "+screen.availWidth+"px");
console.log("Alto de pantalla disponible: "+screen.availHeight+"px");

console.log(`Resolución: ${screen.width} x ${screen.height}`);

