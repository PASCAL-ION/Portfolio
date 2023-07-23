// import { languageChange } from './language-change';

const button = document.querySelector('.responsiveMenuButton');
const responsiveNav = document.querySelector(".responsiveNav") as HTMLElement;
const projectImage = document.querySelector("#image") as HTMLImageElement;
const projectTitle = document.querySelector("#title") as HTMLElement;
const projectText = document.querySelector("#text") as HTMLElement;
const projectGithubLink = document.querySelector("#githubLink") as HTMLElement;
const carouselContainer = document.querySelector(".container") as HTMLElement
const dotsContainer = document.querySelector(".dots") as HTMLElement
const progressBar = document.querySelector(".dots .progress") as HTMLElement
const progressionPercentage = document.querySelector(".dots .percent") as HTMLElement



const jsonPath = './projectsFR.json'

button?.addEventListener('click', () => { // Vérifie que le bouton existe avant d'ajouter l'écouteur d'événement
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
          <div class="card" id=${i}>
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

  /* function changeLanguage(){
    
  } */

  function handleScreenSize(){

    const windowWidth = window.innerWidth;

    if(windowWidth > 768){
      slides.forEach((slide) => {
        slide.addEventListener("click", slideClickHandler(slide));
      });

      const closeCardBackground = document.querySelector("#closeCardBackground") as HTMLElement
      closeCardBackground.addEventListener("click", closeCard);

      function slideClickHandler(slide) {
        return function () {
          document.body.style.overflow = "hidden" //stop the page scroll
          closeCardBackground.style.display = "block"
          
          slide.classList.add("growCard");
          if (slide.classList.contains("growCard")) {
            slide.querySelector(".card").classList.remove("card");
          }
          const card = slide.querySelector("div");
          card.classList.add(/* "no-hover",  */"desktopCard");
          
          slide.removeEventListener("click", slideClickHandler);
        };
      }

      function closeCard(){
        const actuelOpenCard = document.querySelector(".growCard") as HTMLElement
        actuelOpenCard.classList.remove("growCard")
        actuelOpenCard.querySelector("div:first-child").classList.remove(/* "no-hover",  */"desktopCard")
        actuelOpenCard.querySelector("div:first-child").classList.add("card")
        closeCardBackground.style.display = "none"
        document.body.style.overflow = "scroll" //allow the page scroll
      }
      
      
    }
  }
window.addEventListener("resize", handleScreenSize); //call the function on screen resizing
window.addEventListener("load", handleScreenSize); //call the function on page load


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
    console.log("ScrollLeft : ", scrollLeft);
    
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
    console.log("progressWidth : ", progressWidth);
    progressionPercentage.style.width = `${(progressWidth / carouselWidth) * 100}%`;
    console.log("progressionPercentage : ", progressionPercentage.style.width = `${(progressWidth / carouselWidth) * 100}%`);
  }
} 


).catch(err => console.log(err))
