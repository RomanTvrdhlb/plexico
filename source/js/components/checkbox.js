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
                // Сбрасываем max-height перед расчетом для правильного измерения
                content.style.maxHeight = 'none';

                // Измеряем реальную высоту контента
                const contentHeight = content.scrollHeight + 'px';
                
                // Устанавливаем max-height для анимации
                content.style.maxHeight = contentHeight;
                content.classList.add('active');
            } else {
                // Плавно скрываем контент
                content.style.maxHeight = '0';
                content.classList.remove('active');
            }
        };

        // Инициализация видимости блока при загрузке страницы
        updateVisibility();

        // Обработчик изменения состояния чекбокса
        checkbox.addEventListener('change', updateVisibility);

        // Обработчик ресайза окна для пересчета высоты
        window.addEventListener('resize', () => {
            if (content.classList.contains('active')) {
                // Пересчитываем высоту для активного контента
                content.style.maxHeight = 'none'; // Сброс
                const contentHeight = content.scrollHeight + 'px';
                content.style.maxHeight = contentHeight; // Обновление высоты
            }
        });
    }
});