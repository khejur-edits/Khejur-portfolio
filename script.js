// CAROUSEL SCROLL
document.querySelectorAll('.carousel-wrapper').forEach(wrapper=>{
  const carousel = wrapper.querySelector('.carousel');
  const left = wrapper.querySelector('.left');
  const right = wrapper.querySelector('.right');

  left.addEventListener('click', ()=>{
    carousel.scrollBy({ left: -240, behavior: 'smooth' });
  });

  right.addEventListener('click', ()=>{
    carousel.scrollBy({ left: 240, behavior: 'smooth' });
  });
});


// YOUTUBE AUTO PAUSE LOGIC
let players = [];

function onYouTubeIframeAPIReady() {
  document.querySelectorAll('.player').forEach((el, index) => {
    players[index] = new YT.Player(el, {
      videoId: el.dataset.videoId,
      playerVars: {
        modestbranding: 1,
        rel: 0
      },
      events: {
        onStateChange: onPlayerStateChange
      }
    });
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    players.forEach(player => {
      if (player !== event.target) {
        player.pauseVideo();
      }
    });
  }
}
