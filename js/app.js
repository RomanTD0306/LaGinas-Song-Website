/* =====================
   Shared helpers
   ===================== */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function songUrl(song) {
  return 'song.html?id=' + encodeURIComponent(song.id);
}

function renderLyrics(text) {
  return escapeHtml(text)
    .split('\n\n')
    .map(stanza => {
      const lines = stanza.trim().split('\n').map(l => l.trim()).filter(Boolean);
      return '<p>' + lines.join('<br>') + '</p>';
    })
    .join('');
}

/* Builds the clickable song title cards used on the home and Lyrics pages */
function renderSongCards(grid, songs) {
  grid.innerHTML = '';
  if (songs.length === 0) {
    grid.innerHTML = '<p class="no-results" style="display:block">No songs matched your search.</p>';
    return;
  }
  songs.forEach(song => {
    const a = document.createElement('a');
    a.className = 'song-card';
    a.href = songUrl(song);
    const title = document.createElement('span');
    title.className = 'song-card-title';
    title.textContent = song.title;
    a.appendChild(title);
    grid.appendChild(a);
  });
}

/* =====================
   Index page — song preview + search + pagination
   ===================== */
function initIndexPage() {
  const grid = document.getElementById('songs-grid');
  const input = document.getElementById('song-search');
  const filterBar = document.getElementById('category-filters');
  if (!grid) return;

  const PAGE_SIZE = 21;
  let currentPage = 1;
  let totalPages = 1;
  let currentCategory = 'all';

  function renderCards(songs) {
    renderSongCards(grid, songs);
  }

  function updateNav(totalSongs, isSearching) {
    const prevBtn = document.getElementById('songs-prev');
    const nextBtn = document.getElementById('songs-next');
    const paginationEl = document.getElementById('songs-pagination');
    totalPages = Math.max(1, Math.ceil(totalSongs / PAGE_SIZE));

    if (isSearching || totalPages <= 1) {
      if (prevBtn) prevBtn.style.visibility = 'hidden';
      if (nextBtn) nextBtn.style.visibility = 'hidden';
      if (paginationEl) paginationEl.style.display = 'none';
      return;
    }

    if (prevBtn) {
      prevBtn.style.visibility = 'visible';
      prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
      nextBtn.style.visibility = 'visible';
      nextBtn.disabled = currentPage === totalPages;
    }

    if (paginationEl) {
      paginationEl.style.display = 'flex';
      paginationEl.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
        btn.textContent = i;
        btn.addEventListener('click', () => {
          currentPage = i;
          render(input ? input.value : '');
        });
        paginationEl.appendChild(btn);
      }
    }
  }

  function render(filter) {
    const term = (filter || '').toLowerCase().trim();
    const isSearching = term.length > 0;
    const matches = SONGS.filter(s =>
      (currentCategory === 'all' || s.categories.includes(currentCategory)) &&
      (s.title.toLowerCase().includes(term) || s.lyrics.toLowerCase().includes(term))
    );

    if (isSearching) {
      renderCards(matches);
    } else {
      const start = (currentPage - 1) * PAGE_SIZE;
      renderCards(matches.slice(start, start + PAGE_SIZE));
    }
    updateNav(matches.length, isSearching);
  }

  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      currentPage = 1;
      render(input ? input.value : '');
    });
  }

  const prevBtn = document.getElementById('songs-prev');
  const nextBtn = document.getElementById('songs-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        render(input ? input.value : '');
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        render(input ? input.value : '');
      }
    });
  }

  render('');
  if (input) {
    input.addEventListener('input', () => {
      currentPage = 1;
      render(input.value);
    });
  }
}

/* =====================
   Songs page — full list + search (no pagination)
   ===================== */
function initSongsPage() {
  const grid = document.getElementById('songs-grid');
  const input = document.getElementById('song-search');
  const filterBar = document.getElementById('category-filters');
  if (!grid) return;

  let currentCategory = 'all';

  function render(filter) {
    const term = (filter || '').toLowerCase().trim();
    const matches = SONGS.filter(s =>
      (currentCategory === 'all' || s.categories.includes(currentCategory)) &&
      (s.title.toLowerCase().includes(term) || s.lyrics.toLowerCase().includes(term))
    );
    renderSongCards(grid, matches);
  }

  const countEl = document.getElementById('song-count');
  if (countEl) countEl.textContent = SONGS.length;

  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      render(input ? input.value : '');
    });
  }

  render('');
  if (input) {
    input.addEventListener('input', () => render(input.value));
  }
}

/* =====================
   Song page — display one song
   ===================== */
function initSongPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const song = SONGS.find(s => s.id === id);

  const titleEl   = document.getElementById('song-title');
  const dateEl    = document.getElementById('song-date');
  const lyricsEl  = document.getElementById('song-lyrics');
  const notFound  = document.getElementById('not-found');

  if (!song) {
    if (notFound) notFound.style.display = 'block';
    document.title = 'Song not found | LaGina Sharp Davis';
    return;
  }

  document.title = song.title + ' — LaGina Sharp Davis';
  if (titleEl)  titleEl.textContent = song.title;
  if (dateEl)   dateEl.textContent  = song.date ? 'Written ' + song.date : '';
  if (lyricsEl) lyricsEl.innerHTML  = renderLyrics(song.lyrics);

  const demoEl = document.getElementById('song-demo');
  if (demoEl && song.demo) {
    demoEl.href = song.demo;
    demoEl.hidden = false;
  }
}

/* =====================
   Index page — demos pagination
   ===================== */
function initDemosSection() {
  const grid = document.getElementById('demos-grid');
  if (!grid) return;

  const PAGE_SIZE = 6;
  let currentPage = 1;

  // Demo cards are built from every song in js/songs-data.js that has a demo link,
  // so the titles always match the lyrics pages.
  SONGS.filter(song => song.demo).forEach(song => {
    const card = document.createElement('div');
    card.className = 'demo-card';
    card.innerHTML =
      '<a class="demo-card-main" target="_blank" rel="noopener">' +
        '<span class="demo-card-icon">' +
          '<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
            '<circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/>' +
          '</svg>' +
        '</span>' +
        '<span class="demo-card-body">' +
          '<span class="demo-card-title"></span>' +
          '<span class="demo-card-label">Listen on Suno</span>' +
        '</span>' +
      '</a>' +
      '<a class="demo-card-lyrics">Lyrics</a>';
    const main = card.querySelector('.demo-card-main');
    main.href = song.demo;
    card.querySelector('.demo-card-title').textContent = song.title;
    const lyricsLink = card.querySelector('.demo-card-lyrics');
    lyricsLink.href = songUrl(song);
    lyricsLink.setAttribute('aria-label', 'Read the lyrics to ' + song.title);
    grid.appendChild(card);
  });

  const cards = Array.from(grid.querySelectorAll('.demo-card'));
  const totalPages = Math.ceil(cards.length / PAGE_SIZE);

  function render() {
    const start = (currentPage - 1) * PAGE_SIZE;
    cards.forEach((card, i) => {
      card.style.display = (i >= start && i < start + PAGE_SIZE) ? '' : 'none';
    });

    const prevBtn = document.getElementById('demos-prev');
    const nextBtn = document.getElementById('demos-next');
    const paginationEl = document.getElementById('demos-pagination');

    if (totalPages <= 1) {
      if (prevBtn) prevBtn.style.visibility = 'hidden';
      if (nextBtn) nextBtn.style.visibility = 'hidden';
      if (paginationEl) paginationEl.style.display = 'none';
      return;
    }

    if (prevBtn) {
      prevBtn.style.visibility = 'visible';
      prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
      nextBtn.style.visibility = 'visible';
      nextBtn.disabled = currentPage === totalPages;
    }
    if (paginationEl) {
      paginationEl.style.display = 'flex';
      paginationEl.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
        btn.textContent = i;
        btn.addEventListener('click', () => { currentPage = i; render(); grid.closest('section').scrollIntoView({ block: 'start' }); });
        paginationEl.appendChild(btn);
      }
    }
  }

  const prevBtn = document.getElementById('demos-prev');
  const nextBtn = document.getElementById('demos-next');
  if (prevBtn) prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; render(); grid.closest('section').scrollIntoView({ block: 'start' }); } });
  if (nextBtn) nextBtn.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; render(); grid.closest('section').scrollIntoView({ block: 'start' }); } });

  render();
}

/* =====================
   Boot
   ===================== */
/* =====================
   Mobile menu
   ===================== */
function initMobileMenu() {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  function setOpen(open) {
    nav.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('nav-open')));
  nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) setOpen(false); });
}

/* =====================
   Boot
   ===================== */
document.addEventListener('DOMContentLoaded', () => {
  // Each page says which page it is (<body data-page="...">), so this still works
  // when GitHub Pages serves an address without ".html" (for example /song?id=...).
  const page = document.body.dataset.page;
  if (page === 'song')       initSongPage();
  else if (page === 'songs') initSongsPage();
  else { initIndexPage(); initDemosSection(); }

  initMobileMenu();

  // Mark active nav link (Lyrics on the Lyrics and song pages, Home on the home page)
  const activeHref = (page === 'songs' || page === 'song') ? 'songs.html' : 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === activeHref) a.classList.add('active');
  });
});
