const DOM_P = document.querySelector("#aviso");

function mostrarResultado(res){

    DOM_P.classList.toggle("oculto");
    DOM_P.style.fontSize = "20px";

    if(res === "correcto"){
        DOM_P.textContent = "correcto";
        DOM_P.classList.add("correcto");
    }

    if(res === "error"){
        DOM_P.textContent = "error";
        DOM_P.classList.add("error");
    }

}

mostrarResultado("correcto");

console.log("Color calculado: " + getComputedStyle(DOM_P).backgroundColor);
console.log("Tiene la clase correcto: " + DOM_P.classList.contains("correcto"));
console.log("Tiene la clase error: " + DOM_P.classList.contains("error"));