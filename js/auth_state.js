document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-container');
    const userStr = localStorage.getItem('user');

    if (userStr && authContainer) {
        const user = JSON.parse(userStr);
        
        authContainer.innerHTML = `
            <div class="profile-dropdown">
                <button class="btn btn-primary profile-btn" id="profile-toggle-btn">
                    <i class="fa-solid fa-user"></i> <span class="auth-text">${user.Nombre}</span>
                </button>
                <div class="dropdown-menu" id="profile-menu">
                    <p class="user-name-display">Hola, ${user.Nombre}</p>
                    <button id="logout-btn">Cerrar Sesión</button>
                </div>
            </div>
        `;

        const profileToggleBtn = document.getElementById('profile-toggle-btn');
        const profileMenu = document.getElementById('profile-menu');
        const logoutBtn = document.getElementById('logout-btn');

        profileToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('show');
        });

        // Cerrar menú si se hace clic fuera
        document.addEventListener('click', (e) => {
            if (!authContainer.contains(e.target)) {
                profileMenu.classList.remove('show');
            }
        });

        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload();
        });
    }
});
