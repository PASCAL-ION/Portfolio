const mobileMenu = document.querySelector(".profileView__wrapper__menuIcon")
const line1Icon = document.querySelector(".profileView__wrapper__menuIcon .line-1")
const line2Icon = document.querySelector(".profileView__wrapper__menuIcon .line-2")
const line3Icon = document.querySelector(".profileView__wrapper__menuIcon .line-3")
const navbar = document.querySelector(".profileView__wrapper__navbar")

//Mobile navigation menu animation
function toggleMenu(){
    mobileMenu.classList.toggle("open")
    if(mobileMenu.classList.contains("open")){
        line1Icon.style.animationName = "line1Animation"
        line2Icon.style.animationName = "line2Animation"
        line3Icon.style.animationName = "line3Animation"
        navbar.style.animationName = "navbarExpand"
        navbar.firstElementChild.style.display = "block"

    } else if (!mobileMenu.classList.contains("open")){
        line1Icon.style.animationName = "line1AnimationBack"
        line2Icon.style.animationName = "line2AnimationBack"
        line3Icon.style.animationName = "line3AnimationBack"
        navbar.style.animationName = "navbarExpandBack"
        navbar.firstElementChild.style.display = "none"

    }
}
