// CAROUSEL SCROLL
document.querySelectorAll('.carousel-wrapper').forEach(wrapper=>{
  const carousel = wrapper.querySelector('.carousel');
  const left = wrapper.querySelector('.left');
  const right = wrapper.querySelector('.right');

  left.onclick = () => carousel.scrollBy({ left: -240, behavior: 'smooth' });
  right.onclick = () => carousel.scrollBy({ left: 240, behavior: 'smooth' });
});


// AUTO PAUSE OTHER VIDEOS
const iframes = document.querySelectorAll('iframe');

function pauseAllExcept(activeFrame) {
  iframes.forEach(frame => {
    if (frame !== activeFrame) {
      frame.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      );
    }
  });
}

iframes.forEach(frame => {
  frame.addEventListener('click', () => {
    pauseAllExcept(frame);
  });
});
