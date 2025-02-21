// const { start } = require("repl");

const wrapper = document.querySelector(".researchSlider");
const carousel = document.querySelector(".research_list");
const arrowBtn = document.querySelectorAll(".researchSlider > i");
const cardWidth = document.querySelector(".research_list > .research_item").offsetWidth;
const carouselChildren = [...carousel.children];

//getting all the cards that can fit on the screen at a time
let cardPerView = Math.round(carousel.offsetWidth / cardWidth);

//insert copies of first few cards to beginning of cards for infinite scrolling
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
})


carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
})


//Add event listener to carousel buttons to move them left or right
arrowBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -cardWidth : cardWidth;
    })
})

let isDrag = false, startX, startScrollLeft;

const dragStart = (e) => {
    isDrag = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const drag = (e) => {
    if (!isDrag) return;
        carousel.scrollLeft = e.pageX;
    
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDrag = false;
    carousel.classList.remove("draggin");
}

const autoPlay = () => {
    timeoutId = setTimeout(() => carousel.scrollLeft += cardWidth, 500);
}
autoPlay();

const infiniteScroll = () => {
    //if carousel at beginning, scroll to end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }   
    // if carousel at end, scroll to beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);

}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", drag);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll)