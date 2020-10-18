const POPUP_SUCCESS_OPTIONS = {
  container: document.querySelector('.popup_type_success'),
  elements: {
    popupCloseButton: document.querySelector('.popup__close_success'),
    subButtonLinkReg: document.querySelector('.success__link'),
  },
  props: {
    popupIsOpened: 'popup_is-opened',
  },
};

export default POPUP_SUCCESS_OPTIONS;
