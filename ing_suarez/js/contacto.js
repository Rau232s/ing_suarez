document.addEventListener("DOMContentLoaded", () => {
    // Transición de Entrada (Zoom + Fade In)
    const transitionOverlay = document.getElementById("pageTransitionOverlay");
    const bentoGrid = document.getElementById("bentoGrid");

    setTimeout(() => {
        if (transitionOverlay) transitionOverlay.classList.add("fade-in-complete");
        if (bentoGrid) bentoGrid.classList.add("viewport-appeared");
    }, 120);

    // Menú Hamburguesa
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

    // Transición de salida al hacer clic en enlaces
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
});