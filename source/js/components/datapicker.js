import AirDatepicker from 'air-datepicker';
import { fadeIn, fadeOut } from "../functions/customFunctions.js";

const calendars = document.querySelectorAll('[data-calendar]');

calendars && calendars.forEach(function(calendar) {
    const button = calendar.querySelector('.main-form__btn');
    const input = calendar.querySelector('.main-form__input');

    const datepicker = new AirDatepicker(calendar, {
        position: 'center top',
        inline: false,
        buttons: [
            {
                content: 'Отменить',
                className: 'main-btn',
                tagName: 'span',
                onClick: (dp) => {
                    fadeOut(calendar.querySelector('.air-datepicker'), 200, 'none');
                    dp.hide();
                }
            },
            {
                content: 'Сохранить',
                className: 'blue-btn',
                tagName: 'span',
                onClick: (dp) => {
                    if (input && dp.selectedDates.length) {
                        input.value = dp.selectedDates[0].toLocaleDateString();
                    }
                    fadeOut(calendar.querySelector('.air-datepicker'), 200, 'none');
                    dp.hide();
                }
            }
        ],
        showEvent: '', 
        autoClose: false 
    });

    fadeOut(calendar.querySelector('.air-datepicker'), 200, 'none');

    button.addEventListener('click', function(event) {
        event.preventDefault();
        fadeIn(calendar.querySelector('.air-datepicker'), 200, 'grid'); 
        datepicker.show();
    });
});


