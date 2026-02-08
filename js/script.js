// Mobile nav toggle
const burger = document.querySelector('.burger');
const mobileNav = document.getElementById('navMenu');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const open = mobileNav.style.display === 'flex';
    mobileNav.style.display = open ? 'none' : 'flex';
    burger.setAttribute('aria-expanded', String(!open));
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.style.display = 'none';
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Intersection Observer for reveal-on-scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth anchor offset for sticky header (optional fine-tune)
const header = document.querySelector('.site-header');
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const headerH = header.offsetHeight || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - (headerH + 8);
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});
