// ================= GLOBAL PLAYER STATE =================
const ALL_PLAYERS = [];
let CURRENT_PLAYER = null;

// ================= YOUTUBE API =================
function onYouTubeIframeAPIReady() {
  document.querySelectorAll('.carousel-wrapper').forEach(initCarousel);
  revealOnLoad();
}

// ================= PER-CAROUSEL LOGIC =================
function initCarousel(wrapper) {
  const carousel = wrapper.querySelector('.carousel');
  const cards = [...carousel.querySelectorAll('.video-card')];
  const leftBtn = wrapper.querySelector('.left');
  const rightBtn = wrapper.querySelector('.right');

  let players = [];
  let activeIndex = 0;

  cards.forEach((card, i) => {
    const el = card.querySelector('.yt-player');

    const player = new YT.Player(el, {
      videoId: el.dataset.id,
      playerVars: {
        rel: 0,
        modestbranding: 1
      },
      events: {
        onStateChange: e => onPlayerStateChange(e, i)
      }
    });

    players.push(player);
    ALL_PLAYERS.push(player);
  });

  setActive(activeIndex);

  leftBtn.onclick = () => move(-1);
  rightBtn.onclick = () => move(1);

  function move(dir) {
    forcePauseGlobal();

    activeIndex = Math.max(0, Math.min(cards.length - 1, activeIndex + dir));
    setActive(activeIndex);
    centerCard(cards[activeIndex], carousel);

    players[activeIndex]?.playVideo();
    CURRENT_PLAYER = players[activeIndex];
  }

  function onPlayerStateChange(event, index) {
    if (event.data === YT.PlayerState.PLAYING) {

      // HARD STOP all other videos
      forcePauseGlobal(event.target);

      CURRENT_PLAYER = event.target;
      activeIndex = index;

      setActive(activeIndex);
      centerCard(cards[activeIndex], carousel);
    }
  }

  function setActive(index) {
    cards.forEach((card, i) => {
      card.classList.remove('active');
      if (i <= index) card.classList.add('show');
    });
    cards[index].classList.add('active');
  }
}

// ================= GLOBAL PAUSE (BULLETPROOF) =================
function forcePauseGlobal(except = null) {
  ALL_PLAYERS.forEach(p => {
    if (p !== except) {
      try { p.pauseVideo(); } catch(e){}
    }
  });
}

// ================= SAFE CENTERING =================
function centerCard(card, carousel) {
  const cardRect = card.getBoundingClientRect();
  const carouselRect = carousel.getBoundingClientRect();

  const offset =
    cardRect.left -
    carouselRect.left -
    (carouselRect.width / 2 - cardRect.width / 2);

  carousel.scrollBy({ left: offset, behavior: 'smooth' });
}

// ================= THEME TOGGLE =================
const toggle = document.querySelector('.theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
}

toggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem(
    'theme',
    body.classList.contains('light') ? 'light' : 'dark'
  );
});

// ================= LOAD ANIMATION =================
function revealOnLoad() {
  document.querySelectorAll('.video-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('show'), i * 120);
  });
}
