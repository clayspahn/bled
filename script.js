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

  // Client hover image swap (NO flicker, link-only)
  const homepageImage = document.getElementById("homepageImage");
  const defaultSrc = homepageImage.src;
  const clients = document.querySelectorAll(".client");

  clients.forEach(client => {

    client.addEventListener("mouseenter", () => {
      const img = client.getAttribute("data-image");
      if (img) homepageImage.src = `/${img}`;
    });

    client.addEventListener("mouseleave", (e) => {
      const next = e.relatedTarget;

      // If moving directly to another client, do NOTHING
      if (next && next.classList && next.classList.contains("client")) {
        return;
      }

      // Otherwise reset
      homepageImage.src = defaultSrc;
    });

  });

});
