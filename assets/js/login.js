// document.getElementById('loginForm').addEventListener('submit', async function(event) {
//     event.preventDefault();

//     const email = document.getElementById('emailInput').value;
//     const password = document.getElementById('passwordInput').value;
    
//     try {
//         const response = await fetch('https://my.api.mockaroo.com/users.json?key=d32f68e0');

//         if (!response.ok) {
//             throw new Error('Error al obtener los usuarios');
//         }

//         // Obtener usuarios del Local Storage
        
//         const users = await response.json();
        
//         // Simulamos la autenticación verificando que el correo y la contraseña coincidan con los datos de algún usuario
//         const user = users.find(user => user.email === email && user.password === password);
        
//         if (!user) {
//             // Mostrar mensaje de error en el HTML
//             document.getElementById('errorMessage').textContent = 'Correo electrónico o contraseña incorrectos';
//         } else {
//             // Almacenar información del usuario en el Local Storage
//             localStorage.setItem('usuario', JSON.stringify(user));
//             // Redirigir al usuario a UsuarioRegistrado.html
//             window.location.href = './UsuarioRegistrado.html';
//         }
        
//     } catch (error) {
//         console.error('Error al iniciar sesión:', error.message);
//         // Mostrar mensaje de error en el HTML
//         document.getElementById('errorMessage').textContent = 'Se produjo un error al iniciar sesión';
//     }
// });
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
        const response = await fetch('https://my.api.mockaroo.com/users.json?key=d32f68e0');

        if (!response.ok) {
            throw new Error('Error al obtener los usuarios');
        }

        // Obtener usuarios del Local Storage
        const localUsers = JSON.parse(localStorage.getItem('users')) || [];

        const apiUsers = await response.json();

        // Combinar usuarios de la API y del Local Storage
        const users = [...localUsers, ...apiUsers];

        // Verificar si el usuario existe y las credenciales son válidas
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            // Almacenar información del usuario en el Local Storage
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Redirigir al usuario a UsuarioRegistrado.html
            window.location.href = './UsuarioRegistrado.html';
        } else {
            // Mostrar mensaje de error en el HTML
            document.getElementById('errorMessage').textContent = 'Correo electrónico o contraseña incorrectos';
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        // Mostrar mensaje de error en el HTML
        document.getElementById('errorMessage').textContent = 'Se produjo un error al iniciar sesión';
    }
});