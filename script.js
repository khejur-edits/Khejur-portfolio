document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const carousel = wrapper.querySelector('.carousel');
  const cards = carousel.querySelectorAll('.video-card');
  const left = wrapper.querySelector('.left');
  const right = wrapper.querySelector('.right');

  // Helper: stop all videos
  function stopAllVideos() {
    carousel.querySelectorAll('iframe').forEach(iframe => {
      const src = iframe.src;
      iframe.src = src; // reload iframe to stop playback
    });
  }

  // Helper: center a card
  function centerCard(card) {
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

    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    stopAllVideos();
  }

  // FIRST VIDEO ACTIVE ON LOAD
  if (cards.length > 0) {
    cards[0].classList.add('active');

    // center it slightly after load (mobile safety)
    setTimeout(() => centerCard(cards[0]), 200);
  }

  // Arrow buttons (PC)
  if (left && right) {
    left.addEventListener('click', () => {
      carousel.scrollBy({ left: -260, behavior: 'smooth' });
    });

    right.addEventListener('click', () => {
      carousel.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }

  // Tap / click = center + focus
  cards.forEach(card => {
    card.addEventListener('click', () => {
      centerCard(card);
    });
  });

  // SNAP-TO-CENTER AFTER SCROLL (mobile swipe lock)
  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      let closestCard = null;
      let closestDistance = Infinity;
      const carouselCenter =
        carousel.getBoundingClientRect().left +
        carousel.offsetWidth / 2;

      cards.forEach(card => {
        const cardCenter =
          card.getBoundingClientRect().left +
          card.offsetWidth / 2;

        const distance = Math.abs(carouselCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestCard = card;
        }
      });

      if (closestCard) {
        centerCard(closestCard);
      }
    }, 120); // lock delay (controls stretchy feel)
  });
});
