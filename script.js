// CAROUSEL SCROLL
document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const carousel = wrapper.querySelector('.carousel');
  wrapper.querySelector('.left').onclick =
    () => carousel.scrollBy({ left: -240, behavior: 'smooth' });
  wrapper.querySelector('.right').onclick =
    () => carousel.scrollBy({ left: 240, behavior: 'smooth' });
});

let players = [];

function onYouTubeIframeAPIReady() {
  document.querySelectorAll('.yt-player').forEach((el, index) => {
    players[index] = new YT.Player(el, {
      videoId: el.dataset.id,
      playerVars: {
        rel: 0,
        modestbranding: 1,
        origin: window.location.origin
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
