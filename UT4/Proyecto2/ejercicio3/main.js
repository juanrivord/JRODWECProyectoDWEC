const DOM_LIST = document.querySelector("#tareas");
const DOM_LIST_ELEMENTS = DOM_LIST.querySelectorAll("li");

console.log(DOM_LIST_ELEMENTS.length);

let numberList = 1;
DOM_LIST_ELEMENTS.forEach((li) => {
    console.log(numberList +" "+ li.textContent);
    numberList++;
});