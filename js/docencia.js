document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menú Hamburguesa
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const menuOverlay = document.getElementById('menuOverlay');

    if (hamburgerBtn && menuOverlay) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            menuOverlay.classList.toggle('open');
        });

        const navLinks = menuOverlay.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                menuOverlay.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!menuOverlay.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                menuOverlay.classList.remove('open');
            }
        });
    }

    // 2. Overlay Transición Entrada
    const overlay = document.getElementById('pageTransitionOverlay');
    if (overlay) {
        setTimeout(() => {
            overlay.classList.add('fade-in-complete');
        }, 100);
    }
});