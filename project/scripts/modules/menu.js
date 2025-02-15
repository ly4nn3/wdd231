export function initializeNavigation() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            hamburgerMenu.textContent = navMenu.classList.contains('active') ? '✖' : '☰';
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburgerMenu.textContent = '☰';
            document.body.style.overflow = '';
        });
    });
}