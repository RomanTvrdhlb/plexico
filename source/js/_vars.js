export default {
  windowEl: window,
  documentEl: document,
  htmlEl: document.documentElement,
  bodyEl: document.body,
  activeClass: 'active',
  activeClassMode: 'mode',
  header: document.querySelector('header'),
  footer: document.querySelector('footer'),
  infoSliders: document.querySelectorAll('.info-slider'),


  toggles: document.querySelectorAll('.checkbox-toogle'),
  navBtns: document.querySelectorAll('.settings-nav__btn '),
  navContent: document.querySelector('.settings__content'),
  notificationParrents: document.querySelectorAll('.notifications__row'),
  burger: document.querySelectorAll('.burger'),
  mobileMenu: document.querySelector('.aside'),
  overlay: document.querySelector('[data-overlay]'),
  modals: [...document.querySelectorAll('[data-popup]')],
  modalsMode: [...document.querySelectorAll('[data-mode-modal]')],
  modalsButton: [...document.querySelectorAll("[data-btn-modal]")],
  
  bonusMenu: document.querySelector('.bonus-menu'),
  bonusMenuBtn: document.querySelectorAll('[data-bonus-btn]'),
  partnerMenuBtn: document.querySelectorAll('.partners-list__more'),
  partnerMenu: document.querySelector('.partner-menu'),
}
