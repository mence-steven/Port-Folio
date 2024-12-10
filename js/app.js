const carouselSlides = document.querySelector(".carousel-slides");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");

let currentIndex = 0;
let slidesData = [];

function loadSlides() {
  fetch("./data/slides.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des slides.");
      }
      return response.json();
    })
    .then((data) => {
      slidesData = data;
      initCarousel();
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
}

function generateSlides(data) {
  carouselSlides.innerHTML = "";

  data.forEach((slide) => {
    const slideElement = document.createElement("div");
    slideElement.classList.add("slide");

    slideElement.innerHTML = `
      <img src="${slide.image}" alt="${slide.titre}">
      <div class="text">
        <h3>${slide.titre}</h3>
        <p>${slide.description}</p>
        <button class="next-info-btn">Détail du projet -></button>
        <div class="additional-info" style="display: none;">
          <p><strong>Présentation:</strong> ${slide.presentation}</p>
          <p><strong>Objectif:</strong> ${slide.objectif}</p>
          <p><strong>Langages et outils:</strong> ${slide["langages et outils"].join(", ")}</p>
          <p><strong>Lien GitHub:</strong> <a href="${slide.lien}" target="_blank">Voir le projet</a></p>
        </div>
      </div>
    `;
    carouselSlides.appendChild(slideElement);
  });
}

function updateCarousel() {
  const slideWidth = carouselSlides.children[0].offsetWidth;
  carouselSlides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function initCarousel() {
  generateSlides(slidesData);
  updateCarousel();

  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slidesData.length - 1;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex < slidesData.length - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  });

  const nextInfoButtons = document.querySelectorAll(".next-info-btn");
  nextInfoButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const additionalInfo = button.nextElementSibling;
      additionalInfo.style.display = additionalInfo.style.display === "none" ? "block" : "none";
    });
  });

  window.addEventListener("resize", updateCarousel);
}

document.addEventListener("DOMContentLoaded", loadSlides);
