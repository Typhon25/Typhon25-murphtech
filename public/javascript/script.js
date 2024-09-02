
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