// const sections = document.querySelectorAll('.snap-scroll-section'); //select all the sections
// let currentSection = 0;

// window.addEventListener('wheel', (e) => { // add a scroll event listener
//     //if user scroll up/down and a section exist, go to that section
//     if (e.deltaY > 0 && currentSection < sections.length - 1) {
//         currentSection++;
//     } else if (e.deltaY < 0 && currentSection > 0) {
//         currentSection--;
//     }
//     scrollToSection(currentSection);
// });

// // takes as parameter the index of the section you want to display, then use scrollIntoView
// function scrollToSection(sectionIndex: number) {
//     sections[sectionIndex].scrollIntoView({
//         behavior: 'smooth'
//     });
// }