import {
  removeClassInArray,
  addClassInArray,
} from "../functions/customFunctions.js";

const connectForms = document.querySelectorAll(".connect-card");
const copyForms = document.querySelectorAll(".copy-form");
const parentForms = document.querySelectorAll(".main-form");
const partnersForms = document.querySelectorAll("[data-partners]");

parentForms &&
  parentForms.forEach(function (form) {
    if (form.classList.contains("support-form")) return;

    const parentInputs = form.querySelector(".main-form__inputs");

    if (parentInputs) {
      const inputs = parentInputs.querySelectorAll(".main-form__input");

      inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
          if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        });

        input.addEventListener("keydown", (e) => {
          if (e.key === "Backspace" && input.value === "" && index > 0) {
            inputs[index - 1].focus();
          }
        });

        input.addEventListener("paste", (e) => {
          e.preventDefault();
          const pasteData = (e.clipboardData || window.clipboardData).getData("text");
          
          pasteData.split("").forEach((char, pasteIndex) => {
            if (pasteIndex < inputs.length) {
              inputs[pasteIndex].value = char;
            }
          });

          const lastFilledInput = inputs[Math.min(pasteData.length - 1, inputs.length - 1)];
          lastFilledInput.focus();
        });
      });
    }
  });

connectForms &&
  connectForms.forEach((card) => {
    const input = card.querySelector(".connect-card__input");
    const button = card.querySelector(".blue-btn");

    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (input) {
        input.select();
        try {
          const copied = document.execCommand("copy");

          if (copied) {
            input.value = "Скопировано";
            input.style.color = "#00AC45";
          } else {
            throw new Error("Copy failed");
          }
        } catch (error) {
          input.value = "Ошибка";
          input.style.color = "#E34545";
        }
      }
    });
  });

copyForms &&
  copyForms.forEach((card) => {
    const input = card.querySelector(".copy-form__input");
    const button = card.querySelector(".copy-form__btn");

    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (input) {
        input.select();
        try {
          const copied = document.execCommand("copy");

          if (copied) {
            input.value = "Скопировано";
            input.style.color = "#00AC45";
            input.style.textAlign = "center";
          } else {
            throw new Error("Copy failed");
          }
        } catch (error) {
          input.value = "Ошибка";
          input.style.color = "#E34545";
          input.style.textAlign = "center";
        }
      }
    });
  });

const supportForms = document.querySelectorAll(".support-form.main-form");

supportForms &&
  supportForms.forEach(function (form) {
    const parentInputs = form.querySelector(".main-form__inputs");
    const toggleEye = form.querySelector(".main-form__eye");
    const copyButton = form.querySelector("[data-copy]");
    const refreshButton = form.querySelector("[data-refresh]");
    let isPasswordVisible = false;
    let originalValues = new Array(5).fill("");

    function generateRandomValues() {
      originalValues = originalValues.map(() => Math.floor(Math.random() * 10));
      updateInputs();
    }

    function updateInputs() {
      const inputs = parentInputs.querySelectorAll(".main-form__input");
      inputs.forEach((input, index) => {
        input.value = isPasswordVisible ? originalValues[index] : "x";
        input.setAttribute("disabled", true);
      });
    }

    generateRandomValues();

    toggleEye.addEventListener("click", (e) => {
      e.preventDefault();
      const inputs = parentInputs.querySelectorAll(".main-form__input");
      
      isPasswordVisible = !isPasswordVisible;
      updateInputs();
      toggleEye.classList.toggle("active", isPasswordVisible);
      inputs.forEach(function(input){
        input.classList.toggle("active");
      })
    });

    copyButton.addEventListener("click", (e) => {
      e.preventDefault();
      const code = originalValues.join("");
      navigator.clipboard.writeText(code).then(() => {
      }).catch(err => {
        console.error("Ошибка копирования: ", err);
      });
    });

    refreshButton.addEventListener("click", (e) => {
      e.preventDefault();
      generateRandomValues();
    });
  });

  const passForms = document.querySelectorAll(".pass-form");

  passForms &&
    passForms.forEach(function (form) {
      const labels = form.querySelectorAll(".main-form__label");
  
      labels.forEach(function (label) {
        const eyeButton = label.querySelector('.main-form__eye');
        const input = label.querySelector('.main-form__input');
  
       
        input.setAttribute('data-real-value', input.value || '');
  
        if (input.value) {
          eyeButton.classList.add('show');
          eyeButton.classList.add('active'); 
          input.style.paddingTop = '11px';
          input.style.transition = 'initial';
  
          input.value = '*'.repeat(input.getAttribute('data-real-value').length);
        }
  
        input.addEventListener('input', (event) => {
          const realValue = input.getAttribute('data-real-value') || '';
  
       
          if (event.inputType === 'deleteContentBackward') {
            input.setAttribute('data-real-value', realValue.slice(0, -1));
          } else {
        
            input.setAttribute('data-real-value', realValue + event.data);
          }
  
          if (input.value) {
            eyeButton.classList.add('show');
          } else {
            eyeButton.classList.remove('show');
          }
  
          if (eyeButton.classList.contains('active')) {
            input.style.transition = 'initial';
            input.style.paddingTop = '11px';
            input.value = '*'.repeat(input.getAttribute('data-real-value').length);
          } else {
            input.style.paddingTop = '4px';
            setTimeout(() => {
              input.style.transition = 'all 0.3s';
            }, 50);
            input.value = input.getAttribute('data-real-value');
          }
        });
  
        input.addEventListener('blur', () => {
          if (!input.value && !eyeButton.classList.contains('active')) {
            eyeButton.classList.remove('show');
          }
        });
  
        eyeButton.addEventListener('click', (event) => {
          event.preventDefault();
  
          if (eyeButton.classList.contains('active')) {
            input.type = 'text';
            input.value = input.getAttribute('data-real-value'); 
            eyeButton.classList.remove('active');
            input.style.paddingTop = '4px';
            setTimeout(() => {
              input.style.transition = 'all 0.3s';
            }, 50);
          } else {
            input.type = 'text';
            input.value = '*'.repeat(input.getAttribute('data-real-value').length);
            eyeButton.classList.add('active');
            input.style.transition = 'initial';
            input.style.paddingTop = '11px';
          }
        });
      });
    });

    partnersForms &&
    partnersForms.forEach((card) => {
      const input = card.querySelector("input");
      const button = card.querySelector("[data-copy-btn]");
  
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        if (input) {
          try {
            await navigator.clipboard.writeText(input.value);
            button.innerText = "Скопировано";
          } catch (error) {
            button.innerText = "Ошибка";
            button.style.color = "#E34545";
          }
        }
      });
    });