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

  // Search data - all chapters with descriptions for quick search
  const searchData = [
    { url: 'index.html', title: 'Home', chapter: 'Home', desc: 'Table of contents, mission statement, introduction' },
    { url: 'chapter1.html', title: 'Constitutional Warfare', chapter: 'Chapter 1', desc: 'Constitution foundation, why we built this, our commitment to truth' },
    { url: 'chapter2.html', title: 'The Military Oath', chapter: 'Chapter 2', desc: 'Oath of enlistment, chain of command, why devolution violates the oath, Joint Chiefs statement' },
    { url: 'chapter3.html', title: 'Foreign Information Warfare', chapter: 'Chapter 3', desc: 'Russia China Iran disinformation, misinformation malinformation, social media warfare, election interference' },
    { url: 'chapter4.html', title: 'Devolution Theory', chapter: 'Chapter 4', desc: 'Jon Herold Patel Patriot debunked, PEADs, Newsweek, EO 13961, FCD-0, X22 We The Media, 25 parts debunked' },
    { url: 'chapter4-danger.html', title: 'The Danger of the Devolution Theory', chapter: 'Chapter 4 Book', desc: 'Chris Lambe book, COG explained, executive orders, military loyalty, Deep State myth, Flynn white hats' },
    { url: 'chapter5.html', title: 'The Law of War', chapter: 'Chapter 5', desc: 'Derek Johnson debunked, 14S MOS, E-4, 21 months, Law of War Manual disclaimers, UCMJ, Marbury v Madison, EO 13848' },
    { url: 'chapter5-guard.html', title: 'The National Guard', chapter: 'Chapter 5', desc: 'Title 32 Title 10, AGR, federalization history, exercises, Vigilant Guard' },
    { url: 'chapter5-spaceforce.html', title: 'U.S. Space Force', chapter: 'Chapter 5', desc: 'USSF established 2019, SpOC SSC STARCOM, Guardians, Semper Supra' },
    { url: 'chapter6.html', title: 'Continuity of Government', chapter: 'Chapter 6', desc: 'PPD-40 COOP COG ECG, NSPD-51, FMRS, FCD-0, continuity planning, essential functions, civilian-led' },
    { url: 'chapter6-dsca.html', title: 'DSCA', chapter: 'Chapter 6', desc: 'Defense Support of Civil Authorities, military support civilian, Stafford Act, Posse Comitatus' },
    { url: 'chapter6-fcd1.html', title: 'Federal Continuity Directive 1', chapter: 'Chapter 6', desc: 'FCD-1 FCD-2, FEMA continuity requirements, PPD-40, Cold War origins' },
    { url: 'chapter6-devolution.html', title: 'True Devolution', chapter: 'Chapter 6', desc: 'Real devolution FEMA COOP, essential functions, alternate facilities, what devolution actually means' },
    { url: 'chapter7.html', title: 'Emergency Management', chapter: 'Chapter 7', desc: 'NRF NIMS ICS, four phases, five mission areas, FIOPs, FEMA, whole community' },
    { url: 'chapter8.html', title: 'The 1871 Act', chapter: 'Chapter 8', desc: 'Sovereign citizen, two constitutions debunked, Posse Comitatus white supremacist origins, municipal corporation, Reconstruction' },
    { url: 'chapter9.html', title: 'Q and QAnon', chapter: 'Chapter 9', desc: 'Q drops 4966, Ron Watkins 8kun, propaganda funnel, trust the plan, cult behavior, Bezmenov Khrushchev, Book of Q' },
    { url: 'faq.html', title: 'FAQ', chapter: 'FAQ', desc: 'Frequently asked questions, PEADs, commander in chief, Posse Comitatus, devolution definition' },
    { url: 'about.html', title: 'About', chapter: 'About', desc: 'Chris Lambe veteran, Master Emergency Management Trident University, FEMA L-1301' },
  ];

  if (searchOverlay) {
    // Open search with Ctrl+K or search button
    const openSearch = () => {
      searchOverlay.classList.add('active');
      setTimeout(() => searchInput?.focus(), 100);
    };

    if (searchBtn) searchBtn.addEventListener('click', openSearch);

    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) searchOverlay.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') searchOverlay.classList.remove('active');
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    });

    // Search functionality
    if (searchInput) {
      const resultsDiv = document.getElementById('searchResults');
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase().trim();
        if (!q || q.length < 2) { resultsDiv.innerHTML = ''; return; }
        const matches = searchData.filter(item =>
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.chapter.toLowerCase().includes(q)
        );
        resultsDiv.innerHTML = matches.length === 0
          ? '<div class="search-result"><div class="title">No results found</div></div>'
          : matches.map(m => `
            <a href="${m.url}" class="search-result" style="display:block;text-decoration:none;color:inherit">
              <div class="chapter">${m.chapter}</div>
              <div class="title">${m.title}</div>
              <div class="excerpt">${m.desc}</div>
            </a>
          `).join('');
      });
    }
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
    const pctLabel = document.createElement('span');
    pctLabel.className = 'progress-pct';
    document.body.appendChild(pctLabel);
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = pct + '%';
      pctLabel.textContent = Math.round(pct) + '%';
      pctLabel.style.opacity = scrollTop > 100 ? '1' : '0';
    });
  }

  // ---- Back button (browser history) ----
  if (window.location.pathname !== '/' && !window.location.pathname.endsWith('index.html')) {
    const backBtn = document.createElement('button');
    backBtn.className = 'back-button';
    backBtn.innerHTML = '&#9664;';
    backBtn.title = 'Go back';
    backBtn.style.cssText = `
      position: fixed; bottom: 2rem; left: 2rem; width: 44px; height: 44px;
      background: var(--navy); color: white; border: none; border-radius: 50%;
      font-size: 1.1rem; cursor: pointer; opacity: 1; transition: opacity 0.3s;
      z-index: 999; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(backBtn);
    backBtn.addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
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

  // ---- Reading time estimate ----
  const articleContent = document.querySelector('.article-content');
  const chapterHero = document.querySelector('.chapter-hero');
  if (articleContent && chapterHero) {
    const text = articleContent.innerText || articleContent.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 wpm average
    const readTimeEl = document.createElement('div');
    readTimeEl.className = 'reading-time';
    readTimeEl.innerHTML = `&#128337; ${readingTime} min read &middot; ${wordCount.toLocaleString()} words`;
    chapterHero.appendChild(readTimeEl);
  }

  // ---- Dark mode toggle ----
  const savedTheme = localStorage.getItem('ftp-theme');
  if (savedTheme === 'dark') document.body.classList.add('dark-mode');

  const darkToggle = document.createElement('button');
  darkToggle.className = 'dark-toggle';
  darkToggle.innerHTML = document.body.classList.contains('dark-mode') ? '&#9788;' : '&#9790;';
  darkToggle.title = 'Toggle dark mode';
  darkToggle.setAttribute('aria-label', 'Toggle dark mode');
  document.body.appendChild(darkToggle);

  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkToggle.innerHTML = isDark ? '&#9788;' : '&#9790;';
    localStorage.setItem('ftp-theme', isDark ? 'dark' : 'light');
  });

  // ---- Font size controls ----
  const savedSize = localStorage.getItem('ftp-fontsize');
  if (savedSize) document.documentElement.style.fontSize = savedSize;

  const fontControls = document.createElement('div');
  fontControls.className = 'font-controls';
  fontControls.innerHTML = `
    <button class="font-btn font-decrease" title="Decrease font size" aria-label="Decrease font size">A-</button>
    <button class="font-btn font-reset" title="Reset font size" aria-label="Reset font size">A</button>
    <button class="font-btn font-increase" title="Increase font size" aria-label="Increase font size">A+</button>
  `;
  document.body.appendChild(fontControls);

  const currentSize = () => parseFloat(getComputedStyle(document.documentElement).fontSize);

  fontControls.querySelector('.font-decrease').addEventListener('click', () => {
    const size = Math.max(12, currentSize() - 2);
    document.documentElement.style.fontSize = size + 'px';
    localStorage.setItem('ftp-fontsize', size + 'px');
  });
  fontControls.querySelector('.font-increase').addEventListener('click', () => {
    const size = Math.min(24, currentSize() + 2);
    document.documentElement.style.fontSize = size + 'px';
    localStorage.setItem('ftp-fontsize', size + 'px');
  });
  fontControls.querySelector('.font-reset').addEventListener('click', () => {
    document.documentElement.style.fontSize = '16px';
    localStorage.removeItem('ftp-fontsize');
  });

  // ---- Swipe gesture for next/previous chapter ----
  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 80;

  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) < swipeThreshold) return;

    const navLinks = document.querySelectorAll('.chapter-nav a');
    if (navLinks.length === 0) return;

    if (diff > 0) {
      // Swipe left = next chapter
      const next = document.querySelector('.chapter-nav .next') || navLinks[navLinks.length - 1];
      if (next && next.href) window.location.href = next.href;
    } else {
      // Swipe right = previous chapter
      const prev = navLinks[0];
      if (prev && prev.href && !prev.classList.contains('next')) window.location.href = prev.href;
    }
  }, { passive: true });

});
