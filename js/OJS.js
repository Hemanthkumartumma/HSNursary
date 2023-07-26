document.addEventListener('DOMContentLoaded', () => {
    const aboutLink = document.querySelector('a[href="#about"]');

    aboutLink.addEventListener('click', (event) => {
      event.preventDefault();
      const aboutSection = document.getElementById('about');
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
  // Smooth scrolling to the target section
  document.addEventListener('DOMContentLoaded', () => {
    const aboutLink = document.querySelector('a[href="#home"]');

    aboutLink.addEventListener('click', (event) => {
      event.preventDefault();
      const aboutSection = document.getElementById('home');
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

const wrap = document.querySelector(".wrap");
const wrapbox = document.querySelector(".wrapbox");
const firstCardWidth = wrapbox.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrap i");
const wrapboxChildrens = [...wrapbox.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
// Get the number of cards that can fit in the wrapbox at once
let cardPerView = Math.round(wrapbox.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of wrapbox for infinite scrolling
wrapboxChildrens.slice(-cardPerView).reverse().forEach(card => {
    wrapbox.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of wrapbox for infinite scrolling
wrapboxChildrens.slice(0, cardPerView).forEach(card => {
    wrapbox.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the wrapbox at appropriate postition to hide first few duplicate cards on Firefox
wrapbox.classList.add("no-transition");
wrapbox.scrollLeft = wrapbox.offsetWidth;
wrapbox.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the wrapbox left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        wrapbox.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    wrapbox.classList.add("dragging");
    // Records the initial cursor and scroll position of the wrapbox
    startX = e.pageX;
    startScrollLeft = wrapbox.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the wrapbox based on the cursor movement
    wrapbox.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    wrapbox.classList.remove("dragging");
}


const infiniteScroll = () => {
    // If the wrapbox is at the beginning, scroll to the end
    if(wrapbox.scrollLeft === 0) {
        wrapbox.classList.add("no-transition");
        wrapbox.scrollLeft = wrapbox.scrollWidth - (2 * wrapbox.offsetWidth);
        wrapbox.classList.remove("no-transition");
    }
    // If the wrapbox is at the end, scroll to the beginning
    else if(Math.ceil(wrapbox.scrollLeft) === wrapbox.scrollWidth - wrapbox.offsetWidth) {
        wrapbox.classList.add("no-transition");
        wrapbox.scrollLeft = wrapbox.offsetWidth;
        wrapbox.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over wrapbox
    clearTimeout(timeoutId);
    if(!wrap.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the wrapbox after every 2500 ms
    timeoutId = setTimeout(() => wrapbox.scrollLeft += firstCardWidth, 2500);
}
autoPlay();
wrapbox.addEventListener("mousedown", dragStart);
wrapbox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
wrapbox.addEventListener("scroll", infiniteScroll);
wrap.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrap.addEventListener("mouseleave", autoPlay);