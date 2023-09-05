/* const windowWidth = window.innerWidth;
const slides = document.querySelectorAll(".slide") as NodeListOf<HTMLElement>

closeCardBackground.addEventListener("click", closeCard);

if(windowWidth > 768){
    slides.forEach((slide) => {
        slide.addEventListener("click", openCard(slide))
    });
}

function openCard(slide) {
        document.body.style.overflow = "hidden" //stop the page scroll
        closeCardBackground.style.display = "block"
        slide.classList.add("growCard");
        if (slide.classList.contains("growCard")) {
            slide.querySelector(".card").classList.remove("card");
        }
        const card = slide.querySelector("div");
        card.classList.add("desktopCard");
        slide.removeEventListener("click", slideClickHandler);
}

    function closeCard(){
        const actuelOpenCard = document.querySelector(".growCard") as HTMLElement
        actuelOpenCard.classList.remove("growCard")
        actuelOpenCard.querySelector("div:first-child").classList.remove("desktopCard")
        actuelOpenCard.querySelector("div:first-child").classList.add("card")
        closeCardBackground.style.display = "none"
        document.body.style.overflow = "scroll" //allow the page scroll
      } */