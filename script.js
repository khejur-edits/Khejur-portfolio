// ================= GLOBAL PLAYER MAP =================
let players = [];
let playerToCard = new Map(); // link player -> video-card

// ================= YOUTUBE API =================
function onYouTubeIframeAPIReady() {
  document.querySelectorAll('.yt-player').forEach((el, i) => {
    const card = el.closest('.video-card');

    const player = new YT.Player(el, {
      videoId: el.dataset.id,
      playerVars: { rel: 0, modestbranding: 1 },
      events: { onStateChange: onPlayerStateChange }
    });

    players.push(player);
    playerToCard.set(player, card);
  });

  initCarousels();
  revealOnLoad();
}

function onPlayerStateChange(event){
  if(event.data === YT.PlayerState.PLAYING){

    // 1️⃣ Pause all other videos
    players.forEach(p => {
      if(p !== event.target) p.pauseVideo();
    });

    // 2️⃣ Activate the card of the playing video
    const activeCard = playerToCard.get(event.target);
    if(!activeCard) return;

    const carousel = activeCard.closest('.carousel');
    const cards = carousel.querySelectorAll('.video-card');

    cards.forEach(c => {
      c.classList.remove('active');
      c.classList.add('show');
    });

    activeCard.classList.add('active');

    // 3️⃣ Smoothly center the playing card
    activeCard.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  }
}

// ================= ARROW NAV =================
function initCarousels(){
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const carousel = wrapper.querySelector('.carousel');
    const cards = carousel.querySelectorAll('.video-card');

    let index = 0;
    setActiveByIndex(index);

    wrapper.querySelector('.left').onclick = () => move(-1);
    wrapper.querySelector('.right').onclick = () => move(1);

    function move(dir){
      players[index]?.pauseVideo();

      index = Math.max(0, Math.min(cards.length - 1, index + dir));
      setActiveByIndex(index);

      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
      players[index]?.playVideo();
    }

    function setActiveByIndex(i){
      cards.forEach((c, idx) => {
        c.classList.remove('active');
        if(idx <= i) c.classList.add('show');
      });
      cards[i].classList.add('active');
    }
  });
}

// ================= THEME TOGGLE =================
const toggle = document.querySelector('.theme-toggle');
const body = document.body;

if(localStorage.getItem('theme') === 'light'){
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
function revealOnLoad(){
  document.querySelectorAll('.video-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('show'), i * 120);
  });
}
