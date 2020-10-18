const DESCRIPTION_BLOCK_OPTIONS = {
  container: document.querySelector('.description'),
  elements: {
    keywordsCount: document.querySelector('.description__count'),
    mostSavedKeywords: document.querySelector('.description__keywords'),
  },
  props: {
    boldText: 'description__keywords-bold',
    disabled: 'description_disabled',
  },
};

export default DESCRIPTION_BLOCK_OPTIONS;
