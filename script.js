document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const carousel = wrapper.querySelector('.carousel');
  const cards = Array.from(carousel.querySelectorAll('.video-card'));
  const leftBtn = wrapper.querySelector('.left');
  const rightBtn = wrapper.querySelector('.right');

  let hasInteracted = false;

  // Stop all videos
  function stopAllVideos() {
    carousel.querySelectorAll('iframe').forEach(frame => {
      const src = frame.getAttribute('src').split('?')[0];
      frame.setAttribute('src', src); // reload iframe
    });
  }

  // Center a card
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

  // Initial state: ONLY first card active
  if (cards.length > 0) {
    cards[0].classList.add('active');
  }

  // Click / tap behavior
  cards.forEach(card => {
    card.addEventListener('click', () => {
      hasInteracted = true;

      stopAllVideos();

      // autoplay clicked video
      const iframe = card.querySelector('iframe');
      const baseSrc = iframe.getAttribute('src').split('?')[0];
      iframe.setAttribute(
        'src',
        `${baseSrc}?autoplay=1&mute=0&playsinline=1`
      );

      centerCard(card);
    });
  });

  // Arrow buttons (PC)
  if (leftBtn && rightBtn) {
    leftBtn.addEventListener('click', () => {
      stopAllVideos();
      carousel.scrollBy({ left: -260, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      stopAllVideos();
      carousel.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }

  // Snap-to-center after swipe (mobile)
  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    if (!hasInteracted) return;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      let closest = null;
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

      if (closest) centerCard(closest);
    }, 120);
  });
});
