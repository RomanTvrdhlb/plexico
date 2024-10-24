import { toggleCustomClass } from '../functions/customFunctions';

const closeBtn = document.querySelector('.verification__close');
const openBtn = document.querySelector('.verification__btn');
const aside = document.querySelector('.verification__aside');

let prevWindowWidth = window.innerWidth;

function handleResize() {
    const currentWidth = window.innerWidth;

    if ((prevWindowWidth <= 768 && currentWidth > 768) || (prevWindowWidth > 768 && currentWidth <= 768) ||
    (prevWindowWidth >= 1024 && currentWidth < 1024) || 
    (prevWindowWidth <= 1240 && currentWidth > 1240)) {
        aside?.classList.remove('active');
    }

    prevWindowWidth = currentWidth;
}

aside?window.addEventListener('resize', handleResize) : '';

closeBtn?.addEventListener('click', () => {
    toggleCustomClass(aside, 'active');
});

openBtn?.addEventListener('click', () => {
    toggleCustomClass(aside, 'active');
});
