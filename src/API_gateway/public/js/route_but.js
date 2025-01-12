window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('char_back_but').addEventListener('click', function () {
        const route = this.getAttribute('data-route');
        window.location.href = route;
    });
    
    document.getElementById('char_vinc_but').addEventListener('click', function () {
        const route = this.getAttribute('data-route');
        window.location.href = route;
    });
});
