const HEADER_OPTIONS = {
  container: document.querySelector('.header'),
  elements: {
    links: document.querySelector('.header__list'),
    dropdownLinks: document.querySelector('.header__dropdown-container'),
    dropdownBtn: document.querySelector('.header__dropdown-btn'),
    savedArticlesLink: document.querySelector('.header__item_articles'),
    buttonLogin: document.querySelector('.header__item_auth'),
    buttonLogged: document.querySelector('.header__item_logged'),
    buttonLoginText: document.querySelector('.header__button_logged'),
    headerToggle: document.querySelector('.header__toggle'),
    headerMain: 'header_main',
    headerArticles: 'header_articles',
  },
  props: {
    disableHeaderItem: 'header__item_disabled',
    navLinksOpened: 'header__nav-links_opened',
    dropdownOpened: 'header__list_opened',
    dropdownLightOpened: 'header__dropdown-btn_light_opened',
    dropdownLightClosed: 'header__dropdown-btn_light_closed',
    dropdownDarkOpened: 'header__dropdown-btn_dark_opened',
    dropdownDarkClosed: 'header__dropdown-btn_dark_closed',
    popupOpened: 'popup_is-opened',
  },
};

export default HEADER_OPTIONS;
