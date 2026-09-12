// Navbar resizing
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  updateActiveNav();
});

// smooth scrolling
const navLinks = document.querySelectorAll(".nav-link, .site-title, .explore-button");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    const headerHeight = header.offsetHeight;
    const targetPosition = targetSection.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});

// Position Indicator
const sections = document.querySelectorAll("#home, #skill, #project, #video, #experience, #contact");
function updateActiveNav() {
  let currentSection = "";

  const headerHeight = header.offsetHeight;
  const readingPosition = window.scrollY + headerHeight + 1;

  const isAtBottom =
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1;

  if (isAtBottom) {
    currentSection = "contact";
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (
        readingPosition >= sectionTop &&
        readingPosition < sectionBottom
      ) {
        currentSection = section.id;
      }
    });
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

//skill modal
const skillData = {
  programming: {
    title: "Programming Languages",
    items: ["C", "C++", "Python", "Java", "Verilog", "Solidity"]
  },

  tools: {
    title: "Frameworks & Tools",
    items: [
      "Gradle",
      "Maven",
      "Ant",
      "JavaParser",
      "Clover",
      "Randoop",
      "Android Studio",
      "Flask",
      "React",
      "GCP",
      "GitHub Actions",
      "Git",
      "Ubuntu",
      "WSL"
    ]
  },

  database: {
    title: "Databases",
    items: ["MySQL", "MongoDB", "Neo4j"]
  },

  ml: {
    title: "Machine Learning",
    items: ["PyTorch", "scikit-learn", "NumPy", "Pandas"]
  },

  languages: {
    title: "Languages",
    items: ["English", "Mandarin Chinese"]
  }
};

const skillCards = document.querySelectorAll(".skill-card");
const skillModal = document.getElementById("skill-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalClose = document.querySelector(".modal-close");

skillCards.forEach((card) => {
  card.addEventListener("click", () => {
    const skillType = card.dataset.skill;
    const skill = skillData[skillType];

    modalTitle.textContent = skill.title;
    modalBody.textContent = "";

    const list = document.createElement("ul");

    skill.items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.appendChild(listItem);
    });

    modalBody.appendChild(list);

    skillModal.classList.add("show");
  });
});

modalClose.addEventListener("click", () => {
  skillModal.classList.remove("show");
});

skillModal.addEventListener("click", (event) => {
  if (event.target === skillModal) {
    skillModal.classList.remove("show");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    skillModal.classList.remove("show");
  }
});

//project carousel
const projectSlides = document.querySelectorAll(".project-slide");
const previousButton = document.querySelector(".carousel-button.previous");
const nextButton = document.querySelector(".carousel-button.next");

let currentSlide = 0;

function showSlide(index) {
  projectSlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  projectSlides[index].classList.add("active");
}

previousButton.addEventListener("click", () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = projectSlides.length - 1;
  }

  showSlide(currentSlide);
});

nextButton.addEventListener("click", () => {
  currentSlide++;
  if (currentSlide >= projectSlides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
});

showSlide(currentSlide);