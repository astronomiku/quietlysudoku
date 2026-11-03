const screenshots = {
  iPhone: [
    ["assets/screenshots/iphone-ios-game.jpg", "Focused play with clear feedback", "Quietly Sudoku game board on iPhone with teal entries and a clearly marked mistake"],
    ["assets/screenshots/iphone-ios-hint.jpg", "Hints that teach the next step", "Quietly Sudoku progressive three-step hint on iPhone"],
    ["assets/screenshots/iphone-ios-daily-puzzles.jpg", "A fresh puzzle every day", "Quietly Sudoku daily puzzle picker on iPhone"],
    ["assets/screenshots/iphone-ios-settings.jpg", "Six calm board themes", "Quietly Sudoku themes and settings on iPhone"],
    ["assets/screenshots/iphone-ios-lives-and-hints.jpg", "Lives and hints, explained clearly", "Quietly Sudoku onboarding screen explaining lives, hints, and mistakes on iPhone"],
    ["assets/screenshots/iphone-ios-about.jpg", "50,000 checked puzzles. No ads.", "Quietly Sudoku information screen describing checked puzzles, offline play, and iCloud sync on iPhone"]
  ],
  iPad: [
    ["assets/screenshots/ipad-ios-game.jpg", "A spacious board with clear feedback", "Quietly Sudoku game board on iPad with teal entries and a clearly marked mistake"],
    ["assets/screenshots/ipad-ios-game-with-hint.jpg", "Teaching hints use the extra space", "Quietly Sudoku game board and progressive hint panel on iPad"],
    ["assets/screenshots/ipad-ios-home.jpg", "Five levels and daily puzzles", "Quietly Sudoku home screen on iPad showing difficulty levels and daily puzzles"],
    ["assets/screenshots/ipad-ios-settings.jpg", "Six calm board themes", "Quietly Sudoku themes and settings on iPad"],
    ["assets/screenshots/ipad-ios-about.jpg", "50,000 checked puzzles. No ads.", "Quietly Sudoku information screen describing checked puzzles, offline play, and iCloud sync on iPad"],
    ["assets/screenshots/ipad-ios-hints-tutorial.jpg", "Clues that teach, one step at a time", "Quietly Sudoku onboarding screen explaining three-step teaching hints on iPad"],
    ["assets/screenshots/ipad-ios-resets-tutorial.jpg", "Resets keep play moving", "Quietly Sudoku onboarding screen explaining resets, lives, and hints on iPad"]
  ],
  Mac: [
    ["assets/screenshots/mac-home.png", "Five levels, daily puzzles, personal records", "Quietly Sudoku home screen on Mac"],
    ["assets/screenshots/mac-game.png", "Focused play on a larger screen", "Quietly Sudoku game board on Mac"],
    ["assets/screenshots/mac-hint.png", "A helpful next step, never a giveaway", "Quietly Sudoku progressive hint on Mac"],
    ["assets/screenshots/mac-settings.png", "Your settings stay close at hand", "Quietly Sudoku settings on Mac"]
  ]
};

const carousel = document.querySelector(".carousel");

const deviceCarousel = document.querySelector(".device-carousel");

if (deviceCarousel) {
  const devices = [...deviceCarousel.querySelectorAll(".device")];
  const dots = [...deviceCarousel.querySelectorAll(".device-dots button")];
  let deviceIndex = 0;
  let deviceTouchStart = 0;

  function renderDevice() {
    devices.forEach((device, index) => { device.hidden = index !== deviceIndex; });
    dots.forEach((dot, index) => {
      const active = index === deviceIndex;
      dot.classList.toggle("active", active);
      dot.setAttribute("aria-current", String(active));
    });
  }

  function moveDevice(direction) {
    deviceIndex = (deviceIndex + direction + devices.length) % devices.length;
    renderDevice();
  }

  dots.forEach((dot, index) => dot.addEventListener("click", () => {
    deviceIndex = index;
    renderDevice();
  }));
  deviceCarousel.querySelector(".device-previous").addEventListener("click", () => moveDevice(-1));
  deviceCarousel.querySelector(".device-next").addEventListener("click", () => moveDevice(1));
  deviceCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveDevice(-1);
    if (event.key === "ArrowRight") moveDevice(1);
  });
  deviceCarousel.addEventListener("touchstart", (event) => {
    deviceTouchStart = event.changedTouches[0].clientX;
  }, { passive: true });
  deviceCarousel.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - deviceTouchStart;
    if (Math.abs(distance) > 45) moveDevice(distance > 0 ? -1 : 1);
  }, { passive: true });

  renderDevice();
}

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
    tabs.forEach((tab) => {
      const active = tab.dataset.platform === platform;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
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
