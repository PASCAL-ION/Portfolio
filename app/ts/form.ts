/* const formInputs: HTMLInputElement[] = Array.from(document.querySelectorAll('#contact-form input')); //array.form convert the node list into an array 

formInputs.forEach(input => {
    const associatedLabel = document.querySelector(`label[for=${input.id}]`) as HTMLLabelElement;

    
    input.addEventListener("focus", () => {
        associatedLabel.classList.add("moove")
    })
    if(input !== document.activeElement && input.value === ""){
        console.log("test " + input.name);
        
        associatedLabel.className = ""
    }
}) */

/* if(input === document.activeElement || input.value !== ""){
    console.log("input vide");
    associatedLabel.className = "moove"
} */