/**
 * SELECTORES
 * Asegúrate de que las clases coincidan exactamente con tu HTML
 */
const containerTestimonials = document.querySelector('.container-testimonials');
const allTestimonials = document.querySelectorAll('.testimonial');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

// Constantes y Variables de estado
const totalTestimonials = allTestimonials.length;
let currentIndex = 0;
let autoPlayInterval;

/**
 * FUNCIÓN ACTUALIZAR
 * Desplaza el contenedor basándose en el ancho del mismo
 */
const updateCarousel = () => {
    // Calculamos la posición multiplicando el índice por el ancho del contenedor
    const offset = currentIndex * containerTestimonials.clientWidth;
    
    containerTestimonials.scrollTo({
        left: offset,
        behavior: 'smooth'
    });
};

/**
 * EVENTOS DE BOTONES
 */

// Botón Siguiente
btnNext.addEventListener('click', () => {
    // Si llega al final, vuelve al principio (0)
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateCarousel();
    resetAutoplay();
});

// Botón Anterior
btnPrev.addEventListener('click', () => {
    // Si está al principio, vuelve al último
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    updateCarousel();
    resetAutoplay();
});

/**
 * LÓGICA DE AUTOPLAY
 */

function startAutoplay() {
    autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateCarousel();
    }, 5000); // Cambia cada 5 segundos
}

function resetAutoplay() {
    clearInterval(autoPlayInterval);
    startAutoplay();
}

// Iniciar el carrusel automáticamente al cargar
startAutoplay();

// Opcional: Ajustar el carrusel si el usuario cambia el tamaño de la ventana
window.addEventListener('resize', updateCarousel);