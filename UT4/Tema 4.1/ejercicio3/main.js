const DOM_LIST = document.querySelector("#tareas");
const DOM_LIST_ELEMENTS = DOM_LIST.querySelectorAll("li");
const DOM_LIST_ELEMENTS_HURRY = DOM_LIST.querySelectorAll("li.urgente");
const DOM_LIST_ELEMENTS_FINISHED = DOM_LIST.querySelectorAll("li.finalizada");

console.log("Numero de tareas: " + DOM_LIST_ELEMENTS.length);

let numberList = 1;
DOM_LIST_ELEMENTS.forEach((li) => {
    console.log(numberList +" "+ li.textContent);
    numberList++;
});

console.log("Tareas urgentes: " + DOM_LIST_ELEMENTS_HURRY.length);

console.log("Tareas finalizadas: " + DOM_LIST_ELEMENTS_FINISHED.length);