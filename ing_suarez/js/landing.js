/*======================================================
LANDING CONTROLLER
Portafolio - Nino Raúl Suárez Loras
Versión 2.0 (Refactorizada)
======================================================*/

const title = document.getElementById("title");
const portfolio = document.getElementById("portfolio");
const enterButton = document.getElementById("enterButton");

const NAME = [
    "Nino Raul",
    "Suarez Loras"
];

const PORTFOLIO_TEXT = "PORTAFOLIO";
const BUTTON_TEXT = "Haz clic para continuar";

/*======================================================
UTILIDADES Y ESPERAS
======================================================*/

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function waitFonts() {
    if (document.fonts) {
        await document.fonts.ready;
    }
}

/*======================================================
CONSTRUCCIÓN DEL TÍTULO
======================================================*/

function createLine(text) {
    const line = document.createElement("div");
    line.className = "title-line";
    
    for (const character of text) {
        const span = document.createElement("span");
        span.className = "letter";
        span.textContent = character === " " ? "\u00A0" : character;
        line.appendChild(span);
    }
    return line;
}

async function showTitle() {
    if (!title) return;
    title.innerHTML = "";

    const line1 = createLine(NAME[0]);
    const line2 = createLine(NAME[1]);

    title.appendChild(line1);

    const space = document.createElement("div");
    space.style.width = "18px";
    title.appendChild(space);

    title.appendChild(line2);

    const letters = [
        ...line1.querySelectorAll(".letter"),
        ...line2.querySelectorAll(".letter")
    ];

    for (const letter of letters) {
        await wait(55);
        letter.classList.add("show");
    }
}

/*======================================================
REVELADO DE ELEMENTOS
======================================================*/

async function showPortfolio() {
    if (!portfolio) return;
    portfolio.textContent = PORTFOLIO_TEXT;
    portfolio.style.opacity = "1";
}

async function showButton() {
    if (!enterButton) return;
    enterButton.textContent = BUTTON_TEXT;
    enterButton.style.opacity = "1";
}

/*======================================================
ANIMACIÓN DE RESPIRACIÓN (BUTTON)
======================================================*/

function breatheButton() {
    if (!enterButton) return;

    // Obtención segura de delay desde CONFIG o fallback predeterminado
    const delay = (typeof CONFIG !== 'undefined' && CONFIG.landing && CONFIG.landing.enterDelay) 
        ? CONFIG.landing.enterDelay 
        : 500;

    setTimeout(() => {
        enterButton.animate(
            [
                { opacity: 1, transform: "translateY(0px)" },
                { opacity: 0.45, transform: "translateY(2px)" },
                { opacity: 1, transform: "translateY(0px)" }
            ],
            {
                duration: 2200,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    }, delay);
}

/*======================================================
INICIALIZACIÓN DE LA LANDING
======================================================*/

async function initLanding() {
    await waitFonts();
    await wait(300);
    await showTitle();
    await wait(250);
    await showPortfolio();
    await wait(350);
    await showButton();
    breatheButton();
}

// Iniciar secuencia cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initLanding);

/*======================================================
EVENTO AL HACER CLIC EN CONTINUAR
======================================================*/

if (enterButton) {
    enterButton.addEventListener("click", () => {
        enterButton.style.pointerEvents = "none";

        const landingSection = document.getElementById("landing");
        const mainContent = document.getElementById("main-content");

        // Si existe el contenido en la misma página (Single Page Application)
        if (landingSection && mainContent) {
            landingSection.classList.add("fade-out");
            
            setTimeout(() => {
                landingSection.style.display = "none";
                mainContent.classList.remove("main-content-hidden");
                mainContent.scrollIntoView({ behavior: "smooth" });
            }, 800);
        } else {
            // Si la arquitectura se mantiene separada por HTML
            window.location.href = "perfil.html";
        }
    });
}
