const SEARCH_OPTIONS = {
  container: document.querySelector('.search'),
  elements: {
    form: document.querySelector('.search__form'),
    formInput: document.querySelector('.search__input'),
    allFormInputs: document.querySelector('.search__form').querySelectorAll('.input'),
    allFormErrors: document.querySelector('.search__form').querySelectorAll('.error'),
    formButton: document.querySelector('.search__button'),
    formMainError: document.querySelector('.error_search'),
  },
};

export default SEARCH_OPTIONS;
