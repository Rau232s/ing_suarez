/*======================================================
  INTERACCIONES Y CONTROL RESPONSIVO DE TARJETAS
======================================================*/

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card-node");
    const centralNode = document.getElementById("centralNode");
    const organicBlob = document.getElementById("organicBlob");
    const svg = document.getElementById("connectionsSvg");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const menuOverlay = document.getElementById("menuOverlay");
    const transitionOverlay = document.getElementById("pageTransitionOverlay");
    const navLinks = document.querySelectorAll(".nav-link");

    // 1. ENTRADA SUAVE DE PÁGINA
    setTimeout(() => {
        if (transitionOverlay) {
            transitionOverlay.classList.add("fade-in-complete");
        }
    }, 100);

    // 2. FUNCIÓN PRINCIPAL DE CONTROL DE DISEÑO (ESCRITORIO VS MÓVIL)
    function handleLayout() {
        const isMobile = window.innerWidth <= 900;

        if (isMobile) {
            // EN MÓVIL: Limpiar cualquier trazo SVG
            if (svg) svg.innerHTML = "";

            // BORRAR ESTILOS INYECTADOS POR JS EN CADA TARJETA
            cards.forEach(card => {
                card.removeAttribute("style"); // Elimina top, left, transform inyectados por JS
                card.classList.add("reveal-show"); // Asegura visibilidad en lista vertical
            });

            if (organicBlob) organicBlob.removeAttribute("style");
        } else {
            // EN ESCRITORIO: Dibujar líneas SVG curvas
            drawCurvedConnections();
        }
    }

    // 3. DIBUJO DE LÍNEAS BÉZIER EN ESCRITORIO
    function drawCurvedConnections() {
        if (!centralNode || !svg || window.innerWidth <= 900) return;

        const containerRect = svg.getBoundingClientRect();
        const centerRect = centralNode.getBoundingClientRect();

        const centerX = centerRect.left + centerRect.width / 2 - containerRect.left;
        const centerY = centerRect.top + centerRect.height / 2 - containerRect.top;

        cards.forEach((card, index) => {
            const lineId = `line-path-${index}`;
            let path = document.getElementById(lineId);

            if (!path) {
                path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.id = lineId;
                path.classList.add("svg-connector-line");
                svg.appendChild(path);
            }

            card.setAttribute("data-line-id", lineId);

            const cardRect = card.getBoundingClientRect();
            const isLeft = cardRect.left < centerRect.left;

            const targetX = isLeft 
                ? (cardRect.right - containerRect.left) 
                : (cardRect.left - containerRect.left);
            const targetY = cardRect.top + cardRect.height / 2 - containerRect.top;

            const deltaX = targetX - centerX;
            const controlX1 = centerX + deltaX * 0.5;
            const controlY1 = centerY;
            const controlX2 = centerX + deltaX * 0.5;
            const controlY2 = targetY;

            const d = `M ${centerX} ${centerY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${targetX} ${targetY}`;
            path.setAttribute("d", d);
        });
    }

    // Ejecutar al cargar la página y al cambiar de tamaño de ventana
    handleLayout();
    window.addEventListener("resize", handleLayout);

    // 4. ANIMACIÓN DE ENTRADA EN ESCRITORIO
    if (window.innerWidth > 900) {
        cards.forEach((card, i) => {
            setTimeout(() => {
                card.classList.add("reveal-show");
            }, i * 130);
        });

        setTimeout(() => {
            cards.forEach(card => card.classList.add("floating-active"));
        }, 1000);
    }

    // 5. EFECTO HOVER EN ESCRITORIO (LÍNEAS ACTIVAS)
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            if (window.innerWidth <= 900) return;
            const lineId = card.getAttribute("data-line-id");
            const path = document.getElementById(lineId);
            if (path) path.classList.add("active-line");
        });

        card.addEventListener("mouseleave", () => {
            if (window.innerWidth <= 900) return;
            const lineId = card.getAttribute("data-line-id");
            const path = document.getElementById(lineId);
            if (path) path.classList.remove("active-line");
        });
    });

    // 6. PARALAJE DEL BLOB (SOLO ESCRITORIO)
    window.addEventListener("mousemove", (e) => {
        if (window.innerWidth <= 900 || !organicBlob || !centralNode) return;

        const moveX = (e.clientX - window.innerWidth / 2) * 0.025;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.025;

        organicBlob.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    // 7. TRANSICIONES AL HACER CLIC EN ENLACES
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetUrl = link.getAttribute("href");

            if (targetUrl && !targetUrl.startsWith("#")) {
                e.preventDefault();

                if (transitionOverlay) {
                    transitionOverlay.classList.remove("fade-in-complete");
                    transitionOverlay.classList.add("fade-out-active");
                }

                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 450);
            }
        });
    });

    // 8. MENÚ HAMBURGUESA
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
});