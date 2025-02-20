// const { start } = require("repl");

const carousel = document.querySelector(".research_list");

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

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", drag);
carousel.addEventListener("mouseup", dragStop);
