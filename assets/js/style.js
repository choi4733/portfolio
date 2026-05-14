const video = document.querySelector("#introVideo");
const nav = document.querySelector("#nav");
const artwork = document.querySelector(".artwork");

let lastScrollY = 0;
let isIntroPlaying = false;
let isAutoScrolling = false;

function playIntroVideo() {
  if (isIntroPlaying) return;

  isIntroPlaying = true;
  nav.classList.remove("show");

  video.classList.add("show");
  video.currentTime = 0;

  video.play().catch((err) => {
    console.log("video autoplay error:", err);
  });
}

window.addEventListener("load", () => {
  setTimeout(() => {
    playIntroVideo();
  }, 500);
});

/* 영상 끝났을 때 artwork로 이동 */
video.addEventListener(
  "ended",
  () => {
    isIntroPlaying = false;

    if (window.scrollY < artwork.offsetTop - 50) {
      isAutoScrolling = true;

      window.scrollTo({
        top: artwork.offsetTop,
        behavior: "smooth",
      });

      setTimeout(() => {
        isAutoScrolling = false;
        activeNav();
      }, 1200);
    }

    nav.classList.add("show");
    lastScrollY = window.scrollY;
    activeNav();
  },
  { once: true },
);

/* nav active */
const navLinks = document.querySelectorAll("#nav a");

function activeNav() {
  let currentId = "";

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    link.parentElement.classList.remove("active");

    if (!targetSection) return;

    const rect = targetSection.getBoundingClientRect();

    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      currentId = targetId;
    }
  });

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentId) {
      link.parentElement.classList.add("active");
    }
  });
}

window.addEventListener("load", activeNav);
window.addEventListener("scroll", activeNav);
activeNav();

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.parentElement.classList.remove("active");
    });

    link.parentElement.classList.add("active");
  });
});

/* nav 보이기 - 숨기기 */
window.addEventListener("scroll", () => {
  if (isAutoScrolling) return;

  const currentScrollY = window.scrollY;

  if (currentScrollY < 100) {
    nav.classList.remove("show");
    lastScrollY = currentScrollY;
    activeNav();
    return;
  }

  if (currentScrollY > lastScrollY) {
    nav.classList.remove("show");
  } else {
    nav.classList.add("show");
  }

  lastScrollY = currentScrollY;
  activeNav();
});

/* cursor */
const cursor = document.querySelector(".cursor");
const circle1 = document.querySelector(".circle1");
const circle2 = document.querySelector(".circle2");
const circle3 = document.querySelector(".circle3");

let mouseX = 0;
let mouseY = 0;

let c1X = 0;
let c1Y = 0;
let c2X = 0;
let c2Y = 0;
let c3X = 0;
let c3Y = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function cursorAnimation() {
  c1X += (mouseX - c1X) * 0.35;
  c1Y += (mouseY - c1Y) * 0.35;

  c2X += (mouseX - c2X) * 0.18;
  c2Y += (mouseY - c2Y) * 0.18;

  c3X += (mouseX - c3X) * 0.1;
  c3Y += (mouseY - c3Y) * 0.1;

  circle1.style.transform = `translate(${c1X - 20}px, ${c1Y - 20}px)`;
  circle2.style.transform = `translate(${c2X - 20}px, ${c2Y - 20}px)`;
  circle3.style.transform = `translate(${c3X - 10}px, ${c3Y - 10}px)`;

  requestAnimationFrame(cursorAnimation);
}

cursorAnimation();

const hoverTargets = document.querySelectorAll("a, button, #nav li");

hoverTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  target.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

/* artwork */
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".artwork img",
  {
    opacity: 0,
    y: 80,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".artwork",
      start: "top 30%",
      toggleActions: "play none none reverse",
    },
  },
);

gsap.fromTo(
  ".art_text",
  {
    opacity: 0,
    y: 100,
  },
  {
    opacity: 1,
    y: 0,
    duration: 2.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".artwork",
      start: "top 35%",
      toggleActions: "play none none reverse",
    },
  },
);

/* 포토샵 */
const eventThumb = document.querySelector(".event_thumb");
const eventPreview = document.querySelector(".event_preview");

if (eventThumb && eventPreview) {
  eventThumb.addEventListener("mouseenter", () => {
    eventPreview.classList.add("show");
  });

  eventThumb.addEventListener("mousemove", (e) => {
    eventPreview.style.left = e.clientX + 24 + "px";
    eventPreview.style.top = e.clientY + 24 + "px";
  });

  eventThumb.addEventListener("mouseleave", () => {
    eventPreview.classList.remove("show");
  });
}

const eventModal = document.querySelector(".event_modal");
const eventClose = document.querySelector(".event_close");

if (eventThumb && eventModal && eventClose) {
  eventThumb.addEventListener("click", () => {
    eventModal.classList.add("show");
    eventPreview.classList.remove("show");
    document.body.style.overflow = "hidden";
  });

  eventClose.addEventListener("click", () => {
    eventModal.classList.remove("show");
    document.body.style.overflow = "";
  });

  eventModal.addEventListener("click", (e) => {
    if (e.target === eventModal) {
      eventModal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });
}

/* banner horizontal scroll */
const bannerSection = document.querySelector(".banner");
const bannerInner = document.querySelector(".banner_inner");

if (bannerSection && bannerInner) {
  gsap.to(bannerInner, {
    x: () => -(bannerInner.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: bannerSection,
      start: "top top",
      end: () => "+=" + (bannerInner.scrollWidth - window.innerWidth),
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });
}

/* After Effects swiper 추가 클래스 */
window.addEventListener("load", () => {
  const afterSwiperEl = document.querySelector(".afterSwiper");

  if (!afterSwiperEl || !afterSwiperEl.swiper) return;

  const swiper = afterSwiperEl.swiper;

  swiper.on("setTranslate", () => {
    document.querySelectorAll(".afterSwiper .swiper-slide").forEach((slide) => {
      slide.classList.remove("swiper-slide-prev-prev", "swiper-slide-next-next");
    });

    const prev = document.querySelector(".afterSwiper .swiper-slide-prev");
    const next = document.querySelector(".afterSwiper .swiper-slide-next");

    if (prev && prev.previousElementSibling) {
      prev.previousElementSibling.classList.add("swiper-slide-prev-prev");
    }

    if (next && next.nextElementSibling) {
      next.nextElementSibling.classList.add("swiper-slide-next-next");
    }
  });
});
