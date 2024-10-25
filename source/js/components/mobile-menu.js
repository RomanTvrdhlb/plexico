import {disableScroll} from '../functions/disable-scroll.js';
import {enableScroll} from '../functions/enable-scroll.js';
import vars from '../_vars.js';

import {
    toggleClassInArray,
    toggleCustomClass,
    removeCustomClass,
    removeClassInArray,
    addCustomClass
} from '../functions/customFunctions';

const {
    overlay,
    burger,
    mobileMenu,
    header,
    activeClass,
    activeClassMode,
    navBtns,
    navContent
} = vars;

const mobileMenuHandler = function (overlay, mobileMenu, burger) {
    burger.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            toggleCustomClass(mobileMenu, activeClass);
            toggleClassInArray(burger, activeClass);
            toggleCustomClass(overlay, activeClass);

            if (mobileMenu.classList.contains(activeClass)) {
                disableScroll();
                addCustomClass(header, 'open-menu')
            } else {
                enableScroll();
                removeCustomClass(header, 'open-menu')
            }
        })
    });

}

export const hideMenuHandler = function (overlay, mobileMenu, burger) {
    enableScroll()
    mobileMenu ? removeCustomClass(mobileMenu, activeClass) : '';
    burger ? removeClassInArray(burger, activeClass) : '';
    removeCustomClass(overlay, activeClassMode);

    if(mobileMenu){
        if (mobileMenu.classList.contains(activeClass)) {
            disableScroll();
            addCustomClass(header, 'open-menu')
        } else {
            enableScroll();
            removeCustomClass(header, 'open-menu')
        }
    }
}

if (overlay) {
    mobileMenuHandler(overlay, mobileMenu, burger);
    overlay.addEventListener('click', function (e) {
        if (e.target.classList.contains('overlay')) {
            hideMenuHandler(overlay, mobileMenu, burger);
        }
    });

}

function initNavBtns() {
    const closeBtn = document.querySelector('.settings__close');

    if (window.innerWidth < 576) {
        navBtns && navBtns.forEach(function(btn) {

            btn.addEventListener('click', (e) => {
                e.preventDefault();

                if (btn.classList.contains('active')) {
                    addCustomClass(navContent, 'active');
                }
            });

            closeBtn && closeBtn.addEventListener('click', (e) => {
                e.preventDefault();

                if (navContent.classList.contains('active')) {
                    removeCustomClass(navContent, 'active');
                }
            });
        });
    }
}

if(navContent && navBtns){
    initNavBtns();

    window.addEventListener('resize', () => {
        if (window.innerWidth < 576) {
            initNavBtns();
        } else {
            removeCustomClass(navContent, 'active');
        }
    });
}

const financeCards = document.querySelectorAll('.finance-card');

function initFinaceCard() {
    if (window.innerWidth < 576) {
        financeCards && financeCards.forEach(function(card) {
            const content = card.querySelector('.finance-card__content');
            const closeBtn = card.querySelector('.finance-card__close');

            card.addEventListener('click', (e) => {
                e.preventDefault();
                addCustomClass(content, 'active');
            });

            closeBtn && closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                removeCustomClass(content, 'active');
            });
        });
    }
}

if(financeCards){
    initFinaceCard();
    window.addEventListener('resize', () => {
        if (window.innerWidth < 576) {
            initFinaceCard();
        } else {
            removeClassInArray(document.querySelectorAll('.finance-card__content'), 'active');
        }
    });
}




document.querySelectorAll('[data-modal]').forEach(function (item) {
    item.addEventListener('click', function () {
        hideMenuHandler(overlay, mobileMenu, burger);
    })
})





