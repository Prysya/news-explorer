import Popup from './Popup';

export default class PopupTypeReg extends Popup {
  constructor(options) {
    super(options);
  }

  _bind() {
    this.closePopup = this.close.bind(this);
    this.submitRegForm = this.submit.bind(this);
    this.closeRegFormByEscOrClick = this.closeByEscOrClick.bind(this);

    const { formValidator, popupTypeLogin } = this._dependencies;

    this.formValidator = formValidator.validateForm.bind(formValidator);
    this.openPopupTypeLogin = popupTypeLogin.open.bind(popupTypeLogin);
  }

  _unbind() {
    this.closePopup = null;
    this.submitRegForm = null;
    this.closeRegFormByEscOrClick = null;
    this.formValidator = null;
    this.openPopupTypeLogin = null;
    this._handlers = null;
  }

  _getHandlers() {
    this._handlers = [
      { element: this.elements.popupCloseButton, event: 'click', handler: this.closePopup },
      { element: this.elements.subButtonLinkReg, event: 'click', handler: this.openPopupTypeLogin },
      { element: this.elements.subButtonLinkReg, event: 'click', handler: this.closePopup },
      {
        element: this.elements.form,
        event: 'input',
        handler: this.formValidator,
      },
      { element: this.elements.form, event: 'submit', handler: this.submitRegForm },
      { element: document, event: 'keydown', handler: this.closeRegFormByEscOrClick },
      { element: this.container, event: 'mousedown', handler: this.closeRegFormByEscOrClick },
    ];
  }

  open() {
    super.removeAllFormErrors();
    super.clearFormInputs();
    this._bind();
    this._getHandlers();
    super._setHandlers(this._handlers);
    super.disableFormButton();
    super._open();
    this.elements.formFirstInput.focus();
  }

  close() {
    super._removeHandlers(this._handlers);
    this._unbind();
    super._close();
  }

  closeByEscOrClick(event) {
    super._closeByEscOrClick(event, this.closePopup);
  }

  async submit(event) {
    event.preventDefault();

    super.disableFormButton();
    super.disableFormInputs();

    const { mainApi, popupTypeSuccess } = this._dependencies;

    const inputValues = await super._getInfo(this.elements.allFormInputs);

    try {
      const res = await mainApi.signup(inputValues);

      if (res.status === '201') {
        this.close();

        return popupTypeSuccess.open();
      }
      throw new Error(res.message);
    } catch (err) {
      this.elements.formMainError.textContent = err.message.match(/[А-ЯЁ][а-яё]*[А-Яа-яёA-Za-z\s]*/);

      return err;
    } finally {
      super.activateFormButton();
      super.activateFormInputs();
    }
  }
}
