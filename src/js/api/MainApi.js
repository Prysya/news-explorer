import Api from './Api';

export default class MainApi extends Api {
  constructor({ url, headers, roots }) {
    super(url);
    this.headers = headers;
    this.roots = roots;
  }

  async signup([email, password, name]) {
    try {
      const res = await fetch(`${this.url}${this.roots.signup}`, {
        method: 'POST',
        credentials: 'include',
        headers: this.headers,
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      const json = await res.json();

      return this._checkResult(res, json);
    } catch (err) {
      console.log(`Ошибка ${err}`);
      return err;
    }
  }

  async signin([email, password]) {
    try {
      const res = await fetch(`${this.url}${this.roots.signin}`, {
        method: 'POST',
        credentials: 'include',
        headers: this.headers,
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const json = await res.json();

      localStorage.setItem('token', json.token);

      return this._checkResult(res, json);
    } catch (err) {
      console.log(`Ошибка ${err}`);
      return err;
    }
  }

  async getUserData() {
    return this._getData(this.roots.userData);
  }

  async createArticle({ keyword, title, text, date, source, link, image }) {
    try {
      const res = await fetch(`${this.url}${this.roots.articles}`, {
        method: 'POST',
        credentials: 'include',
        headers: this.headers,
        body: JSON.stringify({
          keyword,
          title,
          text,
          date,
          source,
          link,
          image,
        }),
      });

      const json = await res.json();

      return this._checkResult(res, json);
    } catch (err) {
      console.log(`Ошибка ${err}`);
      return err;
    }
  }

  getArticles() {
    return this._getData(this.roots.articles);
  }

  async logout() {
    try {
      const res = await fetch(`${this.url}${this.roots.logout}`, {
        method: 'POST',
        credentials: 'include',
        headers: this.headers,
      });

      const json = await res.json();

      delete localStorage.token;

      return this._checkResult(res, json);
    } catch (err) {
      console.log(`Ошибка ${err}`);
      return err;
    }
  }

  async removeArticle(articleId) {
    try {
      const res = await fetch(`${this.url}${this.roots.articles}/${articleId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this.headers,
      });

      const json = await res.json();

      return this._checkResult(res, json);
    } catch (err) {
      console.log(`Ошибка ${err}`);
      return err;
    }
  }

  async _getData(address) {
    try {
      const res = await fetch(`${this.url}${address}`, {
        method: 'GET',
        credentials: 'include',
        headers: this.headers,
      });

      const json = await res.json();

      return this._checkResult(res, json);
    } catch (err) {
      console.log(`Ошибка ${err}`);
      return err;
    }
  }

  _checkResult(res, json) {
    if (res.ok) {
      return json;
    }
    throw new Error(json.message);
  }
}
