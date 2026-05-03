const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Captura de datos
    const userData = {
        nombre: document.getElementById('Nombre').value,
        apellido: document.getElementById('Apellido').value,
        edad: document.getElementById('Edad').value,
        email: document.getElementById('Email').value,
        password: document.getElementById('password').value
    };

    // Envío al servidor
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    const result = await response.json();
    
    if (response.ok) {
        alert("¡Registro exitoso!");
        window.location.href = 'index.html';
    } else {
        alert("Error: " + result.message);
    }
});