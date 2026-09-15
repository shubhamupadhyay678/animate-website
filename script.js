const slides = [
  { theme: "orange", title: "feel the pop", word: "orange", image: "images/bisleri-pop.png" },
  { theme: "green", title: "choose the cool", word: "limonata", image: "images/bisleri-limonita.png" }
];

let activeSlide = 0;
const hero = document.querySelector(".hero");
const heroCopy = document.querySelector(".hero-copy");
const heroTitle = document.querySelector("#heroTitle");
const heroWord = document.querySelector("#heroWord");
const heroBottle = document.querySelector("#heroBottle");
const heroBigPop = document.querySelector("#heroBigPop");
const heroDownPop = document.querySelector("#heroDownPop");
const heroBigLemon = document.querySelector("#heroBigLemon");
const heroDownLemon = document.querySelector("#heroDownLemon");
const heroDetail = document.querySelector("#heroDetail");
const slideNumber = document.querySelector("#slideNumber");

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  const slide = slides[activeSlide];
  hero.dataset.slide = slide.theme;
  heroTitle.textContent = slide.title;
  heroWord.textContent = slide.word;
  heroBottle.src = slide.image;
  heroBottle.alt = `Bisleri ${slide.title} bottle`;
  heroBigPop.classList.toggle("is-entering", slide.theme === "orange");
  heroDownPop.classList.toggle("is-entering", slide.theme === "orange");
  heroBigLemon.classList.toggle("is-entering", slide.theme === "green");
  heroDownLemon.classList.toggle("is-entering", slide.theme === "green");
  heroDetail.src = slide.theme === "orange" ? "images/pop_imagsmall.png" : "images/limontanto_small.png";
  heroDetail.alt = `Bisleri ${slide.word} detail`;
  slideNumber.textContent = `0${activeSlide + 1}`;
  heroCopy.classList.remove("is-entering");
  heroBottle.classList.remove("is-entering");
  heroBigPop.classList.remove("is-entering");
  heroDownPop.classList.remove("is-entering");
  heroBigLemon.classList.remove("is-entering");
  heroDownLemon.classList.remove("is-entering");
  heroDetail.classList.remove("is-entering");
  void heroBottle.offsetWidth;
  heroCopy.classList.add("is-entering");
  heroBottle.classList.add("is-entering");
  if (slide.theme === "orange") heroBigPop.classList.add("is-entering");
  if (slide.theme === "orange") heroDownPop.classList.add("is-entering");
  if (slide.theme === "green") heroBigLemon.classList.add("is-entering");
  if (slide.theme === "green") heroDownLemon.classList.add("is-entering");
  heroDetail.classList.add("is-entering");
}

document.querySelector("#menuToggle").addEventListener("click", () => document.querySelector("#navLinks").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => document.querySelector("#navLinks").classList.remove("open")));

heroCopy.classList.add("is-entering");
heroBottle.classList.add("is-entering");
heroBigPop.classList.add("is-entering");
heroDownPop.classList.add("is-entering");
heroDetail.classList.add("is-entering");
window.setInterval(() => showSlide(activeSlide + 1), 4800);

const scrollBottle = document.querySelector("#scrollBottle");
const showcase = document.querySelector(".scroll-showcase");
let targetBottleProgress = 0;
let bottleProgress = 0;
let bottleFrame = 0;

function updateBottleTarget() {
  const scrollDistance = showcase.offsetHeight - window.innerHeight;
  targetBottleProgress = Math.max(0, Math.min(1, (window.scrollY - showcase.offsetTop) / scrollDistance));
  if (!bottleFrame) bottleFrame = window.requestAnimationFrame(animateBottle);
}

function animateBottle() {
  bottleProgress += (targetBottleProgress - bottleProgress) * 0.11;
  const translateY = -34 + bottleProgress * 65;
  const rotation = -8 + bottleProgress * 16;
  scrollBottle.style.transform = `translate3d(0, ${translateY}vh, 0) rotate(${rotation}deg)`;

  if (Math.abs(targetBottleProgress - bottleProgress) > 0.001) {
    bottleFrame = window.requestAnimationFrame(animateBottle);
  } else {
    bottleFrame = 0;
  }
}

window.addEventListener("scroll", updateBottleTarget, { passive: true });
window.addEventListener("resize", updateBottleTarget);
updateBottleTarget();
