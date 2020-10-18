const ARTICLES_LIST_OPTIONS = {
  container: document.querySelector('.articles'),
  elements: {
    cardContainer: document.querySelector('.articles__container'),
    showMoreButton: document.querySelector('.articles__show-more'),
  },
  props: {
    articlesDisabled: 'articles_disabled',
    showMoreButtonDisabled: 'articles__show-more_disabled',
  },
};

export default ARTICLES_LIST_OPTIONS;
