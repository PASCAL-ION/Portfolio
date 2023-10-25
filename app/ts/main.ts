const carouselContainer = document.querySelector(".workContainer__container") as HTMLElement
const dotsContainer = document.querySelector(".workContainer__dots") as HTMLElement
const closeCardBackground = document.querySelector("#workContainer__closeCardBackground") as HTMLElement;
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
      <div class="card card${i}" id=${i}>
        
        <div class="" id=${i}>
          <div class="imgAndTitle">
          <div style="background: url('${project.image}'); background-repeat: no-repeat; background-size: contain; background-position: center; position: absolute; left: 0; top: 0; width: 100%; height: 100%; border-radius: 10px;" class="img"></div>
            <h3 id="title" class="">${project.title}</h3>
          </div>
          <div class="projectSummary">
            <p id="text" class="">${project.text}</p>
          </div>
          <div id="githubLink">
              <img src="../images/github-logo.webp" alt="icone github">
              <a href="${project.githubLink}" target="_blank">Repo Github</a>
            </div>
        </div>
      </div>`;
      console.log(project.image);
      
  })
  
  /* -------------------------------CAROUSEL SCRIP-------------------------------- */    

  let cardWidth: number
  const cards = document.querySelectorAll(".card") as NodeListOf<HTMLElement>

  function cardWidthUpdate() {
    cardWidth = window.innerWidth
    useCardWidth()
  }
  cardWidthUpdate(); // Call cardWidthUpdate initially to set the initial value
  
  window.addEventListener("resize", cardWidthUpdate); //call the function on screen resizing
  
  function useCardWidth() {
    return cardWidth
  }

  //create a dot for each card and set the dot id with the card index
cards.forEach((card, cardIndex) => {
  const dot = document.createElement('li');
  dot.classList.add('dot');
  dotsContainer.appendChild(dot);
  dot.setAttribute('id', `${cardIndex}`)

  dot.addEventListener('click', () => { 
    progress(cardIndex)
  });
});


const firstDot = dotsContainer.firstElementChild
firstDot.className = "dot activeDot"


  const allDots = document.querySelectorAll(".dot")
  //on dot clicking change slide by comparing dot id and slide index
  function progress(cardIndex: number){
    let shouldExit = false
    allDots.forEach(dot => {
      const dotId = parseInt(dot.id)

      if(dotId === cardIndex){
        dot.classList.add("activeDot")
        dot.classList.remove("completed")
        changeCard(cardIndex)
        shouldExit = true
      }else if(dotId < cardIndex){
        dot.classList.add("completed")
        dot.classList.remove("activeDot")
      }else if(dotId > cardIndex){
        dot.classList.remove("activeDot")
        dot.classList.remove("completed")
      }
    });

    if (shouldExit) {
      return; // Exit the function if the flag is set
    }
  }
  
  function changeCard(dotId: number){
    carouselContainer.scrollTo({
      left: (useCardWidth() + 50) * dotId, // 50 is the gap between cards
      behavior: 'smooth'
    });
  }

  
  
  function isCardInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    
    return (
        // rect.top >= 0 &&
        rect.left >= 0 &&
        // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to get the id of the visible card
function getIdOfVisibleCard(): void {
    const allCards = document.getElementsByClassName('mobileCard');
    
    for (let i = 0; i < allCards.length; i++) {
        const currentCard = allCards[i] as HTMLElement;
        if (isCardInViewport(currentCard)) {
          uptadeDots(currentCard)
    }
}
}

function uptadeDots(currentCard: HTMLElement){
  allDots.forEach(dot => {
    if(dot.id === currentCard.id){
      dot.classList.add("activeDot")
      dot.classList.remove("completed")  
    }else if(dot.id < currentCard.id){
      dot.classList.add("completed")
      dot.classList.remove("activeDot")
    }else if(dot.id > currentCard.id){
      dot.classList.remove("activeDot")
      dot.classList.remove("completed")
    }
  })
}

carouselContainer.addEventListener('scroll', getIdOfVisibleCard)
  

/* -------------------------------CAROUSEL SCRIP END-------------------------------- */

/* -------------------------------MOBILE/DESKTOP CARD-------------------------------- */

  const closeCardBackground = document.getElementById("workContainer__closeCardBackground");
  closeCardBackground.style.display = "none";


  window.addEventListener("resize", handleScreenSize); //call the function on screen resizing
  window.addEventListener("load", handleScreenSize); //call the function on page load

  function handleScreenSize(){
    const windowWidth = window.innerWidth;
    if(windowWidth > 781){
      desktopCardScript()
    } else if (windowWidth < 780) {
      mobileCardScript()
      return
    }
  }

  function desktopCardScript(){
    cards.forEach(( card) => {
      card.addEventListener("click", cardClickHandler);
      card.className = "closedCard"
      card.querySelector("div:first-child").className = "closedCard"
    });
  }

  function mobileCardScript(){
    cards.forEach((card) => {
      card.removeEventListener("click", cardClickHandler);
      card.querySelector("div:first-child").className = "mobileCardLayout"
      card.className = "mobileCard"
      toogleShadow(card) 
    });
  }

  function toogleShadow(card: HTMLElement){
    const text = card.querySelector(".mobileCardLayout .projectSummary #text") as HTMLElement
    if(text.scrollHeight > text.clientHeight){
      text.style.boxShadow = "inset 0px -20px 10px 0px rgba(0, 0, 0, 0.3)"
      console.log(text.scrollHeight);
      
    } else  {
      text.style.boxShadow = "none"
    }
     
  }

  function cardClickHandler(event: Event) {
    const card = event.currentTarget as HTMLElement;
    card.className = "openCardByAnimating"
    const openedCardLayoutWrapper = card.querySelector("div:first-child") as HTMLElement;
    document.body.style.overflow = 'hidden'

    if (!card || !closeCardBackground) {
      console.log("!card || !closeCardBackground");
      return; // Break the function
    } else {
      openedCardLayoutWrapper.className = "desktopCardLayout"
      closeCardBackground.style.display = "block" 
      closeCardBackground.addEventListener("click", () => {
        closeCardBackgroundClickHandler(card)
        openedCardLayoutWrapper.className = "closedCard"
      })
    }
  }

  function closeCardBackgroundClickHandler(openedCardLayoutWrapper: HTMLElement){
    openedCardLayoutWrapper.className = "closedCard"
    closeCardBackground.style.display = "none"
    document.body.style.overflow = 'auto'
  }
}
).catch(err => console.log(err))

const loader = document.querySelector('.loaderContainer') as HTMLElement;
window.addEventListener("load", () => {
  loader.style.display = "none"
})
