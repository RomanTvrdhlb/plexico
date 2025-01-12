import { RangeSlider } from "../functions/range";

document.addEventListener("DOMContentLoaded", function (e) {
    const ranges = document.querySelectorAll('.range');
  
    ranges.forEach(function (range) {
      const input = range.querySelector('[type="range"]');
      const valueElement = range.querySelector('.range__value input');
  
  
      if (range) {
        new RangeSlider(input, valueElement, '', '#055df5');
      }
    });
  });

