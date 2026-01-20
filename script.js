document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll (unchanged)
  if (window.innerWidth > 768) {

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

  // Client hover image swap (NO flicker)
  const homepageImage = document.getElementById("homepageImage");
  const defaultSrc = homepageImage.src;

  const clients = document.querySelectorAll(".client");
  const clientsContainer = clients[0]?.parentElement;

  clients.forEach(client => {
    client.addEventListener("mouseenter", () => {
      const img = client.getAttribute("data-image");
      if (img) homepageImage.src = `/${img}`;
    });
  });

  // Reset ONLY when leaving the entire clients block
  if (clientsContainer) {
    clientsContainer.addEventListener("mouseleave", () => {
      homepageImage.src = defaultSrc;
    });
  }

});
