// ==========================
// Muhammad Zia | Portfolio JS
// ==========================

// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// NAV: burger
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

if (burger && menu) {
  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", menu.classList.contains("is-open"));
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}


// ACTIVE LINK ON SCROLL
const links = document.querySelectorAll(".menu__link");
const sections = [...links].map((a) =>
  document.querySelector(a.getAttribute("href"))
);

function setActiveLink() {
  const y = window.scrollY + 120;
  let current = sections[0];

  for (const sec of sections) {
    if (sec && sec.offsetTop <= y) current = sec;
  }

  links.forEach((l) => l.classList.remove("is-active"));
  const active = document.querySelector(`.menu__link[href="#${current.id}"]`);
  if (active) active.classList.add("is-active");
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// Close mobile menu after clicking a link
links.forEach((l) => {
  l.addEventListener("click", () => {
    if (menu) menu.classList.remove("is-open");
  });
});

// TIMELINE: tap/click line to toggle card (mobile friendly)
const segs = document.querySelectorAll(".timeline__seg");

function closeAllSegCards() {
  segs.forEach((s) => s.classList.remove("is-active"));
}

segs.forEach((seg) => {
  seg.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = seg.classList.contains("is-active");
    closeAllSegCards();
    if (!isOpen) seg.classList.add("is-active");
  });
});

document.addEventListener("click", closeAllSegCards);
window.addEventListener("scroll", closeAllSegCards);

// ==========================
// THEME: light/dark mode
// - default follows system
// - if user toggles, it persists
// - if system changes, update ONLY if user didn't choose
// ==========================
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const mq = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme, persist = false) {
  document.documentElement.setAttribute("data-theme", theme);

  if (persist) {
    localStorage.setItem("theme", theme);
  }

  // switch icon
  if (themeIcon) {
    themeIcon.className =
      theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
}

// initial theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme, true);
} else {
  applyTheme(mq.matches ? "dark" : "light", false);
}

// if system theme changes, update site ONLY if user hasn't chosen manually
mq.addEventListener("change", (e) => {
  const saved = localStorage.getItem("theme");
  if (!saved) applyTheme(e.matches ? "dark" : "light", false);
});

// toggle click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark", true);
  });
}

// ==========================
// LOGO: play blink sound when wink animation starts
// ==========================
const winkSound = document.getElementById("winkSound");
const lid = document.querySelector(".logo__lid");

function playWinkSound() {
  if (!winkSound) return;
  try {
    winkSound.currentTime = 0;
    winkSound.play();
  } catch (e) {
    // ignore autoplay restrictions
  }
}

if (lid && winkSound) {
  // This matches the blink exactly (because CSS triggers the animation)
  lid.addEventListener("animationstart", playWinkSound);
}



