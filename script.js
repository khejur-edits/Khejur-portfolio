document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const carousel = wrapper.querySelector('.carousel');
  const cards = Array.from(carousel.querySelectorAll('.video-card'));
  const leftBtn = wrapper.querySelector('.left');
  const rightBtn = wrapper.querySelector('.right');

  // --- Helper: stop all videos ---
  function stopAllVideos() {
    carousel.querySelectorAll('iframe').forEach(frame => {
      const src = frame.src;
      frame.src = src; // reload iframe → stops playback
    });
  }

  // --- Helper: center a card ---
  function centerCard(card) {
    const cardRect = card.getBoundingClientRect();
    const carouselRect = carousel.getBoundingClientRect();

    const offset =
      cardRect.left -
      carouselRect.left -
      (carouselRect.width / 2 - cardRect.width / 2);

    carousel.scrollBy({ left: offset, behavior: 'smooth' });

    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  }

  // --- Initial state: first card active ---
  if (cards.length > 0) {
    cards[0].classList.add('active');
  }

  // --- Click / tap behavior ---
  cards.forEach(card => {
    card.addEventListener('click', () => {
      stopAllVideos();
      centerCard(card);
    });
  });

  // --- Arrow buttons (PC) ---
  if (leftBtn && rightBtn) {
    leftBtn.addEventListener('click', () => {
      stopAllVideos();
      carousel.scrollBy({ left: -240, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      stopAllVideos();
      carousel.scrollBy({ left: 240, behavior: 'smooth' });
    });
  }

  // --- Snap-to-center after swipe (mobile lock) ---
  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      let closest = cards[0];
      let minDistance = Infinity;

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const center = window.innerWidth / 2;
        const distance = Math.abs(rect.left + rect.width / 2 - center);

        if (distance < minDistance) {
          minDistance = distance;
          closest = card;
        }
      });

      centerCard(closest);
    }, 120);
  });
});
