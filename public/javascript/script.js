
document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('.img-1');
    if (img) {
        img.addEventListener('click', () => {
            window.location.href = '/'; 
        });
    }

    const button = document.querySelector('.btn-course');
    if (button) {
        button.addEventListener('click', () => {
            window.location.href = '/courses'; 
        });
    }
});

const button = document.querySelector('.log');
if (button) {
    button.addEventListener('click', () => {
        window.location.href = '/login'; 
    });
}
