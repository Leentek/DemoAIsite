/* ============================================
   StreamFlix — Interactive Script
   ============================================ */

// ─── Movie Data ─────────────────────────────
const posters = [
  'img/poster_1.png',
  'img/poster_2.png',
  'img/poster_3.png',
  'img/poster_4.png',
  'img/poster_5.png',
  'https://image.tmdb.org/t/p/w342/bU2Q2rCH5VFrJNKSyx6wSmQZFsX.jpg'  // War Machine poster
];

const movies = [
  { title: 'War Machine', year: '2017', rating: 'TV-MA', match: 92, genres: ['Comedy','Drama','War'], poster: 5, dur: '2h 2m', imdbId: 'tt4758646' },
  { title: 'Shadow Protocol', year: '2026', rating: 'TV-MA', match: 97, genres: ['Thriller','Action','Espionage'], poster: 0, dur: '2h 12m' },
  { title: 'Nebula Rising', year: '2025', rating: 'PG-13', match: 94, genres: ['Sci-Fi','Adventure'], poster: 1, dur: '1h 58m' },
  { title: 'Inferno Walk', year: '2026', rating: 'R', match: 91, genres: ['Action','Drama'], poster: 2, dur: '2h 5m' },
  { title: 'Hollow Manor', year: '2025', rating: 'TV-MA', match: 88, genres: ['Horror','Mystery'], poster: 3, dur: '1h 47m' },
  { title: 'Golden Dusk', year: '2026', rating: 'PG-13', match: 95, genres: ['Romance','Drama'], poster: 4, dur: '1h 52m' },
  { title: 'Cipher Zero', year: '2025', rating: 'TV-14', match: 89, genres: ['Thriller','Tech'], poster: 0, dur: '2h 1m' },
  { title: 'Starfall Legacy', year: '2026', rating: 'PG-13', match: 92, genres: ['Sci-Fi','Fantasy'], poster: 1, dur: '2h 20m' },
  { title: 'Red Meridian', year: '2025', rating: 'R', match: 86, genres: ['Action','War'], poster: 2, dur: '2h 15m' },
  { title: 'The Whispering', year: '2026', rating: 'TV-MA', match: 93, genres: ['Horror','Supernatural'], poster: 3, dur: '1h 39m' },
  { title: 'Eternal Bloom', year: '2025', rating: 'PG', match: 90, genres: ['Romance','Fantasy'], poster: 4, dur: '1h 45m' },
  { title: 'Vanguard Unit', year: '2026', rating: 'TV-14', match: 87, genres: ['Action','Sci-Fi'], poster: 0, dur: '2h 8m' },
  { title: 'Deep Current', year: '2025', rating: 'R', match: 85, genres: ['Thriller','Crime'], poster: 1, dur: '1h 56m' },
  { title: 'Ashen Wings', year: '2026', rating: 'PG-13', match: 96, genres: ['Fantasy','Adventure'], poster: 2, dur: '2h 25m' },
  { title: 'Pulse Echo', year: '2025', rating: 'TV-MA', match: 84, genres: ['Sci-Fi','Horror'], poster: 3, dur: '1h 50m' },
  { title: 'Sunset Alibi', year: '2026', rating: 'R', match: 88, genres: ['Drama','Mystery'], poster: 4, dur: '2h 3m' },
  { title: 'Frostline', year: '2025', rating: 'TV-14', match: 91, genres: ['Thriller','Survival'], poster: 0, dur: '1h 53m' },
  { title: 'Parallel Drift', year: '2026', rating: 'PG-13', match: 93, genres: ['Sci-Fi','Drama'], poster: 1, dur: '2h 10m' },
  { title: 'Crimson Oath', year: '2025', rating: 'R', match: 82, genres: ['Action','Fantasy'], poster: 2, dur: '2h 18m' },
  { title: 'Night Orchard', year: '2026', rating: 'TV-MA', match: 89, genres: ['Horror','Folk'], poster: 3, dur: '1h 41m' },
  { title: 'Letters Home', year: '2025', rating: 'PG', match: 94, genres: ['Romance','War'], poster: 4, dur: '2h 7m' },
];

// ─── Card HTML Generators ───────────────────
function createCard(movie) {
  const watchLink = movie.imdbId
    ? `watch.html?imdb=${movie.imdbId}`
    : `#`;
  const onClickAction = movie.imdbId
    ? `window.location.href='${watchLink}'`
    : `showModal('${movie.title}')`;

  return `
    <div class="card" onclick="${onClickAction}">
      <img class="card-img" src="${posters[movie.poster]}" alt="${movie.title}" loading="lazy">
      <div class="card-overlay">
        <div class="card-buttons">
          <button class="card-btn play" title="Play" onclick="event.stopPropagation(); ${onClickAction}">
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
          <button class="card-btn" title="Add to My List" onclick="event.stopPropagation();">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button class="card-btn" title="Like" onclick="event.stopPropagation();">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
          </button>
        </div>
        <div class="card-title">${movie.title}</div>
        <div class="card-info">
          <span class="match">${movie.match}% Match</span>
          <span class="age-rating">${movie.rating}</span>
          <span>${movie.dur}</span>
        </div>
        <div class="card-genres">${movie.genres.map(g => `<span>${g}</span>`).join('')}</div>
      </div>
    </div>`;
}

