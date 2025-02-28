// script.js

// Tela de carregamento
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen && setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.body.style.overflow = 'visible';
    }, 1500);
});

// Cursor personalizado
const cursor = document.querySelector('.custom-cursor');
cursor && document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
cursor && document.addEventListener('mousedown', () => cursor.style.transform = 'scale(0.8)');
cursor && document.addEventListener('mouseup', () => cursor.style.transform = 'scale(1)');

// Efeito de digitação
const typingText = document.querySelector('.typing-text');
const texts = ['Marcos Developer', 'UI/UX Designer'];
let textIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    typingText.textContent = isDeleting ? currentText.substring(0, charIndex - 1) : currentText.substring(0, charIndex + 1);
    charIndex += isDeleting ? -1 : 1;
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

typingText && type();

// Animação de contadores
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        if (count < target) {
            counter.innerText = Math.ceil(count + target / 200);
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target;
        }
    };
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            updateCount();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(counter);
});

// Filtragem de projetos
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.getAttribute('data-filter');
    projectCards.forEach(card => card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) ? 'block' : 'none');
}));

// Formulário de contato
const contactForm = document.getElementById('contact-form');
contactForm && contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const statusText = document.getElementById("status");
    const loadingText = document.getElementById("loading");
    loadingText.style.display = "block";
    statusText.innerHTML = "";
    fetch(this.action, {
        method: this.method,
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        loadingText.style.display = "none";
        statusText.innerHTML = response.ok ? "Mensagem enviada com sucesso!" : "Ocorreu um erro ao enviar a mensagem.";
        if (response.ok) this.reset();
    }).catch(() => {
        loadingText.style.display = "none";
        statusText.innerHTML = "Falha ao conectar ao servidor.";
    });
});

// Sistema de notificação
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification && (notification.textContent = message, notification.classList.add('show'), setTimeout(() => notification.classList.remove('show'), 3000));
}

// Botão "Voltar ao topo"
const backToTop = document.getElementById('back-to-top');
backToTop && (window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 500)), backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })));

// Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
}));

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle && navLinks && navToggle.addEventListener('click', () => navLinks.classList.toggle('show'));

// Alternância de tema
const themeToggle = document.getElementById('theme-toggle');
let isDarkMode = true;
themeToggle && themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode');
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    showNotification(`Switched to ${isDarkMode ? 'dark' : 'light'} mode`);
});