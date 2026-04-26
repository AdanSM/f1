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

    document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const activeLine = document.querySelector('.active-line');
    const containers = document.querySelectorAll('.container-dishes');

    const updateLinePosition = (activeTab) => {
        activeLine.style.width = `${activeTab.offsetWidth}px`;
        activeLine.style.transform = `translateX(${activeTab.offsetLeft}px)`;
    };

    const initialActiveTab = document.querySelector('.tab.active');
    if (initialActiveTab) {
        updateLinePosition(initialActiveTab);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
        tabs.forEach(t => t.classList.remove('active'));
        
        const clickedTab = e.currentTarget;
        clickedTab.classList.add('active');

        updateLinePosition(clickedTab);

        const targetName = clickedTab.getAttribute('data-name');
        containers.forEach(container => {
            if (container.getAttribute('data-name') === targetName) {
            container.classList.add('active');
            } else {
            container.classList.remove('active');
            }
        });
        });
    });

    window.addEventListener('resize', () => {
        const currentActiveTab = document.querySelector('.tab.active');
        if (currentActiveTab) {
        updateLinePosition(currentActiveTab);
        }
    });
    });







