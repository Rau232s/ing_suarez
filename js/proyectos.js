document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MANEJO DEL MENÚ HAMBURGUESA
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

    // 2. OVERLAY DE TRANSICIÓN ENTRADA
    const overlay = document.getElementById('pageTransitionOverlay');
    if (overlay) {
        setTimeout(() => overlay.classList.add('fade-in-complete'), 100);
    }

    // 3. MOVIMIENTO INFINITO DEL CARRUSEL Y PAUSA ON-HOVER
    const track = document.getElementById('carouselTrack');
    const cards = Array.from(track.children);

    // Duplicar elementos para efecto infinito continuo
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    let currentX = 0;
    let speed = 1.1; // Velocidad suave
    let isPaused = false;

    function animateCarousel() {
        if (!isPaused) {
            currentX -= speed;
            const trackWidth = track.scrollWidth / 2;
            if (Math.abs(currentX) >= trackWidth) {
                currentX = 0; // Reinicio invisible sin saltos
            }
            track.style.transform = `translateX(${currentX}px)`;
        }
        requestAnimationFrame(animateCarousel);
    }

    animateCarousel();

    // 4. GALERÍA INTERNA DESVANECIDA (CROSSFADE) ON-HOVER CON DELAY
    const allCards = track.querySelectorAll('.project-card');

    allCards.forEach(card => {
        let slideInterval;
        let hoverTimeout;
        const slides = card.querySelectorAll('.slide-img');
        let currentSlide = 0;

        card.addEventListener('mouseenter', () => {
            isPaused = true; // Detiene la rotación continua del carrusel

            // Retardo de 300ms para asegurar intención de hover
            hoverTimeout = setTimeout(() => {
                slideInterval = setInterval(() => {
                    slides[currentSlide].classList.remove('active');
                    currentSlide = (currentSlide + 1) % slides.length;
                    slides[currentSlide].classList.add('active');
                }, 2200); // Cambia cada 2.2 segundos
            }, 300);
        });

        card.addEventListener('mouseleave', () => {
            isPaused = false; // Reanuda la rotación del carrusel
            clearTimeout(hoverTimeout);
            clearInterval(slideInterval);

            // Regresa a la primera foto principal
            slides.forEach(s => s.classList.remove('active'));
            currentSlide = 0;
            slides[0].classList.add('active');
        });
    });
});