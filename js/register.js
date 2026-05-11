document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');

    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const Nombre = document.getElementById('Nombre').value.trim();
            const Apellido = document.getElementById('Apellido').value.trim();
            const Edad = document.getElementById('Edad').value;
            const Email = document.getElementById('Email').value.trim();
            const password = document.getElementById('password').value.trim();

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Nombre, Apellido, Edad, Email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Registro exitoso. Ahora puedes iniciar sesión.');
                    window.location.href = '/login.html';
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Ocurrió un error al intentar registrarse.');
            }
        });
    }
});
