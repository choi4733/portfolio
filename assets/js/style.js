/* =========================
   intro video
========================= */

const video = document.querySelector("#introVideo");
const nav = document.querySelector("#nav");
const logo = document.querySelector(".logo");
const mainSection = document.querySelector(".main_section");

let introEnded = false;

/* 첫 진입 */
window.addEventListener("load", () => {
  nav.classList.remove("show");
  logo.classList.remove("show");

  setTimeout(() => {
    video.classList.add("show");
    video.currentTime = 0;

    video.play().catch((err) => {
      console.log("영상 재생 실패:", err);
    });
  }, 500);
});

/* 영상 종료 */
video.addEventListener("ended", () => {
  introEnded = true;

  window.scrollTo({
    top: mainSection.offsetTop,
    behavior: "smooth",
  });

  setTimeout(() => {
    nav.classList.add("show");
    logo.classList.add("show");
  }, 800);
});

/* 스크롤 시 로고/nav 등장 */
window.addEventListener("scroll", () => {
  if (window.scrollY > 100 || introEnded) {
    nav.classList.add("show");
    logo.classList.add("show");
  } else {
    nav.classList.remove("show");
    logo.classList.remove("show");
  }
});

/* =========================
   custom cursor
========================= */

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

/* 마우스 좌표 */
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

/* 커서 애니메이션 */
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

const hoverTargets = document.querySelectorAll("a, button, #nav li, video, .logo");

hoverTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  target.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});
