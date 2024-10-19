const parentForms = document.querySelectorAll(".main-form");
const connectForms =  document.querySelectorAll('.connect-card');
const copyForms =  document.querySelectorAll('.copy-form');

parentForms &&
  parentForms.forEach(function (form) {
    const parentInputs = form.querySelector(".main-form__inputs");

    if (parentInputs) {
    const inputs = parentInputs.querySelectorAll('.main-form__input');
  
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
      });
    }
  });

  connectForms && connectForms.forEach(card => {
    const input = card.querySelector('.connect-card__input');
    const button = card.querySelector('.blue-btn');

    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (input) {
        input.select();
        try {
          const copied = document.execCommand('copy');
          
          if (copied) {
            input.value = 'Скопировано';
            input.style.color = '#00AC45';
          } else {
            throw new Error('Copy failed');
          }
        } catch (error) {
          input.value = 'Ошибка';
          input.style.color = '#E34545';
        }
      }
    });
  });

  copyForms && copyForms.forEach(card => {
    const input = card.querySelector('.copy-form__input');
    const button = card.querySelector('.copy-form__btn');

    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (input) {
        input.select();
        try {
          const copied = document.execCommand('copy');
          
          if (copied) {
            input.value = 'Скопировано';
            input.style.color = '#00AC45';
            input.style.textAlign = 'center';
          } else {
            throw new Error('Copy failed');
          }
        } catch (error) {
          input.value = 'Ошибка';
          input.style.color = '#E34545';
          input.style.textAlign = 'center';
        }
      }
    });
  });
