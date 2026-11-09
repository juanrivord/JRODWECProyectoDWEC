const BUTTON = document.querySelector("#add");
const QUANTITY = document.querySelector("#quantity");
const STATUS_PROMPT = document.querySelector("#status");

async function updateQuantity(myMethod){

}




BUTTON.addEventListener("click", async () =>{
    const TOTAL = Number(QUANTITY.textContent) + 1;
    QUANTITY.textContent = TOTAL;

    try {
        
    } catch (error) {
        STATUS_PROMPT.textContent = error.message;
    }
})