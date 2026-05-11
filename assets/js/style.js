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

/* 영상 끝났을 때 딱 한 번만 artwork로 이동 */
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
      }, 1200);
    }

    nav.classList.add("show");
    lastScrollY = window.scrollY;
  },
  { once: true },
);

window.addEventListener("scroll", () => {
  if (isAutoScrolling) return;

  const currentScrollY = window.scrollY;

  if (currentScrollY < 100) {
    nav.classList.remove("show");
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY > lastScrollY) {
    nav.classList.remove("show");
  } else {
    nav.classList.add("show");
  }

  lastScrollY = currentScrollY;
});

// cursor
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

// artwork
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

// 스와이퍼 클래스 추가
swiper.on("setTranslate", () => {
  document.querySelectorAll(".swiper-slide").forEach((slide) => {
    slide.classList.remove("swiper-slide-prev-prev", "swiper-slide-next-next");
  });

  const prev = document.querySelector(".swiper-slide-prev");
  const next = document.querySelector(".swiper-slide-next");

  if (prev && prev.previousElementSibling) {
    prev.previousElementSibling.classList.add("swiper-slide-prev-prev");
  }

  if (next && next.nextElementSibling) {
    next.nextElementSibling.classList.add("swiper-slide-next-next");
  }
});
