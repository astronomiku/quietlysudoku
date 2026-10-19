const screenshots = {
  iPhone: [
    ["assets/screenshots/iphone-home.png", "Five levels with clear progression", "Quietly Sudoku home screen on iPhone showing five difficulty levels"],
    ["assets/screenshots/iphone-game.png", "Clean play with fast notes", "Quietly Sudoku game board with notes on iPhone"],
    ["assets/screenshots/iphone-hint.png", "Hints that teach the next step", "Quietly Sudoku progressive hint on iPhone"],
    ["assets/screenshots/iphone-daily.png", "A fresh puzzle every day", "Quietly Sudoku daily puzzles on iPhone"],
    ["assets/screenshots/iphone-settings.png", "Six calm board themes", "Quietly Sudoku themes and settings on iPhone"],
    ["assets/screenshots/iphone-store.png", "Optional extras. No ads, ever.", "Quietly Sudoku optional extras store on iPhone"]
  ],
  iPad: [
    ["assets/screenshots/ipad-home.png", "Five levels and daily puzzles", "Quietly Sudoku home screen on iPad"],
    ["assets/screenshots/ipad-game.png", "A spacious board and clear controls", "Quietly Sudoku game board on iPad"],
    ["assets/screenshots/ipad-hint.png", "Guidance without giving it away", "Quietly Sudoku progressive hint on iPad"],
    ["assets/screenshots/ipad-settings.png", "Themes and accessible controls", "Quietly Sudoku settings on iPad"]
  ],
  Mac: [
    ["assets/screenshots/mac-home.png", "Five levels, daily puzzles, personal records", "Quietly Sudoku home screen on Mac"],
    ["assets/screenshots/mac-game.png", "Focused play on a larger screen", "Quietly Sudoku game board on Mac"],
    ["assets/screenshots/mac-hint.png", "A helpful next step, never a giveaway", "Quietly Sudoku progressive hint on Mac"],
    ["assets/screenshots/mac-settings.png", "Your settings stay close at hand", "Quietly Sudoku settings on Mac"]
  ]
};

const carousel = document.querySelector(".carousel");

if (carousel) {
  const image = carousel.querySelector(".carousel-image img");
  const platformLabel = carousel.querySelector(".carousel-platform");
  const title = carousel.querySelector(".carousel-title");
  const count = carousel.querySelector(".carousel-count");
  const dots = carousel.querySelector(".carousel-dots");
  const tabs = [...carousel.querySelectorAll(".carousel-tabs button")];
  let platform = "iPhone";
  let index = 0;
  let touchStart = 0;

  function render() {
    const slides = screenshots[platform];
    const [src, caption, alt] = slides[index];
    image.src = src;
    image.alt = alt;
    platformLabel.textContent = platform;
    title.textContent = caption;
    count.textContent = `${index + 1} / ${slides.length}`;
    tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.platform === platform));
    dots.replaceChildren(...slides.map((_, dotIndex) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = dotIndex === index ? "active" : "";
      dot.setAttribute("aria-label", `Show ${platform} screenshot ${dotIndex + 1}`);
      dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
      dot.addEventListener("click", () => { index = dotIndex; render(); });
      return dot;
    }));
  }

  function move(direction) {
    const total = screenshots[platform].length;
    index = (index + direction + total) % total;
    render();
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => {
    platform = tab.dataset.platform;
    index = 0;
    render();
  }));

  carousel.querySelector(".previous").addEventListener("click", () => move(-1));
  carousel.querySelector(".next").addEventListener("click", () => move(1));
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });
  carousel.addEventListener("touchstart", (event) => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
  carousel.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
  }, { passive: true });

  render();
}
