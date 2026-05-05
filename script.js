// MOBILE MENU
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// PROGRESS ANIMATION
document.querySelectorAll('.progress').forEach(bar => {
  const width = bar.dataset.width;
  bar.style.width = width + "%";
});

// ===== TYPING EFFECT =====
const typing = document.getElementById("typing");

const roles = [
  "IoT Engineer",
  "Web Developer",
  "Embedded Systems Developer",
  "ESP32 Specialist"
];

let i = 0;
let j = 0;
let deleting = false;

function type() {
  let text = roles[i];

  if (deleting) {
    typing.textContent = text.substring(0, j--);
  } else {
    typing.textContent = text.substring(0, j++);
  }

  if (!deleting && j === text.length) {
    deleting = true;
    setTimeout(type, 1500);
    return;
  }

  if (deleting && j === 0) {
    deleting = false;
    i = (i + 1) % roles.length;
  }

  setTimeout(type, deleting ? 50 : 100);
}

type();
