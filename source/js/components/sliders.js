import Swiper from "../vendor/swiper.js";
import vars from "../_vars.js";
import {
  toggleClassInArray,
  toggleCustomClass,
  removeCustomClass,
  removeClassInArray,
  addCustomClass
} from '../functions/customFunctions';

document.addEventListener("DOMContentLoaded", function () {
  const { infoSliders } = vars;

  const valuteBtn = document.querySelector(".valute-btn");

  function removeDuplicateSlides(slider) {
    const container = slider.querySelector(".swiper-container");
    const duplicates = container.querySelectorAll(".swiper-slide-duplicate");
    duplicates.forEach(duplicate => duplicate.remove());
  }

  function createSwiper(slider) {
    const container = slider.querySelector(".swiper-container");
    const pagination = slider.querySelector(".swiper-pagination");

    if (slider.swiperInstance) {
      slider.swiperInstance.destroy(true, true);
      removeDuplicateSlides(slider);
    }

    slider.swiperInstance = new Swiper(container, {
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
        320: {
          loop: false,
          autoplay: false,
          allowTouchMove: true, 
        },
        1240: {
          loop: true,
          autoplay: {
            delay: 3000,
          },
          allowTouchMove: false,
        }
      }
    });
  }

  function handleResize() {
    infoSliders.forEach(function(slider) {
      createSwiper(slider);
    });
  }

  if(infoSliders && valuteBtn){
    window.addEventListener('resize', handleResize);

    handleResize();

    valuteBtn.addEventListener("click", function() {
      infoSliders.forEach(function(slider) {
        addCustomClass(slider, 'active');
        addCustomClass(valuteBtn, 'active');
      });
    });

    infoSliders.forEach(function(slider) {
      const closeBtn = slider.querySelector(".info-slider__close");
      
      closeBtn.addEventListener("click", function() {
        removeCustomClass(slider, 'active');
        removeCustomClass(valuteBtn, 'active');
      });
    });
  }
});
