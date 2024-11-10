import vars from '../_vars.js';
import { removeCustomClass, addCustomClass } from '../functions/customFunctions';

const {  toggles, notificationParrents } = vars;

toggles &&  toggles.forEach(toggle => {
    const textElement = toggle.querySelector('.checkbox-toogle__text');
    const inputElement = toggle.querySelector('input[type="checkbox"]');

    if (textElement && inputElement) {
        const updateText = () => {
            textElement.textContent = inputElement.checked ? 'Включено' : 'Выключено';
        };

        updateText();

        inputElement.addEventListener('change', updateText);
    }
});

notificationParrents && notificationParrents.forEach(row => {
    const checkbox = row.querySelector('.checkbox-toogle input[type="checkbox"]');
    const content = row.querySelector('.notifications__content');

    if (checkbox && content) {
        const updateVisibility = () => {
            if (checkbox.checked) {
               
                content.style.maxHeight = 'none';
             
                const contentHeight = content.scrollHeight + 'px';
                
                content.style.maxHeight = contentHeight;
                content.classList.add('active');
            } else {
                content.style.maxHeight = '0';
                content.classList.remove('active');
            }
        };

        updateVisibility();

        checkbox.addEventListener('change', updateVisibility);

        window.addEventListener('resize', () => {
            if (content.classList.contains('active')) {
                content.style.maxHeight = 'none';
                const contentHeight = content.scrollHeight + 'px';
                content.style.maxHeight = contentHeight;
            }
        });
    }
});