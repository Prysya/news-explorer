export default class Page {
  fillPage() {
    this._fillMainPage().catch((err) => console.log(err));
    this._fillArticlesPage().catch((err) => console.log(err));
  }

  async _fillMainPage() {
    try {
      const { name } = this._dependencies;

      if (name === 'main') {
        const { header, mainApi, storage, search } = this._dependencies;

        const userName = storage.getStorageItem('username');

        header.setHandlers();

        search.loadSearchEvents();

        if (userName) {
          header.setLoggedStatusToHeader(userName);
        } else {
          const res = await mainApi.getUserData();

          if (res.status === '200') {
            storage.saveValueToStorage('username', res.data.name);

            header.setLoggedStatusToHeader(storage.getStorageItem('username'));
          } else {
            header.setUnloggedStatusToHeader();

            throw new Error(res.message);
          }
        }
      }
    } catch (err) {
      return err;
    }
  }

  async _fillArticlesPage() {
    try {
      const { name } = this._dependencies;

      if (name === 'articles') {
        const { header, mainApi, storage, descriptionBlock, articlesList, notFound } = this._dependencies;

        header.setHandlers();

        const res = await mainApi.getUserData();

        if (res.status === '200') {
          await header.setLoggedStatusToHeader(res.data.name);

          storage.saveValueToStorage('username', res.data.name);
        } else {
          document.location.href = '../';

          throw new Error(res.message);
        }

        const articlesRes = await mainApi.getArticles();

        if (res.status === '200') {
          storage.saveValueToStorage('articles', articlesRes.data);

          await descriptionBlock.open();

          if (articlesRes.data.length === 0) {
            await notFound.open();
          } else {
            await articlesList.open();
          }
        } else {
          throw new Error(articlesRes.message);
        }
      }
    } catch (err) {
      const { requestError } = this._dependencies;
      requestError.open();

      return err;
    } finally {
      const { preloader } = this._dependencies;

      await preloader.close();
    }
  }

  saveDependencies(dependencies) {
    this._dependencies = dependencies;
  }
}
