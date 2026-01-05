// ================= CAROUSEL + SMART NAV =================
let players = [];

function onYouTubeIframeAPIReady() {
  document.querySelectorAll('.yt-player').forEach((el, i) => {
    players[i] = new YT.Player(el, {
      videoId: el.dataset.id,
      playerVars: { rel: 0, modestbranding: 1 },
      events: { onStateChange: onPlayerStateChange }
    });
  });

  initCarousels();
  revealOnLoad();
}

function onPlayerStateChange(event){
  if(event.data === YT.PlayerState.PLAYING){
    players.forEach(p => {
      if(p !== event.target) p.pauseVideo();
    });
  }
}

function initCarousels(){
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const carousel = wrapper.querySelector('.carousel');
    const cards = carousel.querySelectorAll('.video-card');

    let index = 0;
    activateCard(cards, index);

    wrapper.querySelector('.left').onclick = () => move(-1);
    wrapper.querySelector('.right').onclick = () => move(1);

    function move(dir){
      players[index]?.pauseVideo();

      index = Math.max(0, Math.min(cards.length - 1, index + dir));

      activateCard(cards, index);
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
      players[index]?.playVideo();
    }
  });
}

function activateCard(cards, index){
  cards.forEach((c, i) => {
    c.classList.remove('active');
    if(i <= index) c.classList.add('show');
  });
  cards[index].classList.add('active');
}

// ================= THEME TOGGLE =================
const toggle = document.querySelector('.theme-toggle');
const body = document.body;

if(localStorage.getItem('theme') === 'light'){
  body.classList.add('light');
}

toggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

// ================= LOAD ANIMATION =================
function revealOnLoad(){
  document.querySelectorAll('.video-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('show'), i * 120);
  });
}
