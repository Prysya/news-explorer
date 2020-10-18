export default class BaseComponents {
  constructor({ container, elements, props }) {
    this.container = container;
    this.elements = elements;
    this.props = props;

    this._dependencies = null;
  }

  saveDependencies(options) {
    this._dependencies = options;
  }

  _setHandlers(handlersOptions) {
    handlersOptions.forEach((handlerOption) => {
      const { element, event, handler } = handlerOption;

      element.addEventListener(event, handler);
    });
  }

  _removeHandlers(handlersOptions) {
    handlersOptions.forEach((handlerOption) => {
      const { element, event, handler } = handlerOption;

      element.removeEventListener(event, handler);
    });
  }

  _getInfo(inputs) {
    return [...inputs].map((input) => input.value);
  }

  disableFormInputs() {
    this.elements.allFormInputs.forEach((input) => input.setAttribute('disabled', true));
  }

  activateFormInputs() {
    this.elements.allFormInputs.forEach((input) => input.removeAttribute('disabled'));
  }

  disableFormButton() {
    this.elements.formButton.setAttribute('disabled', '');
  }

  activateFormButton() {
    this.elements.formButton.removeAttribute('disabled');
  }

  clearFormInputs() {
    this.elements.form.reset();
  }

  removeAllFormErrors() {
    this.elements.allFormErrors.forEach((error) => {
      error.textContent = '';
    });
  }
}
