gsap.registerPlugin(ScrollTrigger);

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 5, 0.95)';
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
    } else {
        navbar.style.background = 'rgba(5, 5, 5, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Hero Animations
const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

tl.from('.logo', { opacity: 0, y: -20, duration: 0.8 })
    .from('.nav-links li', { opacity: 0, y: -20, duration: 0.8, stagger: 0.1 }, '-=0.5')
    .from('.greeting', { opacity: 0, x: -20, duration: 0.8 }, '-=0.5')
    .from('.name', { opacity: 0, x: -20, duration: 0.8 }, '-=0.6')
    .from('.role', { opacity: 0, x: -20, duration: 0.8 }, '-=0.6')
    .from('.hero-desc', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
    .from('.hero-btns', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
    .from('.ai-orb', { opacity: 0, scale: 0.5, duration: 1 }, '-=1')
    .from('.profile-img', { opacity: 0, scale: 0.9, duration: 1 }, '-=0.8');

// Canvas Particle Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() * 0.5) - 0.25;
        this.speedY = (Math.random() * 0.5) - 0.25;
        this.opacity = Math.random() * 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = `rgba(3, 218, 198, ${this.opacity})`; // Secondary color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// Scroll Animations for Sections
gsap.utils.toArray('.section').forEach(section => {
    // Animate Title
    gsap.from(section.querySelector('.section-title'), {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    // Animate Containers
    const containers = section.querySelectorAll('.about-container, .skills-container, .timeline, .projects-grid, .education-grid, .contact-container');
    containers.forEach(container => {
        gsap.from(container, {
            scrollTrigger: {
                trigger: container, // Trigger relative to the container itself
                start: "top 85%",
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2
        });
    });
});
