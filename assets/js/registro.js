document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('errorMessage').textContent = 'Las contraseñas no coinciden';
        return;
    }

    const newUser = {
        username,
        email,
        password
    };

    // Obtener usuarios existentes del Local Storage (si existen)
    let users = [];
    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
    }

    // Verificar si el correo electrónico ya está registrado
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        document.getElementById('errorMessage').textContent = 'El correo electrónico ya está registrado';
        return;
    }

    // Agregar el nuevo usuario al array de usuarios
    users.push(newUser);

    // Guardar el array de usuarios en el Local Storage
    localStorage.setItem('users', JSON.stringify(users));

    alert('¡Usuario registrado correctamente!');
    // Redirigir a otra página, iniciar sesión automáticamente, etc.
    window.location.href = './LoginForm.html';
});
