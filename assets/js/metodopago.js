document.getElementById('cardholder').addEventListener('input', function (e) {
    let cardholder = e.target;
    cardholder.value = cardholder.value.replace(/[^a-zA-Z\s]/g, '');
    document.getElementById('displayCardholder').innerText = cardholder.value || 'Jane Appleseed';
    validateForm();
});

document.getElementById('cardNumber').addEventListener('input', function (e) {
    let cardNumber = e.target;
    cardNumber.value = cardNumber.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
    if (cardNumber.value.length > 19) {
        cardNumber.value = cardNumber.value.slice(0, 19);
    }
    document.getElementById('displayCardNumber').innerText = cardNumber.value || '0000 0000 0000 0000';
    validateForm();
});

document.getElementById('cardMonth').addEventListener('input', function (e) {
    let cardMonth = e.target;
    cardMonth.value = cardMonth.value.replace(/\D/g, '');
    if (parseInt(cardMonth.value, 10) > 12) {
        cardMonth.value = '12';
    }
    document.getElementById('displayCardMonth').innerText = cardMonth.value || '00';
    validateForm();
});

document.getElementById('cardYear').addEventListener('input', function (e) {
    let cardYear = e.target;
    cardYear.value = cardYear.value.replace(/\D/g, '');
    document.getElementById('displayCardYear').innerText = cardYear.value || '00';
    validateForm();
});

document.getElementById('cardCvc').addEventListener('input', function (e) {
    let cardCvc = e.target;
    cardCvc.value = cardCvc.value.replace(/\D/g, '');
    document.getElementById('displayCardCvc').innerText = cardCvc.value || '000';
    validateForm();
});

function validateForm() {
    const cardholder = document.getElementById('cardholder').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardMonth = document.getElementById('cardMonth').value.trim();
    const cardYear = document.getElementById('cardYear').value.trim();
    const cardCvc = document.getElementById('cardCvc').value.trim();

    const isCardholderValid = cardholder !== '';
    const isCardNumberValid = cardNumber.length === 16;
    const isCardMonthValid = cardMonth !== '' && parseInt(cardMonth, 10) <= 12;
    const isCardYearValid = cardYear !== '';
    const isCardCvcValid = cardCvc.length === 3;

    const isFormValid = isCardholderValid && isCardNumberValid && isCardMonthValid && isCardYearValid && isCardCvcValid;

    document.getElementById('confirmButton').disabled = !isFormValid;
}

document.getElementById('paymentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Additional form submission logic here
    window.location.href = "Agradecimiento.html";
});