/* ============================================
   FOR THE PEOPLE - App JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile hamburger menu ----
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      hamburger.textContent = mainNav.classList.contains('open') ? '\u2715' : '\u2630';
    });
  }

  // Mobile dropdown toggles
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      // Close all others
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ---- Search ----
  const searchBtn = document.querySelector('.search-btn');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.querySelector('.search-input');

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      setTimeout(() => searchInput?.focus(), 100);
    });

    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) searchOverlay.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') searchOverlay.classList.remove('active');
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput?.focus(), 100);
      }
    });
  }

  // ---- Highlight current nav item ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage) {
      a.classList.add('active');
    }
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Reading progress bar ----
  const progress = document.querySelector('.reading-progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = pct + '%';
    });
  }

  // ---- Back to top ----
  const topBtn = document.createElement('button');
  topBtn.className = 'back-to-top';
  topBtn.innerHTML = '&#9650;';
  topBtn.title = 'Back to top';
  topBtn.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem; width: 44px; height: 44px;
    background: var(--navy); color: white; border: none; border-radius: 50%;
    font-size: 1.1rem; cursor: pointer; opacity: 0; transition: opacity 0.3s;
    z-index: 999; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(topBtn);

  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', () => {
    topBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
    topBtn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
  });

});
