document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector(".carousel-container");
    const carouselItems = document.querySelectorAll(".carousel-item");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100; // Mover el carrusel según el índice actual
        carouselContainer.style.transform = `translateX(${offset}%)`;

        // Habilitar/Deshabilitar botones según el índice actual
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === carouselItems.length - 1;
    }

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < carouselItems.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    updateCarousel();
});
