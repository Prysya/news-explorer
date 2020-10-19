import BaseComponents from './BaseComponents';

export default class DescriptionBlock extends BaseComponents {
  constructor(options) {
    super(options);
  }

  open() {
    this._getArticlesKeywords();
    this._fillKeywordsCount();

    if (this._keywords.length > 0) {
      this._fillMostCountArticles(this._checkKeywordCount());
    }

    this.container.classList.remove(this.props.disabled);
  }

  _fillKeywordsCount() {
    const { storage } = this._dependencies;

    const { keywordsCount } = this.elements;

    const userName = storage.getStorageItem('username');

    let saved = 'сохраненных статей';

    if (this._keywords.length === 1) {
      saved = 'сохраненная статья';
    } else if (this._keywords.length >= 2 && this._keywords.length <= 4) {
      saved = 'сохраненных статьи';
    }

    keywordsCount.textContent = `${userName}, у вас ${this._keywords.length} ${saved}`;
  }

  _getArticlesKeywords() {
    const { storage } = this._dependencies;

    const articles = storage.getStorageItem('articles');

    this._keywords = articles.map((article) => article.keyword);
  }

  _checkKeywordCount() {
    const { storage } = this._dependencies;

    if (this._keywords.length === 0) {
      return {};
    }

    const keywordsCount = this._keywords.reduce(
      (acc, keyword) => ({
        ...acc,
        [keyword]: (acc[keyword] || 0) + 1,
      }),
      {}
    );

    storage.saveValueToStorage('sortedArticles', keywordsCount);

    return Object.entries(keywordsCount)
      .sort((a, b) => b[1] - a[1])
      .map((keyword) => keyword[0]);
  }

  _fillMostCountArticles([first, second, ...third]) {
    const { mostSavedKeywords } = this.elements;

    const firstArticle = `<span class="description__keywords-bold">${first}</span>`;
    let secondArticle = '';
    let thirdArticle = '';

    if (second && third.length > 0) {
      secondArticle = `, <span class="description__keywords-bold">${second}</span>`;
    } else if (second) {
      secondArticle = ` и <span class="description__keywords-bold">${second}</span>`;
    }

    if (third.length > 1) {
      thirdArticle = ` и <span class="description__keywords-bold">${third.length} другими</span>`;
    } else if (third.length === 1) {
      thirdArticle = ` и <span class="description__keywords-bold">${third}</span>`;
    }

    const template = `По ключевым словам: ${firstArticle}${secondArticle}${thirdArticle}`;

    mostSavedKeywords.insertAdjacentHTML('afterend', template);
  }
}
