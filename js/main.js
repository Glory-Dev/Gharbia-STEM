// Preloader
const preloader = document.querySelector("body > .preloader");

window.onload = function () {
  preloader.classList.add("loaded");
};

// Scroll To Top
const scrollToTop = document.querySelector("body > .scroll-top");

window.addEventListener("scroll", () => (scrollY >= 750 ? scrollToTop.classList.add("show") : scrollToTop.classList.remove("show")));

scrollToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Navbar
const navbar = document.querySelector("body > .navbar .navbar-links");
const navbarToggler = document.querySelector("body > .navbar .menu-icon");
const navbarMegeMenuLinks = document.querySelectorAll("body > .navbar .mega-menu a");

navbarMegeMenuLinks.forEach((a) => {
  a.addEventListener("click", function () {
    navbarToggler.ariaExpanded = false;
    navbar.classList.remove("show");
  });
  document.querySelector("body > .navbar").nextElementSibling.addEventListener("click", function () {
    navbarToggler.ariaExpanded = false;
    navbar.classList.remove("show");
  });
});

// Stats Increasing Number animation
const stats = document.querySelector(".about-main-content .stats");
const statsElements = document.querySelectorAll(".about-main-content .stats .counter-animation");
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

// Bootstrap Modal Component
// const myModal = document.getElementById("myModal");
// const myInput = document.getElementById("myInput");

// myModal.addEventListener("shown.bs.modal", () => {
//   myInput.focus();
// });
