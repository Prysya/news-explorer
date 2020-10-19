import Popup from './Popup';

export default class PopupTypeSuccess extends Popup {
  constructor(options) {
    super(options);
  }

  _bind() {
    this.closePopup = this.close.bind(this);
    this.closeSuccessPopupByEscOrClick = this.closeByEscOrClick.bind(this);

    const { popupTypeLogin } = this._dependencies;

    this.openPopupTypeLogin = popupTypeLogin.open.bind(popupTypeLogin);
  }

  _unbind() {
    this.closePopup = null;
    this.closeSuccessPopupByEscOrClick = null;
    this.openPopupTypeLogin = null;
  }

  _getHandlers() {
    this._handlers = [
      { element: this.elements.popupCloseButton, event: 'click', handler: this.closePopup },
      { element: this.elements.subButtonLinkReg, event: 'click', handler: this.openPopupTypeLogin },
      { element: this.elements.subButtonLinkReg, event: 'click', handler: this.closePopup },
      { element: document, event: 'keydown', handler: this.closeSuccessPopupByEscOrClick },
      { element: this.container, event: 'mousedown', handler: this.closeSuccessPopupByEscOrClick },
    ];
  }

  open() {
    this._bind();
    this._getHandlers();
    super._setHandlers(this._handlers);
    super._open();
  }

  close() {
    super._removeHandlers(this._handlers);
    this._unbind();
    super._close();
  }

  closeByEscOrClick(event) {
    super._closeByEscOrClick(event, this.closePopup);
  }
}
