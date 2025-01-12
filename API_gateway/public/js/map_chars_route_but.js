window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.getElementsByClassName('map_planet_but');

    for (const button of buttons) {
        button.addEventListener('click', function () {
            const route = this.getAttribute('data-route');
            if (route) {
                window.location.href = route;
            }
        });
    }
});