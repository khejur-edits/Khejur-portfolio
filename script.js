// CAROUSEL BUTTON SCROLL
document.querySelectorAll('.carousel-wrapper').forEach(wrapper=>{
  const carousel = wrapper.querySelector('.carousel');
  wrapper.querySelector('.left').onclick =
    () => carousel.scrollBy({ left: -240, behavior: 'smooth' });
  wrapper.querySelector('.right').onclick =
    () => carousel.scrollBy({ left: 240, behavior: 'smooth' });
});


// PAUSE + CENTER PLAYING VIDEO
const iframes = document.querySelectorAll('.yt-frame');

function pauseAllExcept(activeFrame) {
  iframes.forEach(frame => {
    if (frame !== activeFrame) {
      frame.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      );
      frame.closest('.video-card').classList.remove('active');
    }
  });
}

function centerVideo(card, carousel) {
  const carouselRect = carousel.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  const offset =
    (cardRect.left - carouselRect.left)
    - (carouselRect.width / 2)
    + (cardRect.width / 2);

  carousel.scrollBy({
    left: offset,
    behavior: 'smooth'
  });
}

iframes.forEach(frame => {
  frame.addEventListener('click', () => {
    const card = frame.closest('.video-card');
    const carousel = frame.closest('.carousel');

    pauseAllExcept(frame);

    card.classList.add('active');
    centerVideo(card, carousel);
  });
});
