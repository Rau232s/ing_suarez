const ring = document.createElement('div');
const dot = document.createElement('div');

ring.className = 'cursor-ring';
dot.className = 'cursor-dot';

document.body.appendChild(ring);
document.body.appendChild(dot);

let mouseX = -100, mouseY = -100;
let ringX = -100, ringY = -100;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // El punto se mueve instantáneamente con el mouse
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
});

// Suavizado (LERP) para el aro exterior
function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
}
renderCursor();

// Detectar elementos hoverables de forma dinámica
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('button, a, .interactive')) {
        ring.classList.add('expand');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('button, a, .interactive')) {
        ring.classList.remove('expand');
    }
});