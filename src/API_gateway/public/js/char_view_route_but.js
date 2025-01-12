window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('back_map').addEventListener('click', function () {
        const route = this.getAttribute('data-route');
        window.location.href = route;
    });

    const buttons = document.getElementsByClassName('characters_sel_but');

    for (const button of buttons) {
        button.addEventListener('click', function () {
            const route = this.getAttribute('data-route');
            if (route) {
                window.location.href = route;
            }
        });
    }
});