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

    const inputData = this.elements.formInput.value.trim();

    const {
      newsApi,
      preloader,
      notFound,
      requestError,
      parseApiData,
      articlesList,
      validateApiData,
      storage
    } = this._dependencies;

    super.disableFormButton();
    super.disableFormInputs();

    notFound.close();
    requestError.close();
    articlesList.close();

    try {
      await preloader.open();

      const res = await newsApi.getNews(inputData);

      if (res.status === 'ok' && res.totalResults > 0) {
        const articlesArray = await res.articles
          .filter((article) => validateApiData(article))
          .map((article) => parseApiData(inputData, article));

        storage.saveValueToStorage('articles', articlesArray)

        await articlesList.open();
      } else if (res.status === 'ok' && res.totalResults === 0) {
        await notFound.open();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      requestError.open();
      articlesList.close();
    } finally {
      preloader.close();

      super.activateFormInputs();
      super.activateFormButton();
    }
  }
}
