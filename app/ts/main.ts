const proectsContainer = document.querySelector(".workContainer__projectsContainer") as HTMLElement
const menuButton = document.querySelector('.homeContainer__menuButton') as HTMLElement;
const responsiveNav = document.querySelector(".homeContainer__responsiveNav") as HTMLElement;
const responsiveNavLinks = responsiveNav.querySelectorAll("a")

/* -------------------------------NAV-------------------------------- */    
    responsiveNavLinks.forEach((link) => {
        link.addEventListener("click", closeNavOnLinkClick)
      })
      
      function closeNavOnLinkClick(){
        responsiveNav.classList.remove("open")
        menuButton.classList.add("menuClosed")
        menuButton.classList.remove("menuOpen")
      }
      
      //animate button
      menuButton?.addEventListener("click", () => {
        
        if(menuButton.classList.contains("menuOpen")){
          menuButton.classList.remove("menuOpen")
          menuButton.classList.add("menuClosed")
      
        } else if(menuButton.classList.contains("menuClosed")){
          menuButton.classList.remove("menuClosed")
          menuButton.classList.add("menuOpen")
        }
      });
      
      //open the menu
      menuButton?.addEventListener('click', () => {
        responsiveNav.classList.toggle("open")
      });
/* -------------------------------NAV END-------------------------------- */    


const jsonPath = './projects.json'

interface MyData {
  title: string;
  image: string;
  alt: string;
  text: string;
  githubLink: string;
  websiteLink: string;
  techStack: string[];
}


async function getData(){
  let response = await fetch(jsonPath);
  let data = await response.json() as MyData[];
  return data
}

getData()
.then( data => {
  data.forEach((project) => {
    //create the dom elements
    proectsContainer.innerHTML += 
    `<div class="workContainer__card">
      <div class="workContainer__card__imageContainer">
        <img src="${project.image}" alt="${project.alt}" class="workContainer__card__imageContainer__image">
      </div>
      <div class="workContainer__card__content">
        <h2 class="workContainer__card__title">${project.title}</h2>
        <span class="workContainer__card__separator"></span>
        <p class="workContainer__card__projectSummary">${project.text}</p>
      </div>
      <div class="workContainer__card__footer">
        <ul class="workContainer__card__techsContainer">
        ${project.techStack.map(tech => (
          `<li class="workContainer__card__tech">${tech}</li>`
        )).join('')}
        </ul>
        <ul class="workContainer__card__projectLinksContainer">
          <li class="workContainer__card__link"> <a href="${project.githubLink}" target="_blank"><i class="fa-brands fa-github"></i></a></li>
        </ul>
    </div>` 
  })

    // Link to live demo, to do :
  // <ul class="workContainer__card__projectLinksContainer">
  //   ${project.websiteLink !== "" ?
  //     `<li class="workContainer__card__link"> <a href="${project.websiteLink}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>`
  //     :
  //     ""
  //   }
  // </ul>
  
}
).catch(err => console.log(err))

const loader = document.querySelector('.loaderContainer') as HTMLElement;
window.addEventListener("load", () => {
  loader.style.display = "none"
})
