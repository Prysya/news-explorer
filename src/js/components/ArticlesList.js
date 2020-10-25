import BaseComponents from './BaseComponents';

export default class ArticlesList extends BaseComponents {
  constructor(options) {
    super(options);
  }

  _bind() {
    this.renderCards = this._renderSearchedArticles.bind(this);
  }

  _unbind() {
    this.renderCards = null;
  }

  _getHandlers() {
    this._handlers = [{ element: this.elements.showMoreButton, event: 'click', handler: this.renderCards }];
  }

  open() {
    const { storage } = this._dependencies;

    this._articles = storage.getStorageItem('articles');

    this.container.classList.remove(this.props.articlesDisabled);

    if (this.container.classList.contains('articles_main')) {
      this._renderSearchedArticles();
      this._bind();
      this._getHandlers();
      super._setHandlers(this._handlers);
    } else {
      this._sortByCount();
      this._renderSavedArticles();
    }
  }

  close() {
    this.container.classList.add(this.props.articlesDisabled);
    this.elements.cardContainer.innerHTML = '';

    if (this._handlers) {
      this._unbind();
      super._removeHandlers(this._handlers);
    }
  }

  _renderSearchedArticles() {
    const { createCard } = this._dependencies;

    const {articlesCutCount} = this.props;

    let articles;

    if (this._articles.length > articlesCutCount) {
      articles = this._articles.splice(0, articlesCutCount);
    } else {
      articles = this._articles;
    }

    articles.forEach((article) => this.elements.cardContainer.appendChild(createCard(article)));

    this._checkButtonStatus();
  }

  _renderSavedArticles() {
    const { createCard } = this._dependencies;

    return this._articles.forEach((article) => this.elements.cardContainer.appendChild(createCard(article)));
  }

  _checkButtonStatus() {
    const { showMoreButtonDisabled, articlesCutCount } = this.props;

    if (this._articles.length > articlesCutCount) {
      return this.elements.showMoreButton.classList.remove(showMoreButtonDisabled);
    }

    if (this._handlers) {
      this._unbind();
      super._removeHandlers(this._handlers);
    }

    return this.elements.showMoreButton.classList.add(showMoreButtonDisabled);
  }

  _sortByCount() {
    const { storage } = this._dependencies;

    const sorted = storage.getStorageItem('sortedArticles');

    this._articles = this._articles.sort((a, b) => sorted[b.keyword] - sorted[a.keyword]);
  }
}
