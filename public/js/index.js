const wrapper = document.querySelector(".researchSlider");
const carousel = document.querySelector(".research_list");
const arrowBtn = document.querySelectorAll(".researchSlider > i");
const cardWidth = document.querySelector(
  ".research_list > .research_item"
).offsetWidth;
const carouselChildren = [...carousel.children];

//getting all the cards that can fit on the screen at a time
let cardPerView = Math.round(carousel.offsetWidth / cardWidth);

//insert copies of first few cards to beginning of cards for infinite scrolling
carouselChildren
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildren.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

//Add event listener to carousel buttons to move them left or right
arrowBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -cardWidth : cardWidth;
  });
});

let isDrag = false,
  startX,
  startScrollLeft;

const dragStart = (e) => {
  isDrag = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const drag = (e) => {
  if (!isDrag) return;
  carousel.scrollLeft = e.pageX;

  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDrag = false;
  carousel.classList.remove("draggin");
};

const autoPlay = () => {
  timeoutId = setTimeout(() => (carousel.scrollLeft += cardWidth), 1500);
};
autoPlay();

const infiniteScroll = () => {
  //if carousel at beginning, scroll to end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // if carousel at end, scroll to beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  //clear existing timeout and restart carousel if mouse is not hovering
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", drag);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

//updates
document.addEventListener("DOMContentLoaded", function () {
  // Events Data
  const eventsData = [
    {
      title: "Online Five-day GIAN course on Hybrid Renewable Energy",
      date: "20-25 February 2025",
      description: "Systems in Microgrids",
      courseId: "241236",
      image: "/api/placeholder/400/300",
      link: "#",
    },
    {
      title: "Workshop on Advanced Materials",
      date: "1-3 March 2025",
      description: "Exploring latest developments in material science",
      courseId: "241237",
      image: "/api/placeholder/400/300",
      link: "#",
    },
    {
      title: "International Conference on Sustainable Technology",
      date: "15-17 March 2025",
      description: "Global perspectives on sustainable engineering",
      courseId: "241238",
      image: "/api/placeholder/400/300",
      link: "#",
    },
  ];

  // Awards Data
  const awardsData = [
    {
      title: "AICTE Financial Grant",
      description:
        "AICTE has awarded Prof. Manjaraj M (ME) a financial grant to attend the Fraunhofer Direct Digital Manufacturing Conference DDMC, Germany (12 March, 2025 to 13 March, 2025)",
    },
    {
      title: "Best Young Scientist Award",
      description:
        "Prof. Ashish Prabhu, Assistant Professor, Department of Biotechnology, has been awarded the Best Young Scientist Award at the 4th International Conference on Bioprocess for Sustainable Environment and Energy, held at NIT Rourkela.",
    },
    {
      title: "WARI Fellowship Program",
      description:
        "Prof Jew Das (CE) has been chosen for the esteemed Water Advanced Research and Innovation (WARI) Fellowship Program, sponsored by the Indo-US Science and Technology Forum (IUSSTF)",
    },
    {
        title: "WARI Fellowship Program",
        description:
          "Prof Jew Das (CE) has been chosen for the esteemed Water Advanced Research and Innovation (WARI) Fellowship Program, sponsored by the Indo-US Science and Technology Forum (IUSSTF)",
      },
  ];

  // Initialize Events Section
  function initializeEvents() {
    const eventSlider = document.querySelector(".event-slider");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentSlide = 0;

    // Create event cards
    eventsData.forEach((event, index) => {
      const eventCard = document.createElement("div");
      eventCard.className = "event-card";
      eventCard.style.display = index === 0 ? "block" : "none";
      eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.title}">
                <h3>${event.title}</h3>
                <p class="event-date">${event.date}</p>
                <p class="course-id">Course ID: ${event.courseId}</p>
                <p>${event.description}</p>
            `;
      eventSlider.appendChild(eventCard);
    });

    // Event Navigation
    function showSlide(index) {
      const slides = document.querySelectorAll(".event-card");
      slides.forEach((slide) => (slide.style.display = "none"));
      slides[index].style.display = "block";
      slides[index].style.animation = "fadeIn 0.5s";
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % eventsData.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + eventsData.length) % eventsData.length;
      showSlide(currentSlide);
    }

    // Auto-scroll events
    let autoScrollInterval = setInterval(nextSlide, 5000);

    // Event listeners
    prevBtn.addEventListener("click", () => {
      clearInterval(autoScrollInterval);
      prevSlide();
      autoScrollInterval = setInterval(nextSlide, 5000);
    });

    nextBtn.addEventListener("click", () => {
      clearInterval(autoScrollInterval);
      nextSlide();
      autoScrollInterval = setInterval(nextSlide, 5000);
    });

    // Pause on hover
    eventSlider.addEventListener("mouseenter", () =>
      clearInterval(autoScrollInterval)
    );
    eventSlider.addEventListener("mouseleave", () => {
      autoScrollInterval = setInterval(nextSlide, 5000);
    });
  }

  // Initialize Awards Section
  function initializeAwards() {
    const awardsScroll = document.querySelector(".awards-scroll");

    // Create award cards
    const createAwardCards = () => {
      return awardsData
        .map(
          (award) => `
                <div class="award-card">
                    <h3>${award.title}</h3>
                    <p>${award.description}</p>
                </div>
            `
        )
        .join("");
    };

    // Add original and duplicate awards for continuous scroll
    awardsScroll.innerHTML = createAwardCards() + createAwardCards();

    // Reset animation when it ends
    awardsScroll.addEventListener("animationend", () => {
      awardsScroll.style.animation = "none";
      awardsScroll.offsetHeight; // Trigger reflow
      awardsScroll.style.animation = "scrollUp 20s linear infinite";
    });

    // Pause on hover
    const awardsContainer = document.querySelector(".awards-container");
    awardsContainer.addEventListener("mouseenter", () => {
      awardsScroll.style.animationPlayState = "paused";
    });
    awardsContainer.addEventListener("mouseleave", () => {
      awardsScroll.style.animationPlayState = "running";
    });
  }

  // Initialize both sections
  initializeEvents();
  initializeAwards();
});
