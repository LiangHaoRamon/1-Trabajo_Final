window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('vinc_back_but').addEventListener('click', function () {
        const route = this.getAttribute('data-route');
        window.location.href = route;
    });
});
