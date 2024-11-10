import { toggleCustomClass, fadeIn, fadeOut } from '../functions/customFunctions';

const fundsCloseBtns = document.querySelectorAll('.funds__close');
const fundsBtn = document.querySelector('.funds__btn');
const aside = document.querySelector('.funds__aside');
const box = document.querySelector('.funds__box');

let prevWindowWidth = window.innerWidth;

function handleResize() {
    const currentWidth = window.innerWidth;

    if ((prevWindowWidth <= 768 && currentWidth > 768) || (prevWindowWidth > 768 && currentWidth <= 768)) {
        aside?.classList.remove('active');
        box?.classList.remove('active');
    }

    prevWindowWidth = currentWidth;
}

window.addEventListener('resize', handleResize);

fundsCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(!aside.classList.contains('active')){
            fadeIn(fundsBtn, 300, 'flex');
        } else {
            fadeOut(fundsBtn, 300, 'flex');
        }
        toggleCustomClass(aside, 'active');
        toggleCustomClass(box, 'active');
        
    });
});

fundsBtn?.addEventListener('click', () => {
    if(!aside.classList.contains('active')){
        fadeIn(fundsBtn, 300, 'flex');
    } else {
        fadeOut(fundsBtn, 300, 'flex');
    }
    toggleCustomClass(aside, 'active');
    toggleCustomClass(box, 'active');
});
