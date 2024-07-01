$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const mostrarCarrito = urlParams.get('mostrar_carrito');
    if (mostrarCarrito === 'True') {
        var myModal = new bootstrap.Modal($('#carritoModal')[0]);
        myModal.show();
    }
});
