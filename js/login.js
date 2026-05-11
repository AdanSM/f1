document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');

    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const Nombre = document.getElementById('Nombre').value.trim();
            const password = document.getElementById('password').value.trim();

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Nombre, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Save token in localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    alert('Inicio de sesión exitoso.');
                    window.location.href = '/index.html';
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Ocurrió un error al intentar iniciar sesión.');
            }
        });
    }
});
