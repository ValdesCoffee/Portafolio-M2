const $form = document.querySelector('#miFormulario');
const $button = document.querySelector('#enviar-btn');

$form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que abra la página de Formspree

    // Cambiamos el estado del botón
    $button.innerText = "Enviando...";
    $button.disabled = true;

    const form = new FormData($form);

    // Enviamos los datos a Formspree
    const response = await fetch($form.action, {
        method: $form.method,
        body: form,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        $form.reset(); // Limpia el formulario
        alert('¡Gracias por contactarme! Te responderé pronto.');
    } else {
        alert('Ups, hubo un error al enviar. Inténtalo de nuevo.');
    }

    // Restauramos el botón
    $button.innerText = "Enviar mensaje";
    $button.disabled = false;
});


const inputs = document.querySelectorAll('input, textarea');

// Recuperar datos al cargar
inputs.forEach(input => {
    const savedValue = localStorage.getItem(input.id);
    if (savedValue) input.value = savedValue;
});

// Guardar datos mientras escribe
$form.addEventListener('input', (e) => {
    localStorage.setItem(e.target.id, e.target.value);
});
