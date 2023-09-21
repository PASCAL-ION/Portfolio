// import { languageChange } from './language-change';

const responsiveMenuButton = document.querySelector('.homeContainer__responsiveMenuButton');
const responsiveNav = document.querySelector(".homeContainer__responsiveNav") as HTMLElement;
const projectImage = document.querySelector("#image") as HTMLImageElement;
const projectTitle = document.querySelector("#title") as HTMLElement;
const projectText = document.querySelector("#text") as HTMLElement;
const projectGithubLink = document.querySelector("#githubLink") as HTMLElement;
const carouselContainer = document.querySelector(".workContainer__container") as HTMLElement
const dotsContainer = document.querySelector(".workContainer__dots") as HTMLElement
const progressBar = document.querySelector(".workContainer__dots .workContainer__progress") as HTMLElement
const progressionPercentage = document.querySelector(".workContainer__dots .workContainer__percent") as HTMLElement
const closeCardBackground = document.querySelector("#workContainer__closeCardBackground") as HTMLElement;




const jsonPath = './projectsFR.json'

responsiveMenuButton?.addEventListener('click', () => { // Vérifie que le bouton existe avant d'ajouter l'écouteur d'événement
  responsiveNav.classList.toggle("open")
});

interface MyData {
  title: string;
  image: string;
  alt: string;
  text: string;
  githubLink: string;
}


async function getData(){
  let response = await fetch(jsonPath);
  let data = await response.json() as MyData[];
  return data
}

getData()
.then( data => {
  data.forEach((project, i) => {
    //create the dom elements
    carouselContainer.innerHTML += ` 
        <div class="slide">
          <div class="mobileCard" id=${i}>
            <img src=${project.image} alt=${project.alt} id="image">
            <div class="projectSummary">
              <h1 id="title" class="translatable">${project.title}</h1>
              <p id="text" class="translatable">${project.text}</p>
              <div id="githubLink">
                <img src="../images/github-logo.png" alt="">
                <a href="https://www.google.fr/" class="translatable">Github repository</a>
              </div>
            </div>
          </div>
        </div>`;
  })
  const slide = document.querySelector(".slide") as HTMLElement //select just one slide and use its width to calculate the carousel width (all slides have the same width)
  const slides = document.querySelectorAll(".slide") as NodeListOf<HTMLElement>
  const slideWidth = slide.offsetWidth
  const carouselWidth: number = slides.length * slideWidth;

  
  window.addEventListener("resize", handleScreenSize); //call the function on screen resizing
  window.addEventListener("load", handleScreenSize); //call the function on page load

  function handleScreenSize(){
    const windowWidth = window.innerWidth;

    if(windowWidth > 768){
      addClickHandlerToCard()
    } else if (windowWidth < 768) {
      removeClickHandlerFromCard()
      return
    }
  }

  function addClickHandlerToCard(){
    slides.forEach((slide) => {
      slide.addEventListener("click", cardClickHandler);
    });
  }

  function removeClickHandlerFromCard(){
    slides.forEach((slide) => {
      slide.removeEventListener("click", cardClickHandler);
    });
  }

  function cardClickHandler(event: Event) {
    const slide = event.currentTarget as HTMLElement;
    const cardSelector = ".mobileCard";
    const closeCardBackground = document.getElementById("workContainer__closeCardBackground");
    
    if (!slide || !closeCardBackground) {
      return; // Break the function
    }
  
    document.body.style.overflow = "hidden";
    closeCardBackground.style.display = "block";
  
    function slideOpenAndTransformToDesktop() {
      slide.classList.add("slideOpen");
      const card = slide.querySelector(cardSelector) as HTMLElement;
      if (card) {
        card.classList.add("desktopCard");
      }
    }
    function removeHoverEffect() {
      const card = slide.querySelector(cardSelector) as HTMLElement;
      if (card) {
        card.classList.remove("mobileCard");
      }
    }
    slideOpenAndTransformToDesktop();
    removeHoverEffect();
  }

  if(closeCardBackground){
    closeCardBackground.addEventListener("click", closeCard);
  }else{
    console.log("closeCardBackground not found");
    
  }
  
function closeCard() {
  const actuelOpenCard = document.querySelector(".slideOpen") as HTMLElement;

  if(actuelOpenCard){
    const cardContent = actuelOpenCard.querySelector("div:first-child") as HTMLElement;

    actuelOpenCard.classList.remove("slideOpen");
    cardContent.classList.remove("desktopCard");
    cardContent.classList.add("mobileCard");
  }
  
  closeCardBackground.style.display = "none";
  document.body.style.overflow = "scroll"; // Allow the page scroll
}










  slides.forEach((slide, index) => {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dotsContainer.appendChild(dot);
    dot.setAttribute('id', `${index}`)
    
    dot.addEventListener('click', () => { 
      progress(index)
    });
  });

  //modify the way of animating the points to be able to change the slides
  //remove the class "activeStep" if the dot is not actually clicked but keep the color of the dot 
  
  const allDots = document.querySelectorAll(".dot")
  function progress(dotId: number){    
    /* let p = dotId * 25
    progressionPercentage.style.width = `${p}%`; */

    allDots.forEach(element => {
      const elementId = parseInt(element.id)
      if(elementId === dotId){
        element.classList.add("activeStep")
        element.classList.remove("completed")
        changeSlide(dotId)
      }
      if(elementId < dotId){
        element.classList.add("completed")
        element.classList.remove("activeStep")

      }
      if(elementId > dotId){
        element.classList.remove("activeStep")
        element.classList.remove("completed")
      }
    });
  }

  function changeSlide(dotId: number){
    carouselContainer.scrollTo({
      left: 375 * dotId, // Position horizontale souhaitée
      behavior: 'smooth' // Animation fluide du défilement
    });

  }
  carouselContainer.addEventListener('scroll', () => {
    const scrollLeft = carouselContainer.scrollLeft;
    // console.log("ScrollLeft : ", scrollLeft);
    
    const slideWidth = carouselContainer.clientWidth;
    const currentSlideIndex = Math.round(scrollLeft / slideWidth);
    
    updateProgress(currentSlideIndex);
  });
  
  function updateProgress(currentSlideIndex: number) {
    allDots.forEach((dot, index) => {
      dot.classList.toggle("activeStep", index === currentSlideIndex);
      dot.classList.toggle("completed", index < currentSlideIndex);
    });
    const progressWidth = (currentSlideIndex +1) * slideWidth;
    // console.log("progressWidth : ", progressWidth);
    progressionPercentage.style.width = `${(progressWidth / carouselWidth) * 100}%`;
    // console.log("progressionPercentage : ", progressionPercentage.style.width = `${(progressWidth / carouselWidth) * 100}%`);
  }
} 


).catch(err => console.log(err))


// export {getData};