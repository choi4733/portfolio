const video = document.querySelector("#introVideo");
const nav = document.querySelector("#nav");
const logo = document.querySelector(".logo");
const mainSection = document.querySelector(".main_section");

let introEnded = false;
let lastScrollY = 0;
let isIntroPlaying = false;

/* 영상 재생 함수 */
function playIntroVideo() {
  if (isIntroPlaying) return;

  introEnded = false;
  isIntroPlaying = true;

  nav.classList.remove("show");
  logo.classList.remove("show");

  video.classList.add("show");
  video.currentTime = 0;

  video.play().catch((err) => {
    console.log("video autoplay error:", err);
  });
}

/* 첫 진입 */
window.addEventListener("load", () => {
  setTimeout(() => {
    playIntroVideo();
  }, 500);
});

/* 영상 종료 */
video.addEventListener("ended", () => {
  introEnded = true;
  isIntroPlaying = false;

  window.scrollTo({
    top: mainSection.offsetTop,
    behavior: "smooth",
  });

  setTimeout(() => {
    nav.classList.add("show");
    logo.classList.add("show");
  }, 700);
});

/* 스크롤 */
window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  /* intro 화면으로 다시 올라오면 영상 재생 */
  if (currentScrollY < 100) {
    nav.classList.remove("show");
    logo.classList.remove("show");

    if (!isIntroPlaying) {
      playIntroVideo();
    }

    lastScrollY = currentScrollY;
    return;
  }

  /* 아래로 스크롤하면 nav 숨김 */
  if (currentScrollY > lastScrollY) {
    nav.classList.remove("show");
    logo.classList.remove("show");
  } else {
    nav.classList.add("show");
    logo.classList.add("show");
  }

  lastScrollY = currentScrollY;
});

/*cursor */
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

/* =========================
   hover effect
========================= */

const hoverTargets = document.querySelectorAll("a, button, #nav li,  .logo");

hoverTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  target.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});
