// Preloader
const preloader = document.querySelector("body > .preloader");

window.onload = function () {
  preloader.classList.add("loaded");
};

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

// AOS Animation Library
AOS.init();
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});
