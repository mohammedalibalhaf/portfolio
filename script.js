// ================= MOBILE MENU =================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// ================= THEME TOGGLE =================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
    body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);

    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

setTheme(localStorage.getItem('theme') || 'dark');

themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(newTheme);
});


// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// ================= CONTACT FORM =================
const form = document.querySelector('form[name="contact"]');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');

function showMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.className = `form-message ${type}`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const file = document.getElementById('attachment').files[0];

    // Validation
    if (name.value.trim().length < 2) {
        showMessage("Name too short", "error");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showMessage("Invalid email", "error");
        return;
    }

    if (message.value.trim().length < 10) {
        showMessage("Message too short", "error");
        return;
    }

    if (file && file.size > 10 * 1024 * 1024) {
        showMessage("File must be < 10MB", "error");
        return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display = 'none';
    submitBtn.querySelector('.btn-loading').style.display = 'inline';

    // Simulate send (Netlify will handle real submit)
    setTimeout(() => {
        showMessage("✅ Message sent successfully!", "success");
        form.reset();

        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').style.display = 'inline';
        submitBtn.querySelector('.btn-loading').style.display = 'none';
    }, 1500);
});


// ================= SCROLL ANIMATIONS =================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate progress bars
            entry.target.querySelectorAll('.progress').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .skill-item, .project-card, .education-card').forEach(el => {
    observer.observe(el);
});


// ================= NAVBAR + ACTIVE LINK =================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;

    // Navbar background
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.background = body.classList.contains('dark')
            ? 'rgba(15,23,42,0.9)'
            : 'rgba(255,255,255,0.9)';
    }

    // Active link
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});


// ================= TYPING EFFECT =================
const typingEl = document.querySelector('.typing');

if (typingEl) {
    const words = ["IoT Engineer", "ESP32 Developer", "Web Developer"];
    let i = 0, j = 0, current = "", deleting = false;

    function type() {
        current = words[i];

        if (!deleting) {
            typingEl.textContent = current.substring(0, j++);
            if (j > current.length) {
                deleting = true;
                setTimeout(type, 1000);
                return;
            }
        } else {
            typingEl.textContent = current.substring(0, j--);
            if (j === 0) {
                deleting = false;
                i = (i + 1) % words.length;
            }
        }

        setTimeout(type, deleting ? 50 : 100);
    }

    type();
}
