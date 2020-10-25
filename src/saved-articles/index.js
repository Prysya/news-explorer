import './index.css';

import Page from '../js/components/Page';

import MAIN_API_OPTIONS from '../js/constants/mainApiOptions';
import MainApi from '../js/api/MainApi';

import HEADER_OPTIONS from '../js/constants/headerOptions';
import Header from '../js/components/Header';

import DESCRIPTION_BLOCK_OPTIONS from '../js/constants/descriptionBlockOptions';
import DescriptionBlock from '../js/components/DescriptionBlock';

import ARTICLES_LIST_OPTIONS from '../js/constants/articlesListOptions';
import ArticlesList from '../js/components/ArticlesList';

import PRELOADER_OPTIONS from '../js/constants/preloaderOptions';
import NOT_FOUND_OPTIONS from '../js/constants/notFoundOptions';
import REQUEST_ERROR_OPTIONS from '../js/constants/requestErrorOptions';
import SearchStatus from '../js/components/SearchStatus';

import Storage from '../js/components/Storage';
import NewsCard from '../js/components/NewsCard';
import NEWS_CARD_OPTIONS from '../js/constants/newsCardOptions';
import { parseDate } from '../js/utils/dateParser';

const page = new Page();

const storage = new Storage(sessionStorage);

const header = new Header(HEADER_OPTIONS);

const mainApi = new MainApi(MAIN_API_OPTIONS);

const descriptionBlock = new DescriptionBlock(DESCRIPTION_BLOCK_OPTIONS);

const articlesList = new ArticlesList(ARTICLES_LIST_OPTIONS);

const preloader = new SearchStatus(PRELOADER_OPTIONS);
const notFound = new SearchStatus(NOT_FOUND_OPTIONS);
const requestError = new SearchStatus(REQUEST_ERROR_OPTIONS);

const createCard = (data) => {
  const card = new NewsCard(NEWS_CARD_OPTIONS);

  card.saveDependencies({ parseDate, mainApi, storage });

  return card.create(data);
};

articlesList.saveDependencies({ mainApi, createCard, storage });

descriptionBlock.saveDependencies({ mainApi, storage });

header.saveDependencies({ mainApi, storage });

page.saveDependencies({
  name: 'articles',
  header,
  mainApi,
  storage,
  descriptionBlock,
  preloader,
  notFound,
  requestError,
  articlesList,
});

page.fillPage();
