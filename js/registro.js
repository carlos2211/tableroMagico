(() => {
  'use strict';

  const form = document.getElementById('formRegistro');
  if (!form) return;

  const email = document.getElementById('email');
  const pass1 = document.getElementById('password');
  const pass2 = document.getElementById('password2');
  const fechaNac = document.getElementById('fechaNacimiento');
  const indicador = document.getElementById('indicadorFuerza');
  const verPass = document.getElementById('verPass');
  const verPass2 = document.getElementById('verPass2');

  // Toggle ver contraseña
  const toggle = (input, btn) => {
    btn.addEventListener('click', () => {
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? 'Ver' : 'Ocultar';
    });
  };
  toggle(pass1, verPass);
  toggle(pass2, verPass2);

  // Validador edad >= 13
  const esMayor13 = (valorISO) => {
    if (!valorISO) return false;
    const hoy = new Date();
    const fecha = new Date(valorISO);
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) edad--;
    return edad >= 13;
  };

  // Fuerza de contraseña simple
  const fuerza = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (pwd.length >= 12) score++;
    return score; // 0-4
  };

  const pintarFuerza = (score) => {
    const map = {
      0: ['bg-secondary', 'Seguridad: -'],
      1: ['bg-danger', 'Seguridad: Baja'],
      2: ['bg-warning', 'Seguridad: Media'],
      3: ['bg-info', 'Seguridad: Buena'],
      4: ['bg-success', 'Seguridad: Excelente']
    };
    if (!indicador) return;
    indicador.className = 'badge ' + map[score][0];
    indicador.textContent = map[score][1];
  };

  pass1.addEventListener('input', () => {
    pintarFuerza(fuerza(pass1.value));
    // reset coincidencia si cambia
    if (pass2.value) validarCoincidencia();
  });

  const validarCoincidencia = () => {
    if (pass1.value !== pass2.value) {
      pass2.setCustomValidity('No coinciden');
    } else {
      pass2.setCustomValidity('');
    }
  };
  pass2.addEventListener('input', validarCoincidencia);

  // Validar fecha (>=13 años)
  fechaNac.addEventListener('input', () => {
    if (!esMayor13(fechaNac.value)) {
      fechaNac.setCustomValidity('Debes tener al menos 13 años');
    } else {
      fechaNac.setCustomValidity('');
    }
  });

  // Validación HTML5 + custom
 form.addEventListener('submit', (event) => {
  validarCoincidencia();
  if (!esMayor13(fechaNac.value)) {
    fechaNac.setCustomValidity('Debes tener al menos 13 años');
  }

  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add('was-validated');
  } else {
    event.preventDefault();

    // Simular registro
    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem('registroComprador', JSON.stringify({ ...data, fechaRegistro: new Date().toISOString() }));

    form.reset();
    form.classList.remove('was-validated');
    pintarFuerza(0);

    // Eliminar los íconos verdes/rojos después de limpiar
  form.querySelectorAll('.is-valid, .is-invalid').forEach((el) => {
    el.classList.remove('is-valid', 'is-invalid');
  });

    const toastEl = document.getElementById('registroOk');
    if (toastEl) {
      const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 });
      toast.show();
    }
  }
});


  // Dinámica de clases en vivo
  form.querySelectorAll('input').forEach((el) => {
    el.addEventListener('input', () => {
      if (el.checkValidity()) {
        el.classList.remove('is-invalid');
        el.classList.add('is-valid');
      } else {
        el.classList.remove('is-valid');
      }
    });
  });
})();