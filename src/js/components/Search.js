import BaseComponents from './BaseComponents';

export default class Search extends BaseComponents {
  constructor(options) {
    super(options);
  }

  loadSearchEvents() {
    super.removeAllFormErrors();
    super.activateFormInputs();
    super.clearFormInputs();
    super.disableFormButton();
    this._setSearchFormHandlers();
  }

  _setSearchFormHandlers() {
    const { formValidator } = this._dependencies;

    super._setHandlers([
      { element: this.elements.form, event: 'submit', handler: this.search.bind(this) },
      {
        element: this.elements.form,
        event: 'input',
        handler: formValidator.validateForm.bind(formValidator),
      },
    ]);
  }

  async search(event) {
    event.preventDefault();

    const {
      newsApi,
      preloader,
      notFound,
      requestError,
      parseApiData,
      articlesList,
      validateApiData,
      storage,
    } = this._dependencies;

    const inputData = this.elements.formInput.value.trim();

    super.disableFormButton();
    super.disableFormInputs();

    notFound.close();
    requestError.close();
    articlesList.close();
    preloader.open();

    try {
      const res = await newsApi.getNews(inputData);

      if (res.status === 'ok') {
        if (res.totalResults === 0) {
          return notFound.open();
        }

        const articlesArray = await res.articles
          .filter((article) => validateApiData(article))
          .map((article) => parseApiData(inputData, article));

        storage.saveValueToStorage('articles', articlesArray);

        return articlesList.open();
      }

      throw new Error();
    } catch (err) {
      console.log(err);
      requestError.open();
      articlesList.close();

      return err;
    } finally {
      preloader.close();

      super.activateFormInputs();
      super.activateFormButton();
    }
  }
}
