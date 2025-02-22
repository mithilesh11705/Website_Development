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

//Student Notices
const notices = [
  {
    title: "Summer Internship Programme 2025",
    date: "18 Feb 2025",
    link: "#",
    isNew: true,
  },
  {
    title: "Corrigendum to Notice for Admission to MBA 25-27",
    date: "22 Jan 2025",
    link: "#",
    isNew: false,
  },
  {
    title: "Advertisement for Admission to MBA 2025-27",
    date: "02 Jan 2025",
    link: "#",
    isNew: false,
  },
  {
    title: "Campus Placement Drive 2025",
    date: "15 Jan 2025",
    link: "#",
    isNew: false,
  },
  {
    title: "Annual Sports Meet Registration",
    date: "10 Jan 2025",
    link: "#",
    isNew: false,
  },
];

class NoticeBoard {
  constructor() {
    this.currentIndex = 0;
    this.wrapper = document.getElementById("noticeWrapper");
    this.pauseBtn = document.getElementById("pauseBtn");
    this.resumeBtn = document.getElementById("resumeBtn");
    this.isPaused = false;
    this.interval = null;

    this.init();
  }

  init() {
    this.renderNotices();
    this.startAnimation();
    this.setupEventListeners();
  }

  renderNotices() {
    this.wrapper.innerHTML = notices
      .map(
        (notice) => `
          <a href="${notice.link}" class="notice-item">
              <div class="notice-title">
                  ${notice.title}
                  ${notice.isNew ? '<span class="new-badge">NEW</span>' : ""}
              </div>
              <div class="notice-date">${notice.date}</div>
          </a>
      `
      )
      .join("");
  }

  moveNotices() {
    this.currentIndex = (this.currentIndex + 1) % notices.length;
    this.wrapper.style.transform = `translateY(-${this.currentIndex * 60}px)`;
  }

  startAnimation() {
    this.interval = setInterval(() => this.moveNotices(), 3000);
  }

  setupEventListeners() {
    this.pauseBtn.addEventListener("click", () => this.pauseAnimation());
    this.resumeBtn.addEventListener("click", () => this.resumeAnimation());

    this.wrapper.addEventListener("mouseenter", () => this.pauseAnimation());
    this.wrapper.addEventListener("mouseleave", () => {
      if (!this.isPaused) {
        this.resumeAnimation();
      }
    });
  }

  pauseAnimation() {
    this.isPaused = true;
    clearInterval(this.interval);
  }

  resumeAnimation() {
    this.isPaused = false;
    this.startAnimation();
  }
}

// Initialize the notice board
document.addEventListener("DOMContentLoaded", () => {
  new NoticeBoard();
});

const facultyNotices = [
  {
    title: "Faculty Development Program on Advanced Teaching Methods",
    date: "18 Feb 2025",
    department: "All Departments",
    link: "#",
    isNew: true,
  },
  {
    title: "Research Grant Proposals Due",
    date: "22 Jan 2025",
    department: "Research Cell",
    link: "#",
    isNew: false,
  },
  {
    title: "Annual Faculty Performance Review Schedule",
    date: "15 Jan 2025",
    department: "HR Department",
    link: "#",
    isNew: false,
  },
  {
    title: "Department Heads Meeting",
    date: "12 Jan 2025",
    department: "Administration",
    link: "#",
    isNew: false,
  },
  {
    title: "Workshop on Innovative Teaching Technologies",
    date: "10 Jan 2025",
    department: "IT Department",
    link: "#",
    isNew: false,
  },
];

class FacultyNoticeBoard {
  constructor() {
    this.currentFacultyIndex = 0;
    this.facultyWrapper = document.getElementById("facultyNoticeWrapper");
    this.facultyPauseBtn = document.getElementById("facultyPauseBtn");
    this.facultyResumeBtn = document.getElementById("facultyResumeBtn");
    this.isFacultyPaused = false;
    this.facultyInterval = null;

    this.initFacultyBoard();
  }

  initFacultyBoard() {
    this.renderFacultyNotices();
    this.startFacultyAnimation();
    this.setupFacultyEventListeners();
  }

  renderFacultyNotices() {
    this.facultyWrapper.innerHTML = facultyNotices
      .map(
        (notice) => `
          <a href="${notice.link}" class="faculty-notice-item">
              <div class="faculty-notice-title">
                  ${notice.title}
                  ${
                    notice.isNew
                      ? '<span class="faculty-new-badge">NEW</span>'
                      : ""
                  }
                  <span class="faculty-department-tag">${
                    notice.department
                  }</span>
              </div>
              <div class="faculty-notice-date">${notice.date}</div>
          </a>
      `
      )
      .join("");
  }

  moveFacultyNotices() {
    this.currentFacultyIndex =
      (this.currentFacultyIndex + 1) % facultyNotices.length;
    this.facultyWrapper.style.transform = `translateY(-${
      this.currentFacultyIndex * 60
    }px)`;
  }

  startFacultyAnimation() {
    this.facultyInterval = setInterval(() => this.moveFacultyNotices(), 3000);
  }

  setupFacultyEventListeners() {
    this.facultyPauseBtn.addEventListener("click", () =>
      this.pauseFacultyAnimation()
    );
    this.facultyResumeBtn.addEventListener("click", () =>
      this.resumeFacultyAnimation()
    );

    this.facultyWrapper.addEventListener("mouseenter", () =>
      this.pauseFacultyAnimation()
    );
    this.facultyWrapper.addEventListener("mouseleave", () => {
      if (!this.isFacultyPaused) {
        this.resumeFacultyAnimation();
      }
    });
  }

  pauseFacultyAnimation() {
    this.isFacultyPaused = true;
    clearInterval(this.facultyInterval);
  }

  resumeFacultyAnimation() {
    this.isFacultyPaused = false;
    this.startFacultyAnimation();
  }
}

// Initialize the faculty notice board
document.addEventListener("DOMContentLoaded", () => {
  new FacultyNoticeBoard();
});
