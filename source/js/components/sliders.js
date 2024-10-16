import Swiper from "../vendor/swiper.js";
import vars from "../_vars.js";

document.addEventListener("DOMContentLoaded", function () {
  const { infoSliders } = vars;

  infoSliders.forEach(function (slider) {
    const container = slider.querySelector(".swiper-container");
    const pagination = slider.querySelector(".swiper-pagination");

    const mainSwiper = new Swiper(container, {
      spaceBetween: 20,
      slidesPerView: 1,
      speed: 1800,
      watchOverflow: true,
      observer: true,
      observeParents: true,

      pagination: {
        el: pagination,
        clickable: true,
      },


      breakpoints: {
        320:{
          loop: false,
          autoplay: false,
        },
        1240:{
          loop: true,
          autoplay: true,
        }
      }
    });
  });

});
