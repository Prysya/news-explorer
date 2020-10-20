import BaseComponents from './BaseComponents';

export default class NewsCard extends BaseComponents {
  constructor(options) {
    super(options);
  }

  _bind() {
    this.deleteCard = this._deleteCard.bind(this);
    this.saveArticle = this._saveArticle.bind(this);
    this.showDescription = this._showDescription.bind(this);
    this.hideDescription = this._hideDescription.bind(this);
  }

  _unbind() {
    this.deleteCard = null;
    this.saveArticle = null;
    this.showDescription = null;
    this.hideDescription = null;
    this._handlers = null;
  }

  _template() {
    const { keyword, title, text, date, source, link = '', image, _id = '' } = this._data;

    const templateString = `
          <div class="article-card" data-id="${_id}">
            <div class="article-card__container">
              <p class="article-card__keyword article-card__keyword_disabled">${keyword}</p>
              <p class="article-card__button-description article-card__button-description_disabled"></p>
              <button type="button" class="article-card__button"></button>
            </div>
            <a href="${link}" class="article-card__link" target="_blank">
              <img src="${image}" class="article-card__image" alt=""/>
              <div class="article-card__description-container">
                <time class="article-card__date" datetime="${date}"></time>
                <h3 class="article-card__title">${title}</h3>
                <p class="article-card__text">${text}</p>
                <p class="article-card__source">${source}</p>
              </div>
            </a>
          </div>
    `;
    const element = document.createElement('div');

    element.insertAdjacentHTML('beforeend', templateString.trim());

    return element.firstChild;
  }

  _parseTemplate() {
    const { parseDate } = this._dependencies;
    const {
      cardDate,
      cardButtonDescription,
      cardButton,
      buttonTypeBookmark,
      buttonTypeDelete,
      cardKeyword,
    } = this.elements;
    const { keywordDisabled } = this.props;

    this.card = this._template(this._data);

    const date = this.card.querySelector('.article-card__date').dateTime;
    this.card.querySelector(cardDate).textContent = parseDate(date);

    if (this.container.classList.contains('articles_main')) {
      this.card.querySelector(cardButtonDescription).textContent = 'Войдите, чтобы сохранять статьи';
      this.card.querySelector(cardButton).classList.add(buttonTypeBookmark);
    } else {
      this.card.querySelector(cardButtonDescription).textContent = 'Убрать из сохранённых';
      this.card.querySelector(cardKeyword).classList.remove(keywordDisabled);
      this.card.querySelector(cardButton).classList.add(buttonTypeDelete);
    }
  }

  create(data) {
    this._data = data;

    this._parseTemplate();
    this._bind();
    this._getHandlers();
    super._setHandlers(this._handlers);

    return this.card;
  }

  async _deleteCard() {
    const { buttonTypeDelete, cardButton, buttonTypeBookmarkMarked, buttonTypeBookmark } = this.elements;

    const { mainApi } = this._dependencies;

    const deleteButton = this.card.querySelector(`.${buttonTypeDelete}`);
    const markedButton = this.card.querySelector(`.${buttonTypeBookmarkMarked}`);

    if ((deleteButton || markedButton) && window.confirm('Действительно удалить статью из сохраненных?')) {
      try {
        const res = await mainApi.removeArticle(this.card.dataset.id);

        if (res.status === '200') {
          if (deleteButton) {
            super._removeHandlers(this._handlers);
            this._unbind();
            this.card.remove();
          } else if (markedButton) {
            this.card.querySelector(cardButton).classList.add(buttonTypeBookmark);
            this.card.querySelector(cardButton).classList.remove(buttonTypeBookmarkMarked);
          }
        }
        throw new Error(res.message);
      } catch (err) {
        console.log(err.message);
        return err;
      }
    }
    return 'Not confirmed';
  }

  async _saveArticle() {
    const { buttonTypeBookmark, buttonTypeBookmarkMarked, cardButton } = this.elements;
    const { storage, mainApi } = this._dependencies;

    if (this.card.querySelector(`.${buttonTypeBookmark}`) && storage.getStorageItem('username')) {
      try {
        const res = await mainApi.createArticle(this._data);

        if (res.status === '201') {
          this.card.dataset.id = res.data.id;

          this.card.querySelector(cardButton).classList.remove(buttonTypeBookmark);
          this.card.querySelector(cardButton).classList.add(buttonTypeBookmarkMarked);
          return;
        }
        throw new Error(res.message);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  _showDescription() {
    const { storage } = this._dependencies;

    const { buttonTypeDelete } = this.elements;

    const deleteButton = this.card.querySelector(`.${buttonTypeDelete}`);

    if (!storage.getStorageItem('username') || deleteButton) {
      this.card.querySelector(this.elements.cardButtonDescription).classList.add(this.props.descriptionDisabled);
    }
  }

  _hideDescription() {
    const { storage } = this._dependencies;

    const { buttonTypeDelete } = this.elements;

    const deleteButton = this.card.querySelector(`.${buttonTypeDelete}`);

    if (!storage.getStorageItem('username') || deleteButton) {
      this.card.querySelector(this.elements.cardButtonDescription).classList.remove(this.props.descriptionDisabled);
    }
  }

  _getHandlers() {
    const cardButton = this.card.querySelector(this.elements.cardButton);

    this._handlers = [
      { element: cardButton, event: 'click', handler: this.deleteCard },
      { element: cardButton, event: 'click', handler: this.saveArticle },
      { element: cardButton, event: 'mouseenter', handler: this.hideDescription },
      { element: cardButton, event: 'mouseout', handler: this.showDescription },
    ];
  }
}
