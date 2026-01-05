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
