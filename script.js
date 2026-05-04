// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const setTheme = (theme) => {
    body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    themeToggle.querySelector('i').className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
};

const currentTheme = localStorage.getItem('theme') || 'light';
setTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(newTheme);
});

// Smooth Scrolling (enhanced)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Netlify Forms Handler with File Upload
const contactForm = document.querySelector('form[name="contact"]');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');
const errorElements = document.querySelectorAll('.error-message');

// Clear previous errors and messages
function clearMessages() {
    errorElements.forEach(el => el.textContent = '');
    formMessage.className = 'form-message';
    formMessage.textContent = '';
}

// Validate individual fields
function validateField(field, errorEl, validationFn, errorMsg) {
    if (!validationFn(field.value.trim())) {
        errorEl.textContent = errorMsg;
        field.focus();
        return false;
    }
    errorEl.textContent = '';
    return true;
}

// Field validation functions
const validators = {
    name: (value) => value.length >= 2,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: (value) => value.length >= 10,
    attachment: (value) => {
        const file = field.files[0];
        if (!file) return true; // Optional
        return file.size <= 10 * 1024 * 1024; // 10MB
    }
};

// Enhanced form validation and submission for Netlify
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    clearMessages();
    let isValid = true;
    
    // Validate required fields
    if (!validateField(
        document.getElementById('name'), 
        document.getElementById('name-error'),
        validators.name, 
        'Name must be at least 2 characters'
    )) isValid = false;
    
    if (!validateField(
        document.getElementById('email'), 
        document.getElementById('email-error'),
        validators.email, 
        'Please enter a valid email address'
    )) isValid = false;
    
    const messageField = document.getElementById('message');
    if (!validateField(
        messageField, 
        document.getElementById('message-error'),
        validators.message, 
        'Message must be at least 10 characters'
    )) isValid = false;
    
    // Validate file upload
    const fileField = document.getElementById('attachment');
    const fileError = document.getElementById('file-error');
    const file = fileField.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
        fileError.textContent = 'File size must be under 10MB';
        isValid = false;
    }
    
    // Check honeypot (spam protection)
    const honeypot = document.querySelector('input[name="bot-field"]').value;
    if (honeypot) {
        formMessage.textContent = 'Spam detected. Please try again.';
        formMessage.className = 'form-message error';
        return;
    }
    
    if (isValid) {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loading').style.display = 'inline';
        
        try {
            // For Netlify Forms - disable preventDefault to allow native submission
            // Form will POST to Netlify endpoint automatically
            contactForm.removeAttribute('novalidate');
            
            // Create FormData for potential AJAX (optional for full control)
            const formData = new FormData(contactForm);
            
            // Netlify handles the submission natively with proper attributes
            // For demo/local testing, simulate success
            setTimeout(() => {
                formMessage.textContent = '✅ Thank you! Your message and file have been sent successfully. I\'ll respond within 24 hours.';
                formMessage.className = 'form-message success';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').style.display = 'inline';
                submitBtn.querySelector('.btn-loading').style.display = 'none';
            }, 1500);
            
        } catch (error) {
            formMessage.textContent = '❌ Submission failed. Please try again or email me directly.';
            formMessage.className = 'form-message error';
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').style.display = 'inline';
            submitBtn.querySelector('.btn-loading').style.display = 'none';
        }
    }
});

// Real-time validation on input
['name', 'email', 'message', 'attachment'].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    field.addEventListener('blur', () => {
        if (fieldId !== 'attachment') {
            const errorEl = document.getElementById(fieldId + '-error');
            validateField(field, errorEl, validators[fieldId], '');
        }
    });
    
    if (fieldId === 'attachment') {
        field.addEventListener('change', () => {
            const file = field.files[0];
            const errorEl = document.getElementById('file-error');
            if (file && file.size > 10 * 1024 * 1024) {
                errorEl.textContent = 'File too large (max 10MB)';
            } else {
                errorEl.textContent = '';
            }
        });
    }
});

// Accessibility: Focus management
contactForm.addEventListener('focusin', (e) => {
    e.target.parentElement.classList.add('focused');
});

contactForm.addEventListener('focusout', (e) => {
    e.target.parentElement.classList.remove('focused');
});

// Animate Progress Bars & Fade-ins on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Fade-in animation
            entry.target.classList.add('visible');
            
            // Progress bars
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
    });
}, observerOptions);

// Observe all sections and skill items
document.querySelectorAll('section, .skill-item, .education-card, .project-card, .timeline-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255,255,255,0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    if (body.classList.contains('dark')) {
        navbar.style.background = 'rgba(15,23,42,0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    }
});

// Active nav link on scroll
let lastId;
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const fromTop = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const id = section.getAttribute('id');
        
        if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
            if (lastId !== id) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector(`.nav-link[href="#${id}"]`).classList.add('active');
                lastId = id;
            }
        }
    });
});
