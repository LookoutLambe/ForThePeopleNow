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

  // ---- Solid bottom toolbar ----
  const toolbar = document.createElement('div');
  toolbar.className = 'bottom-toolbar';

  const isSubpage = window.location.pathname !== '/' && !window.location.pathname.endsWith('index.html');

  // Find next chapter link for forward button
  const nextLink = document.querySelector('.chapter-nav a.next');
  const prevChLink = document.querySelector('.chapter-nav a:not(.next)');

  toolbar.innerHTML = `
    ${prevChLink ? '<button class="tb-btn tb-back" title="Previous chapter">&#9664;</button>' : ''}
    <button class="tb-btn tb-font-down" title="Decrease font">A-</button>
    <button class="tb-btn tb-font-reset" title="Reset font">A</button>
    <button class="tb-btn tb-font-up" title="Increase font">A+</button>
    <button class="tb-btn tb-dark" title="Toggle dark mode">&#9789;</button>
    <button class="tb-btn tb-top" title="Back to top">&#9650;</button>
    ${nextLink ? '<button class="tb-btn tb-forward" title="Next chapter">&#9654;</button>' : ''}
  `;
  document.body.appendChild(toolbar);

  // Back button (previous chapter)
  const tbBack = toolbar.querySelector('.tb-back');
  if (tbBack && prevChLink) {
    tbBack.addEventListener('click', () => {
      window.location.href = prevChLink.href;
    });
  }

  // Forward button (next chapter)
  const tbForward = toolbar.querySelector('.tb-forward');
  if (tbForward && nextLink) {
    tbForward.addEventListener('click', () => {
      window.location.href = nextLink.href;
    });
  }

  // Back to top
  toolbar.querySelector('.tb-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // ---- Dark mode via toolbar ----
  const tbDark = toolbar.querySelector('.tb-dark');
  tbDark.innerHTML = document.body.classList.contains('dark-mode') ? '&#9788;' : '&#9790;';
  tbDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    tbDark.innerHTML = isDark ? '&#9788;' : '&#9790;';
    localStorage.setItem('ftp-theme', isDark ? 'dark' : 'light');
  });

  // ---- Font size via toolbar ----
  const savedSize = localStorage.getItem('ftp-fontsize');
  if (savedSize) document.documentElement.style.fontSize = savedSize;

  const currentSize = () => parseFloat(getComputedStyle(document.documentElement).fontSize);

  toolbar.querySelector('.tb-font-down').addEventListener('click', () => {
    const size = Math.max(12, currentSize() - 2);
    document.documentElement.style.fontSize = size + 'px';
    localStorage.setItem('ftp-fontsize', size + 'px');
  });
  toolbar.querySelector('.tb-font-up').addEventListener('click', () => {
    const size = Math.min(24, currentSize() + 2);
    document.documentElement.style.fontSize = size + 'px';
    localStorage.setItem('ftp-fontsize', size + 'px');
  });
  toolbar.querySelector('.tb-font-reset').addEventListener('click', () => {
    document.documentElement.style.fontSize = '16px';
    localStorage.removeItem('ftp-fontsize');
  });

  // ---- Swipe navigation (edge-only, doesn't block text selection) ----
  const chapterNavEl = document.querySelector('.chapter-nav');
  if (chapterNavEl) {
    const prevLink = chapterNavEl.querySelector('a:not(.next)');
    const nextLink = chapterNavEl.querySelector('a.next');
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const elapsed = Date.now() - touchStartTime;

      // Only trigger on fast, horizontal swipes (not scrolling or text selection)
      // Must be: >100px horizontal, <50px vertical, <300ms, started near edge
      const edgeZone = 40;
      const isFromLeftEdge = touchStartX < edgeZone;
      const isFromRightEdge = touchStartX > window.innerWidth - edgeZone;

      if (Math.abs(diffX) > 100 && Math.abs(diffY) < 50 && elapsed < 300) {
        if (diffX > 0 && isFromLeftEdge && prevLink) {
          window.location.href = prevLink.href;
        } else if (diffX < 0 && isFromRightEdge && nextLink) {
          window.location.href = nextLink.href;
        }
      }
    }, { passive: true });
  }

  // ---- PDF viewer overlay (keeps user on site) ----
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="docs/"]');
    if (link && link.href.endsWith('.pdf')) {
      e.preventDefault();
      e.stopPropagation();
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:10000;display:flex;flex-direction:column;';
      overlay.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1.5rem;background:#1a2744;border-bottom:2px solid #c9a94e;">
          <span style="color:#c9a94e;font-weight:700;font-size:0.9rem;">📄 ${link.href.split('/').pop().replace('.pdf','')}</span>
          <button style="background:#b22234;color:#fff;border:none;padding:0.5rem 1.25rem;border-radius:4px;font-weight:700;cursor:pointer;font-size:0.9rem;" onclick="this.closest('div').parentElement.remove()">✕ CLOSE</button>
        </div>
        <iframe src="${link.href}" style="flex:1;border:none;width:100%;"></iframe>
      `;
      document.body.appendChild(overlay);
    }
  });

  // ---- Share buttons (fixed floating bar) ----
  const shareTarget = document.querySelector('.article-content') || document.querySelector('main');
  if (shareTarget) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const shareBar = document.createElement('div');
    shareBar.className = 'share-bar';
    shareBar.innerHTML = `
      <span>SHARE:</span>
      <a class="share-btn truth" href="https://truthsocial.com/share?text=${title}%20${url}" target="_blank" rel="noopener">Truth Social</a>
      <a class="share-btn x-twitter" href="https://x.com/intent/tweet?text=${title}&url=${url}" target="_blank" rel="noopener">X</a>
      <a class="share-btn facebook" href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener">Facebook</a>
      <button class="share-btn copy-link" onclick="navigator.clipboard.writeText(window.location.href).then(()=>{this.textContent='Copied!'});setTimeout(()=>{this.textContent='Copy Link'},2000)">Copy Link</button>
    `;
    document.body.appendChild(shareBar);
  }

});
