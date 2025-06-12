document.getElementById('form-vuelo').addEventListener('submit', function (e) {
  e.preventDefault();

  const destino = document.getElementById('destino').value;
  const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
  const fechaIdaStr = document.getElementById('fecha-ida').value;
  const fechaVueltaStr = document.getElementById('fecha-vuelta').value;
  const pasajeros = parseInt(document.getElementById('pasajeros').value, 10);

  const mensajeError = document.getElementById('mensaje-error');
  const resultado = document.getElementById('resultado');
  mensajeError.textContent = '';
  resultado.textContent = '';

  // Validar fechas
  const fechaIda = new Date(fechaIdaStr);
  const fechaVuelta = fechaVueltaStr ? new Date(fechaVueltaStr) : null;

  if (tipo === 'ida-vuelta') {
    if (!fechaVueltaStr) {
      mensajeError.textContent = 'Debe seleccionar una fecha de vuelta.';
      return;
    }

    if (isNaN(fechaIda.getTime()) || isNaN(fechaVuelta.getTime())) {
      mensajeError.textContent = 'Las fechas ingresadas no son válidas.';
      return;
    }

    if (fechaVuelta <= fechaIda) {
      mensajeError.textContent = 'La fecha de vuelta debe ser posterior a la de ida.';
      return;
    }
  }

  const precios = {
    'COR': 120000,
    'MDZ': 210800,
    'BUE': 135000
  };

  if (!precios[destino]) {
    mensajeError.textContent = 'Seleccione un destino válido.';
    return;
  }

  if (isNaN(pasajeros) || pasajeros < 1) {
    mensajeError.textContent = 'Ingrese un número válido de pasajeros.';
    return;
  }

  let precioBase = precios[destino];
  if (tipo === 'ida') {
    precioBase = precioBase / 2;
  }

  let total = precioBase * pasajeros;
  total = total * 1.21;

  resultado.textContent = `Precio total: $${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
});
