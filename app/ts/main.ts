
const projectsContainer = document.querySelector(".workContainer__projectsContainer") as HTMLElement
const menuButton = document.querySelector('.homeContainer__menuButton') as HTMLElement;
const responsiveNav = document.querySelector(".homeContainer__responsiveNav") as HTMLElement;
const responsiveNavLinks = responsiveNav.querySelectorAll("a")
const langFR = document.querySelector('.homeContainer__language-selector .fr img') as HTMLElement
const langEN = document.querySelector('.homeContainer__language-selector .en img') as HTMLElement
const languageSelector = document.querySelector('.homeContainer__language-selector') as HTMLElement
const aboutText = document.querySelector(".aboutContainer__presentationTextContainer__text") as HTMLElement
const homeTitle = document.querySelector('.homeContainer__title-and-socialLink__title') as HTMLElement
const nameLabel = document.querySelector(".contactContainer__fullNameLabel") as HTMLElement
const subjectLabel = document.querySelector(".contactContainer__subjectLabel") as HTMLElement
const submitFormButton = document.querySelector('#submitFormButton') as HTMLElement
 

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

interface MyData {
  title: string;
  image: string;
  alt: string;
  text: string;
  githubLink: string;
  websiteLink: string;
  techStack: string[];
  about: string;
  homeTitle: string;
  navLinks: string[];
  nameLabel: string;
  subjectLabel: string;
  submitFormButton: string;
}
let jsonPath = './projectsFR.json';

langFR.style.width = "100%";
langEN.style.width = "0";

languageSelector?.addEventListener('click', switchLanguage);

function switchLanguage() {
  if (langFR.style.width == "100%") {
    langFR.style.width = "0";
    langEN.style.width = "100%";
    jsonPath = './projectsEN.json';
  } else {
    langFR.style.width = "100%";
    langEN.style.width = "0";
    jsonPath = './projectsFR.json';
  }

  loadData(jsonPath);
}


async function loadData(jsonPath) {
  try {
    let response = await fetch(jsonPath);
    let data = await response.json() as MyData[];
    aboutText.innerHTML = data[4].about
    homeTitle.innerHTML = data[4].homeTitle
    nameLabel.innerHTML = data[4].nameLabel
    subjectLabel.innerHTML = data[4].subjectLabel
    submitFormButton.innerHTML = data[4].submitFormButton
    
    data[4].navLinks.forEach((linkName, index) => {
    
      if (index < responsiveNavLinks.length) {
        const link = responsiveNavLinks[index];
    
        link.innerHTML = linkName;
      }
    });

    projectsContainer.innerHTML = '';

    data.forEach((project) => {

      projectsContainer.innerHTML += 
      `<div class="workContainer__card" data-aos="fade-up" data-aos-anchor-placement="top-center">
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
            ${project.websiteLink !== "" ?
                `<li class="workContainer__card__link"> <a href="${project.websiteLink}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>`
                :
                "Website Live Soon..."
              }
          </ul>
      </div>` 
    });

  } catch (error) {
    console.log("error : " + error);
  }
}

// Chargez initialement les données au chargement de la page
loadData(jsonPath);



const loader = document.querySelector('.loaderContainer') as HTMLElement;
window.addEventListener("load", () => {
  loader.style.display = "none"
})


