let currentPage = 1;
const TOTAL_PAGES = 5;
let isNavigating = false;

// -------------------------------------------------------------
// 1. SISTEMA DE NAVEGACIÓN ENTRE PÁGINAS (1 A 5)
// -------------------------------------------------------------
function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > TOTAL_PAGES || isNavigating) return;
    
    isNavigating = true;
    console.log(`Navegando a la Página ${pageNumber}...`);
    currentPage = pageNumber;

    // Lógica para alternar vistas (Single Page Application)
    // Ejemplo: transiciones de desplazamiento de secciones
    
    setTimeout(() => {
        isNavigating = false;
    }, 1000); // Debounce / Cooldown de 1s
}

function nextPage() {
    if (currentPage < TOTAL_PAGES) {
        goToPage(currentPage + 1);
    } else {
        goToPage(1); // Bucle opcional de retorno a la inicio
    }
}

function prevPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

// -------------------------------------------------------------
// 2. EVENTOS GLOBAL DE RATÓN Y RUEDA (SCROLL & CLIC)
// -------------------------------------------------------------

// Control por Rueda del Mouse
window.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
        nextPage();
    } else if (e.deltaY < 0) {
        prevPage();
    }
}, { passive: true });

// Control por Clics en Pantalla
window.addEventListener("click", (e) => {
    // Si se hace clic en cualquier lugar, avanza de página
    nextPage();
});

// Clic Derecho para Retroceder de Página
window.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // Previene el menú contextual del navegador
    prevPage();
});

// -------------------------------------------------------------
// 3. CICLO INTERMITENTE DEL BOTÓN (3s Visible / 3s Oculto)
// -------------------------------------------------------------
const enterButton = document.getElementById("enterButton");

function startButtonLoop() {
    if (!enterButton) return;

    setInterval(() => {
        // Alternar visibilidad con animación CSS
        if (enterButton.classList.contains("button-hidden")) {
            enterButton.classList.remove("button-hidden");
        } else {
            enterButton.classList.add("button-hidden");
        }
    }, 3000); // Alterna cada 3000ms (3 segundos)
}

document.addEventListener("DOMContentLoaded", startButtonLoop);
/*======================================================
SISTEMA DE NAVEGACIÓN Y TRANSICIÓN CON RUEDA DEL RATÓN
======================================================*/

let currentPage = 1;
const TOTAL_PAGES = 5;
let isAnimating = false; // Bloqueo para evitar superposición de animaciones
const ANIMATION_DURATION = 800; // Duración de la transición en ms (debe coincidir con CSS)

/**
 * Cambia de página aplicando el efecto Fade Out / Fade In
 * @param {number} newPage - Número de página a la que se desea ir
 */
function navigateToPage(newPage) {
    if (isAnimating || newPage === currentPage || newPage < 1 || newPage > TOTAL_PAGES) return;

    isAnimating = true;

    const currentEl = document.getElementById(`page-${currentPage}`);
    const nextEl = document.getElementById(`page-${newPage}`);

    if (currentEl) {
        // 1. Iniciar desvanecimiento de la página actual
        currentEl.classList.remove("active");
        currentEl.classList.add("fade-out");
    }

    setTimeout(() => {
        if (currentEl) {
            currentEl.classList.remove("fade-out");
        }

        // 2. Aparecer con desvanecimiento la nueva página
        if (nextEl) {
            nextEl.classList.add("active");
        }

        currentPage = newPage;

        // Liberar el bloqueo tras finalizar la animación
        setTimeout(() => {
            isAnimating = false;
        }, ANIMATION_DURATION / 2);

    }, ANIMATION_DURATION / 2);
}

// -------------------------------------------------------------
// EVENTO: DETECTAR RUEDA DEL RATÓN (SCROLL WHEEL)
// -------------------------------------------------------------
window.addEventListener("wheel", (e) => {
    // Si la rueda va hacia abajo -> Avanzar
    if (e.deltaY > 0) {
        if (currentPage < TOTAL_PAGES) {
            navigateToPage(currentPage + 1);
        } else {
            navigateToPage(1); // Retorno en bucle a la primera página (opcional)
        }
    } 
    // Si la rueda va hacia arriba -> Retroceder
    else if (e.deltaY < 0) {
        if (currentPage > 1) {
            navigateToPage(currentPage - 1);
        }
    }
}, { passive: true });

// -------------------------------------------------------------
// EVENTO: CLIC EN PANTALLA (Avanzar) / CLIC DERECHO (Retroceder)
// -------------------------------------------------------------
window.addEventListener("click", (e) => {
    // Evita activar el cambio de página si el clic es sobre un botón interactivo
    if (e.target.closest("button, a, input, textarea")) return;

    if (currentPage < TOTAL_PAGES) {
        navigateToPage(currentPage + 1);
    } else {
        navigateToPage(1);
    }
});

window.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // Desactiva el menú contextual predeterminado
    if (currentPage > 1) {
        navigateToPage(currentPage - 1);
    }
});