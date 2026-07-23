/* =============================================================
   script.js — Portfolio interactive enhancements
   - Sticky nav with scroll state
   - Active section tracking (nav highlight)
   - Intersection Observer scroll-reveal
   - Typewriter effect
   - Contact form via EmailJS
   ============================================================= */

// ─── CONFIG ──────────────────────────────────────────────────
// Replace these values after creating a free EmailJS account:
//   https://www.emailjs.com/
// 1. Sign up → Email Services → Add Service (Gmail / Outlook)
// 2. Email Templates → Create Template (use {{from_name}}, {{from_email}}, {{subject}}, {{message}})
// 3. Account → Public Key
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'abcDEFghiJKL'
// ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();
  initNavScroll();
  initScrollReveal();
  initTypewriter();
  initActiveNav();
  initSmoothScroll();
  initContactForm();
});

/* ── EmailJS init ─────────────────────────────────────────── */
function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
}

/* ── Nav: glass effect on scroll ─────────────────────────── */
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handler = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', handler, { passive: true });
  handler(); // run on load
}

/* ── Scroll-reveal via IntersectionObserver ──────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for siblings
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 320);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

/* ── Typewriter effect ───────────────────────────────────── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Backend Engineer.',
    'AI Systems Builder.',
    'Full-Stack Developer.',
    'Problem Solver.',
  ];

  // Ensure cursor is the last child
  let cursor = el.querySelector('.cursor');
  if (!cursor) {
    cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    el.appendChild(cursor);
  }

  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseTimer = null;

  const TYPING_SPEED   = 80;
  const DELETING_SPEED = 45;
  const PAUSE_AFTER    = 1800;
  const PAUSE_BEFORE   = 300;

  function tick() {
    const current = roles[roleIdx];

    if (!deleting) {
      charIdx++;
      setText(current.slice(0, charIdx));

      if (charIdx === current.length) {
        deleting = true;
        pauseTimer = setTimeout(tick, PAUSE_AFTER);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      charIdx--;
      setText(current.slice(0, charIdx));

      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }
      setTimeout(tick, DELETING_SPEED);
    }
  }

  function setText(text) {
    // Keep cursor at end
    el.textContent = text;
    el.appendChild(cursor);
  }

  setTimeout(tick, 800);
}

/* ── Active nav link tracking ────────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach(s => observer.observe(s));
}

/* ── Smooth scroll for anchor links ─────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Contact form via EmailJS ────────────────────────────── */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const status  = document.getElementById('form-status');
  const btn     = document.getElementById('form-submit');
  const btnText = document.getElementById('form-btn-text');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Loading state
    btn.disabled = true;
    btnText.textContent = 'Sending…';
    hideStatus();

    // Check if EmailJS is configured
    if (
      EMAILJS_SERVICE_ID  === 'YOUR_SERVICE_ID' ||
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      EMAILJS_PUBLIC_KEY  === 'YOUR_PUBLIC_KEY'
    ) {
      // Demo mode — simulate success
      await sleep(1200);
      showStatus(
        'success',
        '✓ Demo mode: message not sent. Configure EmailJS keys in script.js to enable real sending.'
      );
      resetBtn();
      return;
    }

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      showStatus('success', '✓ Message sent! I\'ll reply within 24 hours.');
      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      showStatus('error', '✗ Failed to send. Please email me directly at alangirskgo@gmail.com');
    } finally {
      resetBtn();
    }
  });

  function showStatus(type, msg) {
    status.textContent = msg;
    status.className = `form-status ${type}`;
  }

  function hideStatus() {
    status.className = 'form-status';
    status.textContent = '';
  }

  function resetBtn() {
    btn.disabled = false;
    btnText.textContent = 'Send Message';
  }
}

/* ── Utility ─────────────────────────────────────────────── */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
