export default class Page {
  fillPage() {
    const { name } = this._dependencies;

    if (name === 'main') {
      this._fillMainPage().catch((err) => console.log(err));
    } else {
      this._fillArticlesPage().catch((err) => console.log(err));
    }
  }

  async _fillMainPage() {
    try {
      const { header, mainApi, storage, search } = this._dependencies;

      const userName = storage.getStorageItem('username');

      header.setHandlers();
      search.loadSearchEvents();

      if (userName) {
        return header.setLoggedStatusToHeader(userName);
      }

      const res = await mainApi.getUserData();

      if (res.status === '200') {
        storage.saveValueToStorage('username', res.data.name);

        return header.setLoggedStatusToHeader(storage.getStorageItem('username'));
      }
      header.setUnloggedStatusToHeader();

      throw new Error(res.message);
    } catch (err) {
      return err;
    }
  }

  async _fillArticlesPage() {
    const {
      header,
      mainApi,
      storage,
      descriptionBlock,
      articlesList,
      notFound,
      preloader,
      requestError,
    } = this._dependencies;

    try {
      header.setHandlers();

      const res = await mainApi.getUserData();

      if (res.status === '200') {
        storage.saveValueToStorage('username', res.data.name);

        header.setLoggedStatusToHeader(storage.getStorageItem('username'));
      } else {
        document.location.href = '../';

        throw new Error(res.message);
      }

      const articlesRes = await mainApi.getArticles();

      if (articlesRes.status === '200') {
        if (articlesRes.totalResults === 0) {
          return notFound.open();
        }
        storage.saveValueToStorage('articles', articlesRes.data);
        descriptionBlock.open();

        return articlesList.open();
      }
      throw new Error(articlesRes.message);
    } catch (err) {
      requestError.open();

      return err;
    } finally {
      preloader.close();
    }
  }

  saveDependencies(dependencies) {
    this._dependencies = dependencies;
  }
}