function createTop10Card(movie, index) {
  const onClickAction = movie.imdbId
    ? `window.location.href='watch.html?imdb=${movie.imdbId}'`
    : `showModal('${movie.title}')`;

  return `
    <div class="card-top10" onclick="${onClickAction}">
      <span class="top10-number">${index + 1}</span>
      <img class="top10-poster" src="${posters[movie.poster]}" alt="${movie.title}" loading="lazy">
    </div>`;
}

function createFeatureCard(movie) {
  const onClickAction = movie.imdbId
    ? `window.location.href='watch.html?imdb=${movie.imdbId}'`
    : `showModal('${movie.title}')`;

  return `
    <div class="card-feature" onclick="${onClickAction}">
      <img class="card-img" src="${posters[movie.poster]}" alt="${movie.title}" loading="lazy">
      <div class="feature-overlay">
        <div class="feature-title">${movie.title}</div>
        <div class="feature-sub">${movie.genres.join(' · ')} · ${movie.year}</div>
      </div>
    </div>`;
}

// ─── Populate Carousels ─────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function populateCarousels() {
  // Ensure War Machine appears in Trending
  const warMachine = movies.find(m => m.title === 'War Machine');
  const otherMovies = movies.filter(m => m.title !== 'War Machine');

  const trending = [warMachine, ...shuffle(otherMovies).slice(0, 13)];
  document.getElementById('trending-carousel').innerHTML = trending.map(m => createCard(m)).join('');

  const top10 = [warMachine, ...shuffle(otherMovies).slice(0, 9)];
  document.getElementById('top10-carousel').innerHTML = top10.map((m, i) => createTop10Card(m, i)).join('');

  const popular = shuffle(movies).slice(0, 14);
  document.getElementById('popular-carousel').innerHTML = popular.map(m => createCard(m)).join('');

  const cont = shuffle(movies).slice(0, 10);
  document.getElementById('continue-carousel').innerHTML = cont.map(m => createFeatureCard(m)).join('');

  const newRel = shuffle(movies).slice(0, 14);
  document.getElementById('new-carousel').innerHTML = newRel.map(m => createCard(m)).join('');

  const action = shuffle(movies.filter(m => m.genres.some(g => ['Action','Adventure','War','Survival'].includes(g)))).slice(0, 14);
  document.getElementById('action-carousel').innerHTML = action.map(m => createCard(m)).join('');
}

// ─── Carousel Scrolling ─────────────────────
function scrollCarousel(btn, direction) {
  const carousel = btn.parentElement.querySelector('.carousel');
  const scrollAmount = carousel.clientWidth * 0.75;
  carousel.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
}

// ─── Navbar Scroll Effect ───────────────────
function handleNavScroll() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// ─── Search Toggle ──────────────────────────
function initSearch() {
  const box = document.getElementById('searchBox');
  const icon = document.getElementById('searchIcon');
  const input = document.getElementById('searchInput');

  if (!box || !icon || !input) return;

  icon.addEventListener('click', () => {
    box.classList.toggle('open');
    if (box.classList.contains('open')) {
      input.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!box.contains(e.target)) {
      box.classList.remove('open');
    }
  });
}

// ─── Genre Pills ────────────────────────────
function initGenrePills() {
  const pills = document.querySelectorAll('.genre-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      populateCarousels();
    });
  });
}

// ─── Mobile Menu Toggle ─────────────────────
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
}

// ─── Modal ──────────────────────────────────
function showModal(title) {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  const titleEl = document.getElementById('modalTitle');
  const movie = movies.find(m => m.title === title);

  if (movie) {
    titleEl.textContent = movie.title;
    document.getElementById('modalHeroImg').src = posters[movie.poster];
    document.getElementById('modalDesc').textContent =
      `A gripping ${movie.genres.join(' and ')} experience. Set in ${movie.year}, this ${movie.dur} masterpiece has captivated audiences worldwide with a ${movie.match}% match rate. Rated ${movie.rating}. Don't miss this extraordinary journey.`;

    // Link the Play button inside modal to watch page if movie has imdbId
    const playBtn = document.getElementById('modalPlayBtn');
    if (playBtn && movie.imdbId) {
      playBtn.onclick = () => window.location.href = `watch.html?imdb=${movie.imdbId}`;
    }
  } else {
    titleEl.textContent = title;
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on overlay click or Escape
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ─── Init ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Only run carousel logic on index page
  if (document.getElementById('trending-carousel')) {
    populateCarousels();
    initGenrePills();
  }

  initSearch();
  initMobileMenu();
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();
});
