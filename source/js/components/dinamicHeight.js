import vars from '../_vars.js';
import {elementHeight, removeCustomClass, addCustomClass} from '../functions/customFunctions.js';

const {header} = vars;

let lastScroll = 0;
const defaultOffset = 40;

function stickyHeaderFunction(breakpoint){
    let containerWidth = document.documentElement.clientWidth;
    if (containerWidth > `${breakpoint}`) {
        const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
        const containHide = () => header.classList.contains('sticky');

        window.addEventListener('scroll', () => {
            if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
                addCustomClass(header, "sticky")
            }
            else if(scrollPosition() < defaultOffset){
                removeCustomClass(header, "sticky")
            }

            lastScroll = scrollPosition();
        })
    }
}

const settingsElement = document.querySelector('.settings');
const historyElement = document.querySelector('.finance-section--history .history');
const fundsElement = document.querySelector('.finance-section--funds .funds');
const balanceElement = document.querySelector('.finance-section--balance .balance');
const fundsAsideElement = document.querySelector('.funds .funds__aside');

function updateSettingsDistance(el, name) {
    if (el) {
        const distanceFromTop = el.getBoundingClientRect().top + window.pageYOffset;
        document.documentElement.style.setProperty(`--${name}-distance`, `${distanceFromTop}px`);
    }
}

if (settingsElement) {
    updateSettingsDistance(settingsElement, 'settings');
    window.addEventListener('resize', () => updateSettingsDistance(settingsElement, 'settings'));
}

if (historyElement) {
    updateSettingsDistance(historyElement, 'history');
    window.addEventListener('resize', () => updateSettingsDistance(historyElement, 'history'));
}

if (fundsElement) {
    updateSettingsDistance(fundsElement, 'history');
    window.addEventListener('resize', () => updateSettingsDistance(fundsElement, 'history'));
}

if (fundsAsideElement) {
    elementHeight(fundsAsideElement, 'aside-height');
}

if (balanceElement) {
    updateSettingsDistance(balanceElement, 'balance');
    window.addEventListener('resize', () => updateSettingsDistance(balanceElement, 'balance'));
}

stickyHeaderFunction(320);

elementHeight(header, 'header-height');
elementHeight(document.querySelector('.auth-section__top'), 'auth-top-height');

