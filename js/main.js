document.addEventListener('DOMContentLoaded', async () => {
    const authContainer = document.getElementById('auth-container');

    try {
        // Consultamos al servidor si hay una sesión activa
        // IMPORTANTE: 'credentials: include' es vital para enviar la cookie
        const response = await fetch('http://localhost:3000/check-auth', { 
            method: 'GET',
            credentials: 'include' 
        });
        
        const data = await response.json();

        if (data.loggedIn) {
            // Si el usuario está logueado, cambiamos el botón por su nombre
            authContainer.innerHTML = `
                <div class="user-menu">
                    <span style="color: white; margin-right: 15px;">
                        <i class="fa-solid fa-user"></i> ${data.username}
                    </span>
                    <button onclick="logout()" class="btn btn-primary">Cerrar sesión</button>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error verificando sesión:', error);
    }
});

// Función para cerrar sesión
async function logout() {
    await fetch('http://localhost:3000/logout', { 
        method: 'POST', 
        credentials: 'include' 
    });
    window.location.reload(); // Recarga y vuelve al botón de "Login"
}