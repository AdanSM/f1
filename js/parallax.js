document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los elementos con la clase .parallax
    const parallaxElements = document.querySelectorAll('.parallax');

    // Escuchar el evento de scroll de la ventana
    window.addEventListener('scroll', () => {
        // Obtener cuánto ha bajado el usuario en píxeles
        let scrollPosition = window.scrollY;

        parallaxElements.forEach((element) => {
            // Leer la velocidad asignada a cada elemento (por defecto 0.1)
            let speed = parseFloat(element.getAttribute('data-speed')) || 0.1;
            
            // Calcular el nuevo movimiento vertical
            let movement = -(scrollPosition * speed);

            // Aplicar la transformación CSS
            element.style.transform = `translateY(${movement}px)`;
        });
    });
});
