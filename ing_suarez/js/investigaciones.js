document.addEventListener('DOMContentLoaded', () => {
    
    // ======================================================
    // 1. MANEJO DEL MENÚ HAMBURGUESA Y NAVEGACIÓN
    // ======================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const menuOverlay = document.getElementById('menuOverlay');

    if (hamburgerBtn && menuOverlay) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            menuOverlay.classList.toggle('open');
        });

        // Cierra el menú al hacer clic en cualquier enlace
        const navLinks = menuOverlay.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                menuOverlay.classList.remove('open');
            });
        });

        // Cierra el menú al hacer clic fuera de él
        document.addEventListener('click', (e) => {
            if (!menuOverlay.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                menuOverlay.classList.remove('open');
            }
        });
    }

    // ======================================================
    // 2. OVERLAY DE TRANSICIÓN DE ENTRADA
    // ======================================================
    const overlay = document.getElementById('pageTransitionOverlay');
    if (overlay) {
        setTimeout(() => {
            overlay.classList.add('fade-in-complete');
        }, 100);
    }

    // ======================================================
    // 3. REVELADO SUAVE Y FLOTABILIDAD DE LAS TARJETAS
    // ======================================================
    const cards = document.querySelectorAll('.research-card');
    cards.forEach((card, index) => {
        // Aplica un retardo escalonado de entrada
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
});