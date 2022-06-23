const reviewsToggleBtn = document.querySelectorAll('.toggle-btn');

reviewsToggleBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.parentElement.nextElementSibling.classList.toggle('content-reviews-show');
    });
});

function ativar() {
    document.querySelectorAll('.content-reviews')[0].classList.toggle('content-reviews-show');
}
// document.querySelectorAll('.content-reviews')[0].classList.add('content-reviews-show');
// document.querySelectorAll('.content-reviews')[0].classList.remove('content-reviews-show');