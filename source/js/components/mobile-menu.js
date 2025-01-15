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
    navContent,
    bonusMenu,
    bonusMenuBtn,
    partnerMenu,
    partnerMenuBtn
} = vars;

const notification = document.querySelector('.notification');
const notificationBtns = document.querySelectorAll('[data-open]');

const mobileMenuHandler = function (overlay, mobileMenu, burger, bonusMenu, partnerMenu) {
    burger.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            toggleCustomClass(mobileMenu, activeClass);
            toggleClassInArray(burger, activeClass);
            toggleCustomClass(overlay, activeClass);
           
            bonusMenu ? removeCustomClass(bonusMenu, activeClass) : '';
            partnerMenu ? removeCustomClass(partnerMenu, activeClass) : '';

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

export const hideMenuHandler = function (overlay, mobileMenu, burger, bonusMenu, partnerMenu) {
    enableScroll()
    mobileMenu ? removeCustomClass(mobileMenu, activeClass) : '';
    burger ? removeClassInArray(burger, activeClass) : '';
    bonusMenu ? removeCustomClass(bonusMenu, activeClass) : '';
    partnerMenu ? removeCustomClass(partnerMenu, activeClass) : '';
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

const bonusMenuHandler = function (overlay, bonusMenuBtn, bonusMenu) {
    if(!bonusMenu){
        return
    }

    const close = bonusMenu.querySelector('.bonus-menu__close');

    bonusMenuBtn.forEach((btn) => { 
        btn && btn.addEventListener('click', function (e) {
            e.preventDefault();
            toggleCustomClass(bonusMenu, activeClass);
            toggleCustomClass(overlay, activeClass);
    
            if (bonusMenu.classList.contains(activeClass)) {
                disableScroll();
              
            } else {
                enableScroll();
            }
        })
    });

    close && close.addEventListener('click', function(e){
        e.preventDefault();
        hideMenuHandler(overlay, mobileMenu, burger, bonusMenu);
        removeCustomClass(overlay, activeClass);
    })
}

const partnerMenuHandler = function (overlay, partnerMenuBtn, partnerMenu) {
    if(!partnerMenu){
        return
    }

    const close = partnerMenu.querySelector('.partner-menu__close');

    partnerMenuBtn.forEach((btn) => { 
        btn && btn.addEventListener('click', function (e) {
            e.preventDefault();
            toggleCustomClass(partnerMenu, activeClass);
            toggleCustomClass(overlay, activeClass);
    
            if (partnerMenu.classList.contains(activeClass)) {
                disableScroll();
              
            } else {
                enableScroll();
            }
        })
    });

    close && close.addEventListener('click', function(e){
        e.preventDefault();
        hideMenuHandler(overlay, mobileMenu, burger, bonusMenu, partnerMenu);
        removeCustomClass(overlay, activeClass);
    })
}

if (overlay) {
    mobileMenuHandler(overlay, mobileMenu, burger, bonusMenu, partnerMenu);
    bonusMenuHandler(overlay, bonusMenuBtn, bonusMenu);
    partnerMenuHandler(overlay, partnerMenuBtn, partnerMenu);
    overlay.addEventListener('click', function (e) {
        if (e.target.classList.contains('overlay')) {
            hideMenuHandler(overlay, mobileMenu, burger, bonusMenu, partnerMenu);
        }
    });
}

function initNavBtns() {
    const closeBtn = document.querySelector('.settings__close');

    if (window.innerWidth < 576) {
        if (navContent.hasAttribute('data-content-open')) {
            addCustomClass(navContent, 'active');
        }

        navBtns && navBtns.forEach(function(btn) {
            btn.addEventListener('click', (e) => {
                if (btn.classList.contains('active')) {
                    e.preventDefault();
                    addCustomClass(navContent, 'active');
                    removeCustomClass(navContent, 'closed');
                }
            });

            closeBtn && closeBtn.addEventListener('click', (e) => {
                e.preventDefault();

                if (navContent.classList.contains('active') && navContent.hasAttribute('data-content-open')) {
                    removeCustomClass(navContent, 'active');
                    addCustomClass(navContent, 'closed');
                } else {
                    removeCustomClass(navContent, 'active');
                }
            });
        });
    }
}

if (navContent && navBtns) {
    initNavBtns();

    window.addEventListener('resize', () => {
        if (window.innerWidth < 576) {
            initNavBtns();
        } else {
            removeCustomClass(navContent, 'active');
            removeCustomClass(navContent, 'closed'); 
        }
    });
}

const financeCards = document.querySelectorAll('.finance-card');

function initFinanceCard() {
    if (window.innerWidth < 576) {
        financeCards.forEach(function(card) {
            const content = card.querySelector('.finance-card__content');
            const closeBtn = card.querySelector('.finance-card__close');

            if (content) {
                card.addEventListener('click', (e) => {
                    if (e.target === card) {
                        e.preventDefault();
                    }

                    addCustomClass(content, 'active');
                });
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeCustomClass(content, 'active');
                });
            }
        });
    }
}

function cardResize() {
    if (window.innerWidth < 576) {
        initFinanceCard();
    } else {
        removeClassInArray(document.querySelectorAll('.finance-card__content'), 'active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cardResize();
    window.addEventListener('resize', cardResize);
});


function checkScreenWidth() {
    return window.innerWidth <= 1024;
}

function applyOverlayStyles() {
    overlay.style.transition = 'initial';
}

function removeOverlayStyles() {
    overlay.style.transition = '';
}

function initNotificationHandlers() {
    if (notification && notificationBtns) {
        const closeBtn = notification.querySelector('.notification__close');

        notificationBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                hideMenuHandler(overlay, mobileMenu, burger, bonusMenu, partnerMenu);
                removeCustomClass(overlay, 'active');
                
                toggleCustomClass(notification, 'active');
                toggleCustomClass(btn, 'active');

                if (notification.classList.contains('active')) {
                    if (checkScreenWidth()) applyOverlayStyles();
                    disableScroll();
                } else {
                    removeOverlayStyles();
                    enableScroll();
                }
            });
        });

        closeBtn && closeBtn.addEventListener('click', e => {
            e.preventDefault();
            removeCustomClass(notification, 'active');
            removeClassInArray(notificationBtns, 'active');
            removeOverlayStyles();
            enableScroll();
        });
    }
}

function handleResize() {
    if (notification.classList.contains('active')) {
        if (!checkScreenWidth()) {
            removeOverlayStyles();
        } else {
            applyOverlayStyles();
        }
    }
}


if(notification){
    initNotificationHandlers();
    window.addEventListener('resize', handleResize);
}


document.querySelectorAll('[data-modal]').forEach(function (item) {
    item.addEventListener('click', function () {
        hideMenuHandler(overlay, mobileMenu, burger, bonusMenu, partnerMenu);
    })
})







