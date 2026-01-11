document.addEventListener("DOMContentLoaded", () => {

  // Only for desktop
  if (window.innerWidth > 768) {

    const imageContainer = document.querySelector('.homepage-image');
    const body = document.body;

    if (imageContainer) {
      imageContainer.addEventListener('click', () => {
        imageContainer.classList.toggle('enlarged');
        body.classList.toggle('blurred'); // blur background when zoomed
      });
    }

    // -------- Smooth scroll ----------
    let current = window.scrollY;
    let target = window.scrollY;
    let ease = 0.12;

    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      target += e.deltaY;

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (target < 0) target = 0;
      if (target > maxScroll) target = maxScroll;
    }, { passive: false });

    function animateScroll() {
      current += (target - current) * ease;
      window.scrollTo(0, current);
      requestAnimationFrame(animateScroll);
    }

    animateScroll();
  }

});
