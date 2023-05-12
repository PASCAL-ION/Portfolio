const button = document.querySelector('.responsiveMenuButton');
const responsiveNav = document.querySelector(".responsiveNav") as HTMLElement;



button?.addEventListener('click', () => { // Vérifie que le bouton existe avant d'ajouter l'écouteur d'événement
  responsiveNav.classList.toggle("open")

});