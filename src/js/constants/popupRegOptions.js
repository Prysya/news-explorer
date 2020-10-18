const POPUP_REG_OPTIONS = {
  container: document.querySelector('.popup_type_reg'),
  elements: {
    form: document.querySelector('.form_reg'),
    formButton: document.querySelector('.form_reg').querySelector('.button'),
    buttonError: document.querySelector('.error_type_reg'),
    allFormErrors: document.querySelector('.form_reg').querySelectorAll('.error'),
    allFormInputs: document.querySelector('.form_reg').querySelectorAll('.form__input'),
    formFirstInput: document.querySelector('.form_reg').querySelector('.form__input_type_email'),
    formMainError: document.querySelector('.error_type_reg'),
    popupCloseButton: document.querySelector('.popup__close_reg'),
    subButtonLinkReg: document.querySelector('.form_reg').querySelector('.popup__sub-link_login'),
  },
  props: {
    popupIsOpened: 'popup_is-opened',
  },
};

export default POPUP_REG_OPTIONS;
