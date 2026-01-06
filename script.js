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

  // Init players for THIS carousel only
  cards.forEach((card, i) => {
    const el = card.querySelector('.yt-player');

    const player = new YT.Player(el, {
      videoId: el.dataset.id,
      playerVars: { rel: 0, modestbranding: 1 },
      events: {
        onStateChange: e => onPlayerStateChange(e, i)
      }
    });

    players.push(player);
  });

  setActive(activeIndex);

  // ================= BUTTON NAV =================
  leftBtn.onclick = () => move(-1);
  rightBtn.onclick = () => move(1);

  function move(dir) {
    players[activeIndex]?.pauseVideo();

    activeIndex = Math.max(0, Math.min(cards.length - 1, activeIndex + dir));
    setActive(activeIndex);
    scrollToCenter(cards[activeIndex]);
    players[activeIndex]?.playVideo();
  }

  // ================= PLAYER STATE =================
  function onPlayerStateChange(event, index) {
    if (event.data === YT.PlayerState.PLAYING) {

      // Pause others (THIS carousel only)
      players.forEach((p, i) => {
        if (i !== index) p.pauseVideo();
      });

      activeIndex = index;
      setActive(activeIndex);
      scrollToCenter(cards[activeIndex]);
    }
  }

  // ================= CENTER SCROLL (NO VERTICAL MOVE) =================
  function scrollToCenter(card) {
    const carouselRect = carousel.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const offset =
      cardRect.left -
      carouselRect.left -
      (carouselRect.width / 2) +
      (cardRect.width / 2);

    carousel.scrollBy({
      left: offset,
      behavior: 'smooth'
    });
  }

  // ================= UI STATE =================
  function setActive(index) {
    cards.forEach((card, i) => {
      card.classList.remove('active');
      if (i <= index) card.classList.add('show');
    });
    cards[index].classList.add('active');
  }
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
