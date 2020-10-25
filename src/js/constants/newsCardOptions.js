const NEWS_CARD_OPTIONS = {
  container: document.querySelector('.articles'),
  elements: {
    cardKeyword: '.article-card__keyword',
    cardButtonDescription: '.article-card__button-description',
    cardButton: '.article-card__button',
    buttonTypeBookmark: 'article-card__button_bookmark',
    buttonTypeBookmarkMarked: 'article-card__button_bookmark_marked',
    buttonTypeDelete: 'article-card__button_trash',
    cardDate: '.article-card__date',
  },
  props: {
    descriptionDisabled: 'article-card__button-description_disabled',
    keywordDisabled: 'article-card__keyword_disabled',
  },
};

export default NEWS_CARD_OPTIONS;
