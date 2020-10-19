import Popup from './Popup';

export default class PopupTypeLogin extends Popup {
  constructor(options) {
    super(options);
  }

  _bind() {
    this.closePopup = this.close.bind(this);
    this.submitLoginForm = this.submit.bind(this);
    this.closeLoginFormByEscOrClick = this.closeByEscOrClick.bind(this);

    const { formValidator, popupTypeRegistration } = this._dependencies;

    this.formValidator = formValidator.validateForm.bind(formValidator);
    this.popupTypeRegistration = popupTypeRegistration.open.bind(popupTypeRegistration);
  }

  _unbind() {
    this.closePopup = null;
    this.submitLoginForm = null;
    this.closeLoginFormByEscOrClick = null;
    this.formValidator = null;
    this.popupTypeRegistration = null;
    this._handlers = null;
  }

  _getHandlers() {
    this._handlers = [
      { element: this.elements.popupCloseButton, event: 'click', handler: this.closePopup },
      { element: this.elements.subButtonLinkReg, event: 'click', handler: this.popupTypeRegistration },
      { element: this.elements.subButtonLinkReg, event: 'click', handler: this.closePopup },
      {
        element: this.elements.form,
        event: 'input',
        handler: this.formValidator,
      },
      { element: this.elements.form, event: 'submit', handler: this.submitLoginForm },
      { element: document, event: 'keydown', handler: this.closeLoginFormByEscOrClick },
      { element: this.container, event: 'mousedown', handler: this.closeLoginFormByEscOrClick },
    ];
  }

  open() {
    super.removeAllFormErrors();
    super.activateFormInputs();
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

    const { mainApi, storage, header } = this._dependencies;

    const inputValues = await super._getInfo(this.elements.allFormInputs);

    try {
      const res = await mainApi.signin(inputValues);

      if (res.status === '200') {
        const userData = await mainApi.getUserData();

        const userName = userData.data.name;

        if (userName) {
          storage.saveValueToStorage('username', userData.data.name);
          header.setLoggedStatusToHeader(storage.getStorageItem('username'));

          return this.close();
        }

        throw new Error('Ошибка на сервере');
      }
      throw new Error(res.message);
    } catch (err) {
      this.elements.formMainError.textContent = err.message;

      return err;
    } finally {
      super.activateFormButton();
      super.activateFormInputs();
    }
  }
}
