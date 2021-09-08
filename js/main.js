const mobilenav = document.querySelector(".mobile-menu");
const mobileLinks = mobilenav.querySelectorAll("a");
const navLinks = document.querySelectorAll(".nav-link");
const ham = document.querySelector(".hamburger");
const ham1 = ham.querySelector(".ham1");
const ham2 = ham.querySelector(".ham2");

let hamopen = false;

function handleHam(e) {
  if (hamopen) {
    ham1.classList.remove("ham1open");
    ham2.classList.remove("ham2open");
    mobileLinks.forEach((link) => link.classList.remove("aopen"));
    setTimeout(() => {
      mobilenav.classList.remove("mobile-menu-open");
    }, 500);
  } else {
    ham1.classList.add("ham1open");
    ham2.classList.add("ham2open");
    mobilenav.classList.add("mobile-menu-open");
    setTimeout(() => {
      mobileLinks.forEach((link) => link.classList.add("aopen"));
    }, 700);
  }
  hamopen = !hamopen;
}

function initSmoothScrolling(container, animation) {
  /*
   * @param {String} container Class or ID of the animation container
   * @param {String} animation Name of the animation, e.g. smoothscroll
   */
  var sliderWidth = 0;
  var animationWidth = 0;
  var sliderHeight = $(">div>div:first-of-type", container).outerHeight(false);

  $(">div>div", container).each(function () {
    animationWidth += $(this).outerWidth(false);
  });

  // detect number of visible slides
  var slidesVisible =
    $(container).width() /
    $(">div>div:first-of-type", container).outerWidth(false);
  slidesVisible = Math.ceil(slidesVisible);

  // count slides to determine animation speed
  var slidesNumber = $(">div>div", container).length;
  var speed = slidesNumber * 2;

  // append the tail
  $(">div>div", container)
    .slice(0, slidesVisible)
    .clone()
    .appendTo($(">div", container));

  // Detect the slider width with appended tail
  $(">div>div", container).each(function () {
    sliderWidth += $(this).outerWidth(false);
  });

  // set slider dimensions
  $(">div", container).css({ width: sliderWidth, height: sliderHeight });

  // Insert styles to html
  $(
    "<style type='text/css'>@keyframes " +
      animation +
      " { 0% { margin-left: 0px; } 100% { margin-left: -" +
      animationWidth +
      "px; } } " +
      $(">div>div:first-of-type", container).selector +
      " { -webkit-animation: " +
      animation +
      " " +
      speed +
      "s linear infinite; -moz-animation: " +
      animation +
      " " +
      speed +
      "s linear infinite; -ms-animation: " +
      animation +
      " " +
      speed +
      "s linear infinite; -o-animation: " +
      animation +
      " " +
      speed +
      "s linear infinite; animation: " +
      animation +
      " " +
      speed +
      "s linear infinite; }</style>"
  ).appendTo("head");

  // restart the animation (e.g. for safari & ie)
  var cl = $(container).attr("class");
  $(container)
    .removeClass(cl)
    .animate({ nothing: null }, 1, function () {
      $(this).addClass(cl);
    });
}

ham.addEventListener("click", handleHam);

window.onload = function () {

  initSmoothScrolling(".block", "smoothscroll");
  var slides = document.getElementsByClassName("carousel-item"),
    addActive = function (slide) {
      slide.classList.add("active");
    },
    removeActive = function (slide) {
      slide.classList.remove("active");
    };
  addActive(slides[0]);

  setInterval(function () {
    for (var i = 0; i < slides.length; i++) {
      if (i + 1 == slides.length) {
        addActive(slides[0]);
        slides[0].style.zIndex = 100;
        setTimeout(removeActive, 350, slides[i]); //Doesn't be worked in IE-9
        break;
      }
      if (slides[i].classList.contains("active")) {
        slides[i].removeAttribute("style");
        setTimeout(removeActive, 350, slides[i]); //Doesn't be worked in IE-9
        addActive(slides[i + 1]);
        break;
      }
    }
  }, 4000);
};
