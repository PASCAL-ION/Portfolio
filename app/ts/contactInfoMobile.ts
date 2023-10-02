const contactInfoButton = document.querySelector('.contactContainer__contactInformationsButton') as HTMLElement;
const contactInfo = document.querySelector('.contactContainer__contactInformations') as HTMLElement;

contactInfoButton.addEventListener('click', slideUp)

function slideUp(){
    console.log("click"); 
    contactInfo.classList.toggle("open")
}