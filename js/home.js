const containerTabs = document.querySelectorAll('.tab');
const AllcontainerDishes = document.querySelectorAll('.container-dishes');

containerTabs.forEach((tab)=>{
    tab.addEventListener('click', e=>{
        const tabName =  e.target.dataset.name;

        
        containerTabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');

        AllcontainerDishes.forEach(containerDishes => {
            const dishName = containerDishes.dataset.name;

            if (tabName=== dishName){
                containerDishes.classList.add('active');
            }
            else{
                containerDishes.classList.remove('active');



            }
        })
    });
});



window.addEventListener('scroll', () => {
    const section = document.querySelector('.section-our-monoplaza');
    const car = document.querySelector('.main-image');
    const line = document.querySelector('.car-line');
    const wake = document.querySelector('.orange-wake');

    if (!section || !car) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    
    // Calculamos el progreso (0 a 1)
    let progress = -rect.top / (sectionHeight - window.innerHeight);
    progress = Math.max(0, Math.min(1, progress));

    // Desplazamiento del auto: de derecha a izquierda
    // Ajusta el '1000' para que se mueva más o menos distancia
    const moveX = progress * (window.innerWidth / 1.5);
    
    car.style.transform = `translateX(-${moveX}px)`;
    line.style.transform = `translateX(-${moveX}px)`;

    // El rastro (wake) crece según el progreso
    if (wake) {
        wake.style.width = `${progress * 100}%`;
    }
});



