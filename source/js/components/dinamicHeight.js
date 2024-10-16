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

function updateSettingsDistance() {

    if (settingsElement) {
        const distanceFromTop = settingsElement.getBoundingClientRect().top + window.pageYOffset;
        document.documentElement.style.setProperty('--settings-distance', `${distanceFromTop}px`);
    }
}

if(settingsElement) updateSettingsDistance();

if(settingsElement) window.addEventListener('resize', updateSettingsDistance);

stickyHeaderFunction(320);

elementHeight(header, 'header-height');
elementHeight(document.querySelector('.auth-section__top'), 'auth-top-height');

