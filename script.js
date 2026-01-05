document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const carousel = wrapper.querySelector('.carousel');
  const cards = carousel.querySelectorAll('.video-card');
  const left = wrapper.querySelector('.left');
  const right = wrapper.querySelector('.right');

  /* Arrow buttons (PC) */
  if (left && right) {
    left.addEventListener('click', () => {
      carousel.scrollBy({ left: -240, behavior: 'smooth' });
    });

    right.addEventListener('click', () => {
      carousel.scrollBy({ left: 240, behavior: 'smooth' });
    });
  }

  /* Center card on click / tap */
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const cardRect = card.getBoundingClientRect();
      const carouselRect = carousel.getBoundingClientRect();

      const offset =
        cardRect.left -
        carouselRect.left -
        (carouselRect.width / 2 - cardRect.width / 2);

      carousel.scrollBy({
        left: offset,
        behavior: 'smooth'
      });

      /* Active state */
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
});
