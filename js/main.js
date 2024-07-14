// Preloader
const preloader = document.querySelector("body > .preloader");

window.onload = function () {
  preloader.classList.add("loaded");
};

// Stats Increasing Number animation
const stats = document.querySelector(".homepage-content .stats");
const statsElements = document.querySelectorAll(".homepage-content .stats .counter-animation");
let started = false;

window.onscroll = function () {
  if (window.scrollY >= stats.offsetTop - 500) {
    if (!started) {
      statsElements.forEach((ele) => counterAnimation(ele));
    }
    started = true;
  }
};

function counterAnimation(element) {
  let goal = element.dataset.stats;
  let counter = setInterval(() => {
    element.textContent !== goal ? element.textContent++ : clearInterval(counter);
  }, 300 / goal);
}

// Footer Date
const date = new Date();
const footerDate = document.querySelector("footer .bottom-footer > .date");

footerDate.textContent = date.getFullYear();