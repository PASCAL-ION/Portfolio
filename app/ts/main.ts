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

const jsonPath = './projects.json'

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
          <div class="card">
            <img src=${project.image} alt=${project.alt} id="image">
            <div class="projectSummary">
              <h1 id="title">${project.title}</h1>
              <p id="text">${project.text}</p>
              <div id="githubLink">
                <img src="../images/github-logo.png" alt="">
                <a href="">Project Github</a>
              </div>
            </div>
          </div>
        </div>`;
      })
  
  const slides = document.querySelectorAll(".slide") as NodeListOf<HTMLElement>

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

  function progress(dotId: number){    
    let p = dotId * 25
    progressionPercentage.style.width = `${p}%`;
    const allDots = document.querySelectorAll(".dot")

    allDots.forEach(element => {
      const elementId = parseInt(element.id)
      if(elementId == dotId){
        
        element.classList.add("activeStep")
      }
      if(elementId < dotId){
        element.classList.add("activeStep")
      }
      if(elementId > dotId){
        element.classList.remove("activeStep")
      }
    });
    
  }
  
} 
).catch(err => console.log(err))
