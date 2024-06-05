document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://my.api.mockaroo.com/comics.json?key=c917b880';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.getElementById('carousel-inner-custom');

            for (let i = 0; i < data.length; i += 3) {
                const isActive = i === 0 ? 'active' : '';
                const comicsGroup = data.slice(i, i + 3);

                const item = `
                    <div class="carousel-item ${isActive}">
                        <div class="row justify-content-center">
                            ${comicsGroup.map(comic => `
                                <div class="col-md-4">
                                    <div class="card mb-4 shadow-sm" data-toggle="modal" data-target="#comicsModalCustom" data-comic-id="${comic.id}">
                                        <img src="${comic.imagen}" class="card-img-top" alt="${comic.nombre}">
                                        <div class="card-body">
                                            <h5 class="card-title">${comic.nombre}</h5>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                carouselInner.innerHTML += item;
            }

            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', () => {
                    const comicId = card.getAttribute('data-comic-id');
                    const comic = data.find(c => c.id == comicId);
                    mostrarDetallesComic(comic);
                });
            });
        })
        .catch(error => console.error('Error al obtener datos:', error));
});

function mostrarDetallesComic(comic) {
    const comicsDetalleCustom = document.getElementById('comicsDetalleCustom');
    comicsDetalleCustom.innerHTML = `
        <div class="modal-body">
            <img src="${comic.imagen}" class="img-fluid mb-3" alt="${comic.nombre}">
            <h5>${comic.nombre}</h5>
            <p><b>Descripción:</b></p>
            <p>${comic.descripcion}</p>
            <p><b>Precio:</b> ${comic.precio}</p>
        </div>
    `;
    const comicsModalCustom = new bootstrap.Modal(document.getElementById('comicsModalCustom'));
    comicsModalCustom.show();
}
document.addEventListener('DOMContentLoaded', () => {
    const comicsLink = document.getElementById('comicsLink');
    const aboutUsLink = document.getElementById('aboutUsLink');
    const loginFormURL = './Login/LoginForm.html';  // URL del formulario de login

    comicsLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (!isUserLoggedIn()) {
            alert('Debes iniciar sesión para acceder a los cómics.');
            window.location.href = loginFormURL;
        } else {
            window.location.href = './centrocards/comics.html';  // URL de la sección de cómics
        }
    });

    aboutUsLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (!isUserLoggedIn()) {
            alert('Debes iniciar sesión para acceder a la sección "Sobre Nosotros".');
            window.location.href = loginFormURL;
        } else {
            window.location.href = './Login/SobreNosotros.html';  // URL de la sección "Sobre Nosotros"
        }
    });

    function isUserLoggedIn() {
        // Suponiendo que guardas el ID del usuario en el localStorage cuando inicia sesión
        return localStorage.getItem('userId') !== null;
    }
});
