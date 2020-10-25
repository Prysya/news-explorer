const POPUP_LOGIN_OPTIONS = {
  container: document.querySelector('.popup_type_login'),
  elements: {
    form: document.querySelector('.form_login'),
    formButton: document.querySelector('.form_login').querySelector('.button'),
    buttonError: document.querySelector('.error_type_login'),
    allFormErrors: document.querySelector('.form_login').querySelectorAll('.error'),
    allFormInputs: document.querySelector('.form_login').querySelectorAll('.form__input'),
    formFirstInput: document.querySelector('.form_login').querySelector('.form__input_type_email'),
    formMainError: document.querySelector('.error_type_login'),
    popupCloseButton: document.querySelector('.popup__close_login'),
    subButtonLinkReg: document.querySelector('.form_login').querySelector('.popup__sub-link_register'),
  },
  props: {
    popupIsOpened: 'popup_is-opened',
  },
};

export default POPUP_LOGIN_OPTIONS;
