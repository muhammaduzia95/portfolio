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

// // LOGO: prevent scroll, just play animation
// const logo = document.querySelector(".logo");

// if (logo) {
//   logo.addEventListener("click", (e) => {
//     e.preventDefault();
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   });
// }

// LOGO: scroll to top + trigger wink
const logo = document.querySelector(".logo");
const logoLid = document.querySelector(".logo__lid");

if (logo && logoLid) {
  logo.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Trigger wink animation
    logoLid.style.animation = "none";
    setTimeout(() => {
      logoLid.style.animation = "wink 0.42s ease-in-out 1";
    }, 10);
  });
}


// ==========================
// NAV: Hide on scroll down, show on scroll up
// ==========================
let lastScroll = 0;
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // If at top, always show
  if (currentScroll <= 70) {
    nav.classList.remove("nav--hidden");
    return;
  }

  // Scrolling down - hide
  if (currentScroll > lastScroll && currentScroll > 70) {
    nav.classList.add("nav--hidden");
  } 
  // Scrolling up - show
  else if (currentScroll < lastScroll) {
    nav.classList.remove("nav--hidden");
  }

  lastScroll = currentScroll;
});


// -----------------------------
// ==========================
// SCROLL ANIMATIONS
// ==========================
const observerOptions = {
  threshold: 0.15,
  rootMargin: "-50px 0px -50px 0px"
};

let lastScrollY = window.scrollY;
let scrollDirection = "down";

// Track scroll direction
window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
  lastScrollY = currentScrollY;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Entering viewport - animate in
      entry.target.classList.add("is-visible");
      entry.target.dataset.hasAnimated = "true";
    } else {
      // Leaving viewport
      const hasAnimated = entry.target.dataset.hasAnimated === "true";
      
      if (hasAnimated && scrollDirection === "up") {
        // Only fade out when scrolling UP past it
        entry.target.classList.remove("is-visible");
        entry.target.dataset.hasAnimated = "false";
      }
      // When scrolling DOWN past, stay visible (do nothing)
    }
  });
}, observerOptions);

// Observe all sections except hero
const sectionsToAnimate = document.querySelectorAll(".section");
sectionsToAnimate.forEach(section => observer.observe(section));
