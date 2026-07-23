/*======================================================
  LÓGICA SOBRE MÍ: CURSOR, ENTRADA, MOLÉCULAS Y CARRUSEL
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    // 1. SEGUIMIENTO FLUIDO DEL CURSOR CIRCULAR
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");

    if (cursor && follower && window.innerWidth > 900) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let followerX = mouseX;
        let followerY = mouseY;

        // Escuchar posición del mouse
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Punto central inmediato
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        });

        // Bucle de animación suave para el círculo seguidor
        function renderCursor() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;

            requestAnimationFrame(renderCursor);
        }
        renderCursor();
    }

    // 2. TRANSICIÓN DE ENTRADA ZOOM + FADE IN
    const transitionOverlay = document.getElementById("pageTransitionOverlay");
    const bentoGrid = document.getElementById("bentoGrid");

    setTimeout(() => {
        if (transitionOverlay) {
            transitionOverlay.classList.add("fade-in-complete");
        }
        if (bentoGrid) {
            bentoGrid.classList.add("viewport-appeared");
        }
    }, 120);

    // 3. MENÚ HAMBURGUESA Y TRANSICIÓN AL CAMBIAR DE PÁGINA
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const menuOverlay = document.getElementById("menuOverlay");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburgerBtn && menuOverlay) {
        hamburgerBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            menuOverlay.classList.toggle("open");
        });

        document.addEventListener("click", (e) => {
            if (!menuOverlay.contains(e.target) && e.target !== hamburgerBtn) {
                menuOverlay.classList.remove("open");
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetUrl = link.getAttribute("href");

            if (targetUrl && !targetUrl.startsWith("#")) {
                e.preventDefault();

                if (transitionOverlay) {
                    transitionOverlay.classList.remove("fade-in-complete");
                }

                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 400);
            }
        });
    });

    // 4. CANVAS DE MOLÉCULAS FLOTANTES
    const canvas = document.getElementById("molecules-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const particleCount = Math.min(Math.floor(window.innerWidth / 25), 40);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                radius: Math.random() * 2 + 1.2
            });
        }

        function animateMolecules() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particleCount; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(140, 67, 54, 0.4)";
                ctx.fill();

                for (let j = i + 1; j < particleCount; j++) {
                    let p2 = particles[j];
                    let dist = Math.hypot(p.x - p2.x, p.y - p2.y);

                    if (dist < 125) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(140, 67, 54, ${0.16 - dist / 125 * 0.16})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateMolecules);
        }
        animateMolecules();
    }

    // 5. CONTROL DEL CARRUSEL DE TRAYECTORIA
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const counter = document.getElementById("carouselCounter");

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        if (counter) {
            const formattedIndex = String(index + 1).padStart(2, '0');
            const formattedTotal = String(totalSlides).padStart(2, '0');
            counter.textContent = `${formattedIndex} / ${formattedTotal}`;
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel(currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel(currentIndex);
        });
    }

    setInterval(() => {
        if (window.innerWidth > 900) {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel(currentIndex);
        }
    }, 7000);
});