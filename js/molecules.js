const canvas = document.getElementById("molecules");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
const particleCount = 60; // Optimizado para rendimiento
const maxDistance = 130;  // Distancia máxima para trazar línea entre partículas

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Estructura de Partícula
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebote en los bordes
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Repulsión sutil con el cursor del mouse
        if (typeof mouseX !== 'undefined' && mouseX > 0) {
            let dx = mouseX - this.x;
            let dy = mouseY - this.y;
            let dist = Math.hypot(dx, dy);
            if (dist < 100) {
                this.x -= (dx / dist) * 1.5;
                this.y -= (dy / dist) * 1.5;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(169, 110, 101, 0.5)"; // Color acorde a la paleta --accent
        ctx.fill();
    }
}

// Inicializar partículas
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Loop de animación principal
function animateMolecules() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Trazar líneas entre partículas cercanas
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.hypot(dx, dy);

            if (dist < maxDistance) {
                let alpha = (1 - dist / maxDistance) * 0.25;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(117, 106, 104, ${alpha})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateMolecules);
}

animateMolecules();