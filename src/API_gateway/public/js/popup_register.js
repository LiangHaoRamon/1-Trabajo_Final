window.addEventListener('DOMContentLoaded', () => {
    // Mostrar el popup de registro
    document.getElementById('indexButton-2').addEventListener('click', function() {
        const but = document.getElementById('registerPopup')
        // alert(but.textContent)
        but.classList.remove('hidden');
        // alert(but.classList)
    });

    // Ocultar el popup de registro
    document.getElementById('closePopup').addEventListener('click', function() {
        const but = document.getElementById('registerPopup')
        // alert(but.textContent)
        but.classList.add('hidden');
    });
});
