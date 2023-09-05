const sections = Array.from(document.querySelectorAll(".snap-section"));
const snapContainer = document.querySelector(".snap-container")

snapContainer.addEventListener("wheel", (e: WheelEvent) => {
    //find the curent visible section on the screen
    const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect(); //get the position of the top and bottom section relative to the window
        return rect.top <= 0 && rect.bottom >= 0
    })

    // find next and previous section comparend to the current section
    const nextSection = currentSection.nextElementSibling as HTMLElement;
    const prevSection = currentSection.previousElementSibling as HTMLElement;

    // if the user scrolls down and a next Section exist
    if (e.deltaY > 0 && nextSection) {
        // scroll down 
        nextSection.scrollIntoView({ behavior: "smooth" });
    } 
    // if the user scrolls up and a prev Section exist
    else if (e.deltaY < 0 && prevSection) {
        // scroll up
        prevSection.scrollIntoView({ behavior: "smooth" });
    }
})