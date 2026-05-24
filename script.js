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

  // Desktop-only client hover + carousel system
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover) return;

  const homepageImage = document.getElementById("homepageImage");
  const clients = document.querySelectorAll(".client");
  const cursorLabel = document.getElementById("cursorLabel");

  // --- DEFAULT CAROUSEL IMAGES ---
  const defaultImages = [
    "images/Bled-Home.webp",
    "images/Bled-Home2.jpg",
    "images/Bled-Home3.jpg"
  ];

  defaultImages.forEach(src => {
  const img = new Image();
  img.src = `/${src}`;
});

  let currentIndex = 0;
  let mode = "default";

  homepageImage.src = `/${defaultImages[currentIndex]}`;

  function updateCursorText() {
    cursorLabel.textContent = `${currentIndex + 1}/${defaultImages.length}`;
  }

  // follow mouse
  window.addEventListener("mousemove", (e) => {
    cursorLabel.style.left = e.clientX + "px";
    cursorLabel.style.top = e.clientY + "px";
  });

  // --- IMAGE HOVER (cursor replacement) ---
  homepageImage.addEventListener("mouseenter", () => {
    if (mode !== "default") return;

    updateCursorText();
    cursorLabel.style.opacity = 1;
    document.body.style.cursor = "none"; // hide real cursor
  });

  homepageImage.addEventListener("mouseleave", () => {
    cursorLabel.style.opacity = 0;
    document.body.style.cursor = "default"; // restore cursor
  });

  // --- CLICK ONLY CAROUSEL ---
  homepageImage.addEventListener("click", () => {
    if (mode !== "default") return;

    currentIndex = (currentIndex + 1) % defaultImages.length;
    homepageImage.src = `/${defaultImages[currentIndex]}`;
    updateCursorText();
  });

  // --- HOVER BEHAVIOR ---
  clients.forEach(client => {

    client.addEventListener("mouseenter", () => {
      const img = client.getAttribute("data-image");
      if (img) {
        mode = "hover";
        homepageImage.src = `/${img}`;
        cursorLabel.style.opacity = 0;
        document.body.style.cursor = "default";
      }
    });

    client.addEventListener("mouseleave", (e) => {
      const next = e.relatedTarget;

      if (next && next.classList && next.classList.contains("client")) {
        return;
      }

      mode = "default";
      homepageImage.src = `/${defaultImages[currentIndex]}`;
    });

  });

});
