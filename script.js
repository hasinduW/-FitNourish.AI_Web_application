const body = document.body;
const loader = document.getElementById("loader");
const enterSite = document.getElementById("enterSite");
const skipIntro = document.getElementById("skipIntro");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const dropdownButtons = document.querySelectorAll(".dropbtn");
const toTop = document.getElementById("toTop");

// prevent scrolling while intro is visible
body.classList.add("no-scroll");

function closeIntro() {
  if (!loader) return;
  loader.classList.add("hidden");
  body.classList.remove("no-scroll");
}

if (enterSite) {
  enterSite.addEventListener("click", closeIntro);
}

if (skipIntro) {
  skipIntro.addEventListener("click", (e) => {
    e.preventDefault();
    closeIntro();
    setTimeout(() => {
      const target = document.querySelector("#home");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  });
}

// auto-close intro after a short delay
window.addEventListener("load", () => {
  setTimeout(() => {
    if (loader && !loader.classList.contains("hidden")) {
      closeIntro();
    }
  }, 2600);
});

// mobile nav
if (toggle) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
  });
}

// dropdown open on mobile
dropdownButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (window.innerWidth <= 820) {
      e.preventDefault();
      button.parentElement.classList.toggle("open");
    }
  });
});

// IMPORTANT: smooth scroll for ALL internal nav links
document.querySelectorAll('.nav a, .dropdown-menu a, .footer a, a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }

    // close mobile nav
    nav?.classList.remove("show");
    document.querySelectorAll(".dropdown").forEach((d) => d.classList.remove("open"));
    toggle?.setAttribute("aria-expanded", "false");
  });
});

// reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// back to top
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    toTop?.classList.add("show");
  } else {
    toTop?.classList.remove("show");
  }
});

toTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});