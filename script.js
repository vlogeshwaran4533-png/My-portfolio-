// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Typing Animation =====
const roles = [
  'Cyber Security Engineering Student',
  'Ethical Hacker in Training',
  'Network Defense Enthusiast',
  'Aspiring Penetration Tester'
];
const typedEl = document.getElementById('typedText');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

// ===== Scroll Spy for Nav =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function onScrollSpy() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', onScrollSpy);
onScrollSpy();

// ===== Navbar background on scroll =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(0,0,0,.5)' : 'none';
});

// ===== Reveal on scroll (fade/slide-up for cards & sections) =====
const revealTargets = document.querySelectorAll(
  '.about-text, .about-stats, .skill-card, .project-card, .timeline-item, .cert-card, .contact-form, .contact-links, .section-label, .section-title'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ===== Animated counters (About stats) =====
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        count += step;
        if (count >= target) {
          el.textContent = target;
        } else {
          el.textContent = count;
          requestAnimationFrame(tick);
        }
      };
      tick();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => counterObserver.observe(c));

// ===== Skill bar fill animation =====
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.getAttribute('data-level') + '%';
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => barObserver.observe(b));

// ===== Contact form (front-end only demo) =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = '> transmitting...';
  setTimeout(() => {
    formStatus.textContent = '> message sent successfully. I will respond soon.';
    contactForm.reset();
  }, 1200);
});

// ===== Resume download placeholder =====
document.getElementById('resumeBtn').addEventListener('click', (e) => {
  // Replace 'resume.pdf' with the actual resume file path when available
  const resumePath = 'resume.pdf';
  fetch(resumePath, { method: 'HEAD' }).then(res => {
    if (!res.ok) {
      e.preventDefault();
      formStatusFallback();
    }
  }).catch(() => {
    e.preventDefault();
    formStatusFallback();
  });
});

function formStatusFallback() {
  alert('Resume file not found. Add your resume.pdf to this folder and link it to the Download Resume button.');
}
