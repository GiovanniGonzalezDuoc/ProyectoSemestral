$(document).ready(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const mostrarCarrito = urlParams.get('mostrar_carrito');
  if (mostrarCarrito === 'True') {
      var myModal = new bootstrap.Modal($('#carritoModal')[0]);
      myModal.show();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Nombre de la Tarjeta: Solo letras y espacios
  document.getElementById('cardholder').addEventListener('input', function(e) {
    let cardholder = e.target;
    cardholder.value = cardholder.value.replace(/[^a-zA-Z\s]/g, '');
    document.getElementById('displayCardholder').innerText = cardholder.value || 'Jane Appleseed';
    validateForm();
  });

  // Número de Tarjeta: Solo números de 16 dígitos
  document.getElementById('cardNumber').addEventListener('input', function(e) {
    let cardNumber = e.target;
    cardNumber.value = cardNumber.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
    if (cardNumber.value.length > 19) {
      cardNumber.value = cardNumber.value.slice(0, 19);
    }
    document.getElementById('displayCardNumber').innerText = cardNumber.value || '0000 0000 0000 0000';
    validateForm();
  });

  // Fecha de Expiración (MM/YY): Mes no puede ser mayor a 12, solo números; Año debe ser exactamente 2 dígitos
  document.getElementById('cardMonth').addEventListener('input', function(e) {
    let cardMonth = e.target;
    cardMonth.value = cardMonth.value.replace(/\D/g, '');
    if (parseInt(cardMonth.value, 10) > 12) {
      cardMonth.value = '12';
    }
    document.getElementById('displayCardMonth').innerText = cardMonth.value || '00';
    validateForm();
  });

  document.getElementById('cardYear').addEventListener('input', function(e) {
    let cardYear = e.target;
    cardYear.value = cardYear.value.replace(/\D/g, '').slice(0, 2); // Limitar a 2 dígitos
    document.getElementById('displayCardYear').innerText = cardYear.value || '00';
    validateForm();
  });

  // CVV: Hasta 4 números
  document.getElementById('cardCvc').addEventListener('input', function(e) {
    let cardCvc = e.target;
    cardCvc.value = cardCvc.value.replace(/\D/g, '').slice(0, 3); // Permitir hasta 4 dígitos
    document.getElementById('displayCardCvc').innerText = cardCvc.value || '000';
    validateForm();
  });

  function validateForm() {
    const cardholder = document.getElementById('cardholder').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardMonth = document.getElementById('cardMonth').value.trim();
    const cardYear = document.getElementById('cardYear').value.trim();
    const cardCvc = document.getElementById('cardCvc').value.trim();

    const isCardholderValid = /^[a-zA-Z\s]+$/.test(cardholder);
    const isCardNumberValid = cardNumber.length === 19;
    const isCardMonthValid = cardMonth !== '' && parseInt(cardMonth, 10) <= 12;
    const isCardYearValid = cardYear.length === 2;
    const isCardCvcValid = cardCvc.length === 3;

    const isFormValid = isCardholderValid && isCardNumberValid && isCardMonthValid && isCardYearValid && isCardCvcValid;

    document.getElementById('confirmButton').disabled = !isFormValid;
  }

  document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate if any field in the form is filled
    const cardholder = document.getElementById('cardholder').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardMonth = document.getElementById('cardMonth').value.trim();
    const cardYear = document.getElementById('cardYear').value.trim();
    const cardCvc = document.getElementById('cardCvc').value.trim();

    const fields = [
      { id: 'cardholder', value: cardholder },
      { id: 'cardNumber', value: cardNumber },
      { id: 'cardMonth', value: cardMonth },
      { id: 'cardYear', value: cardYear },
      { id: 'cardCvc', value: cardCvc }
    ];

    let firstEmptyField = null;

    fields.forEach(field => {
      const element = document.getElementById(field.id);
      if (!field.value) {
        element.classList.add('errores');
        if (!firstEmptyField) {
          firstEmptyField = element;
        }
      } else {
        element.classList.remove('errores');
      }
    });

    if (firstEmptyField) {
      firstEmptyField.focus();
      alert("Por favor, complete todos los campos del formulario antes de enviarlo.");
      return;
    }

    console.log('Formulario enviado correctamente!');

    // Redireccionar a agradecimiento.html
    window.location.href = '/agradecimiento';
  });
});
