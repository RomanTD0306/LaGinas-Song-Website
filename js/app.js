/* =====================
   Shared helpers
   ===================== */
function renderLyrics(text) {
  return text
    .split('\n\n')
    .map(stanza => {
      const lines = stanza.trim().split('\n').map(l => l.trim()).filter(Boolean);
      return '<p>' + lines.join('<br>') + '</p>';
    })
    .join('');
}

/* =====================
   Index page — song preview + search + pagination
   ===================== */
function initIndexPage() {
  const grid = document.getElementById('songs-grid');
  const input = document.getElementById('song-search');
  if (!grid) return;

  const PAGE_SIZE = 21;
  let currentPage = 1;

  function renderCards(songs) {
    grid.innerHTML = '';
    if (songs.length === 0) {
      grid.innerHTML = '<p class="no-results" style="display:block">No songs matched your search.</p>';
      return;
    }
    songs.forEach(song => {
      const a = document.createElement('a');
      a.className = 'song-card';
      a.href = 'song.html?id=' + song.id;
      a.innerHTML = '<span class="song-card-title">' + song.title + '</span>';
      grid.appendChild(a);
    });
  }

  function updateNav(totalSongs, isSearching) {
    const prevBtn = document.getElementById('songs-prev');
    const nextBtn = document.getElementById('songs-next');
    const paginationEl = document.getElementById('songs-pagination');
    const totalPages = Math.ceil(totalSongs / PAGE_SIZE);

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
      s.title.toLowerCase().includes(term) ||
      s.lyrics.toLowerCase().includes(term)
    );

    if (isSearching) {
      renderCards(matches);
    } else {
      const start = (currentPage - 1) * PAGE_SIZE;
      renderCards(matches.slice(start, start + PAGE_SIZE));
    }
    updateNav(matches.length, isSearching);
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
      const totalPages = Math.ceil(SONGS.length / PAGE_SIZE);
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
  if (!grid) return;

  function render(filter) {
    const term = (filter || '').toLowerCase().trim();
    const matches = SONGS.filter(s =>
      s.title.toLowerCase().includes(term) ||
      s.lyrics.toLowerCase().includes(term)
    );
    grid.innerHTML = '';
    if (matches.length === 0) {
      grid.innerHTML = '<p class="no-results" style="display:block">No songs matched your search.</p>';
      return;
    }
    matches.forEach(song => {
      const a = document.createElement('a');
      a.className = 'song-card';
      a.href = 'song.html?id=' + song.id;
      a.innerHTML = '<span class="song-card-title">' + song.title + '</span>';
      grid.appendChild(a);
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
    return;
  }

  document.title = song.title + ' — LaGina Sharp Davis';
  if (titleEl)  titleEl.textContent = song.title;
  if (dateEl)   dateEl.textContent  = song.date ? 'Written ' + song.date : '';
  if (lyricsEl) lyricsEl.innerHTML  = renderLyrics(song.lyrics);
}

/* =====================
   Index page — demos pagination
   ===================== */
function initDemosSection() {
  const grid = document.getElementById('demos-grid');
  if (!grid) return;

  const PAGE_SIZE = 6;
  let currentPage = 1;
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
        btn.addEventListener('click', () => { currentPage = i; render(); });
        paginationEl.appendChild(btn);
      }
    }
  }

  const prevBtn = document.getElementById('demos-prev');
  const nextBtn = document.getElementById('demos-next');
  if (prevBtn) prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; render(); } });
  if (nextBtn) nextBtn.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; render(); } });

  render();
}

/* =====================
   Boot
   ===================== */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.endsWith('song.html'))  initSongPage();
  else if (path.endsWith('songs.html')) initSongsPage();
  else { initIndexPage(); initDemosSection(); }

  // Mark active nav link
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.href === window.location.href) a.classList.add('active');
  });
});
