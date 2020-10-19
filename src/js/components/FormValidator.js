export default class FormValidator {
  constructor(errors) {
    this.errors = errors;
  }

  _validateInputElement(input) {
    input.setCustomValidity('');

    if (input.validity.valueMissing || input.value.trim() === "") {
      input.setCustomValidity(this.errors.emptyInput);
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      if (input.type === 'text') {
        input.setCustomValidity(this.errors.outOfRange);
      } else if (input.type === 'password') {
        input.setCustomValidity(this.errors.outOfRangePassword);
      }
      return false;
    }

    if (input.validity.patternMismatch && input.type === 'email') {
      input.setCustomValidity(this.errors.invalidEmail);
      return false;
    }

    return input.checkValidity();
  }

  _setErrors(input) {
    this._validateInputElement(input);
    this._form.querySelector(`#${input.name}`).textContent = input.validationMessage;
  }

  _setSubmitButtonState() {
    if (this._form.checkValidity()) {
      this._form.querySelector('.button').removeAttribute('disabled');
    } else {
      this._form.querySelector('.button').setAttribute('disabled', '');
    }
  }

  validateForm(event) {
    if (event.target.form.name === 'login') {
      this._form = document.querySelector('.form_login');
    } else if (event.target.form.name === 'registration') {
      this._form = document.querySelector('.form_reg');
    } else {
      this._form = document.querySelector('.search__form');
    }

    this._setErrors(event.target);
    this._setSubmitButtonState();
  }
}
