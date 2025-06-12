export function validateLastName(lastName) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    return regex.test(lastName);
}

export function validateFirstName(firstName) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    return regex.test(firstName);
}

export function validateDNI(dni) {
    const regex = /^\d{8}$/;
    return regex.test(dni);
}

export function validateDateOfBirth(dateOfBirth) {
    const date = new Date(dateOfBirth);
    return date.getFullYear() > 2006;
}

export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function validateForm() {
    const lastName = document.getElementById('lastName').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value.trim();

    if (!validateLastName(lastName)) {
        alert('Apellido inválido. Solo letras.');
        return false;
    }
    if (!validateFirstName(firstName)) {
        alert('Nombre inválido. Solo letras.');
        return false;
    }
    if (!validateDNI(dni)) {
        alert('DNI inválido. Deben ser 8 números.');
        return false;
    }
    if (!validateDateOfBirth(dob)) {
        alert('Fecha de nacimiento inválida. Debe ser posterior a 2006.');
        return false;
    }
    if (!validateEmail(email)) {
        alert('Email inválido.');
        return false;
    }
    return true;
}

function validarFechasVuelo() {
    const fechaIda = document.getElementById('fechaIda').value;
    const fechaVuelta = document.getElementById('fechaVuelta').value;
    const opcionViaje = document.querySelector('input[name="opcionViaje"]:checked').value;
    if (opcionViaje === 'idavuelta') {
        if (!fechaVuelta) {
            alert('Debe seleccionar una fecha de vuelta.');
            return false;
        }
        if (new Date(fechaVuelta) <= new Date(fechaIda)) {
            alert('La fecha de vuelta debe ser posterior a la fecha de ida.');
            return false;
        }
    }
    return true;
}

function calcularPrecioVuelo() {
    const destino = document.getElementById('destino').value;
    const opcionViaje = document.querySelector('input[name="opcionViaje"]:checked').value;
    const pasajeros = parseInt(document.getElementById('pasajeros').value, 10);

    // Precios ida y vuelta por pasajero
    const precios = {
        'COR': 120000,
        'MDZ': 210800,
        'BUE': 135000
    };
    let precioBase = precios[destino] || 0;
    if (opcionViaje === 'ida') {
        precioBase = precioBase / 2;
    }
    let total = precioBase * pasajeros;
    total = total * 1.21; // Agregar 21% de IVA

    // Mostrar resultado en el DOM
    const resultadoDiv = document.getElementById('resultadoPrecio');
    if (precioBase === 0 || isNaN(total)) {
        resultadoDiv.innerHTML = '<span style="color:red">Seleccione un destino válido y cantidad de pasajeros.</span>';
    } else {
        resultadoDiv.innerHTML = `<strong>Total a pagar: $${total.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>`;
    }
}

// Asociar la función al botón calcular
const calcularBtn = document.getElementById('calcularBtn');
if (calcularBtn) {
    calcularBtn.addEventListener('click', function(e) {
        if (typeof validarFechasVuelo === 'function' && !validarFechasVuelo()) {
            e.preventDefault();
            return;
        }
        calcularPrecioVuelo();
    });
}
