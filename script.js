document.getElementById("year").textContent = new Date().getFullYear();

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
  menu.classList.toggle("is-open");
});

const links = document.querySelectorAll(".menu__link");
const sections = [...links].map(a => document.querySelector(a.getAttribute("href")));

function setActiveLink() {
  const y = window.scrollY + 120;
  let current = sections[0];

  for (const sec of sections) {
    if (sec && sec.offsetTop <= y) current = sec;
  }

  links.forEach(l => l.classList.remove("is-active"));
  const active = document.querySelector(`.menu__link[href="#${current.id}"]`);
  if (active) active.classList.add("is-active");
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

links.forEach(l => {
  l.addEventListener("click", () => menu.classList.remove("is-open"));
});

// TIMELINE: tap/click line to toggle card (mobile friendly)
const segs = document.querySelectorAll(".timeline__seg");

function closeAllSegCards() {
  segs.forEach(s => s.classList.remove("is-active"));
}

segs.forEach(seg => {
  seg.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = seg.classList.contains("is-active");
    closeAllSegCards();
    if (!isOpen) seg.classList.add("is-active");
  });
});

document.addEventListener("click", closeAllSegCards);
window.addEventListener("scroll", closeAllSegCards);

// THEME: light/dark mode
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // switch icon
  if (themeIcon) {
    themeIcon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
}

// initial theme (follow system unless user explicitly chose)
const savedTheme = localStorage.getItem("theme");
const mq = window.matchMedia("(prefers-color-scheme: dark)");

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(mq.matches ? "dark" : "light");
}

// if system theme changes, update website ONLY if user hasn't chosen manually
mq.addEventListener("change", (e) => {
  const saved = localStorage.getItem("theme");
  if (!saved) applyTheme(e.matches ? "dark" : "light");
});


// toggle
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });
}
