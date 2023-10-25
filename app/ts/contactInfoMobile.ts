const contactInfoButton = document.querySelector('.contactContainer__contactInformationsButton') as HTMLElement;
const contactInfoButtonChevron = document.querySelector('.contactContainer__contactInformationsButton .chevron') as HTMLElement;
const contactInfo = document.querySelector('.contactContainer__contactInformations') as HTMLElement;


contactInfoButton.addEventListener('click', slideUp)

function slideUp(){
    contactInfoButtonChevron.classList.toggle("rotate")
    contactInfo.classList.toggle("open")
}