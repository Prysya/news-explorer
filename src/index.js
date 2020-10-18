import './index.css';

import Page from './js/components/Page';

import Storage from './js/components/Storage';

import MAIN_API_OPTIONS from './js/constants/mainApiOptions';
import MainApi from './js/api/MainApi';

import NEWS_API_OPTIONS from './js/constants/newsApiOptions';
import NewsApi from './js/api/NewsApi';

import POPUP_LOGIN_OPTIONS from './js/constants/popupLoginOptions';
import PopupTypeLogin from './js/components/PopupTypeLogin';

import POPUP_REG_OPTIONS from './js/constants/popupRegOptions';
import PopupTypeReg from './js/components/PopupTypeReg';

import POPUP_SUCCESS_OPTIONS from './js/constants/popupSuccessOptions';
import PopupTypeSuccess from './js/components/PopupTypeSuccess';

import ERRORS from './js/constants/errors';
import FormValidator from './js/components/FormValidator';

import HEADER_OPTIONS from './js/constants/headerOptions';
import Header from './js/components/Header';

import SEARCH_OPTIONS from './js/constants/searchOptions';
import Search from './js/components/Search';

import NEWS_CARD_OPTIONS from './js/constants/newsCardOptions';
import NewsCard from './js/components/NewsCard';

import ARTICLES_LIST_OPTIONS from './js/constants/articlesListOptions';
import ArticlesList from './js/components/ArticlesList';

import PRELOADER_OPTIONS from './js/constants/preloaderOptions';
import NOT_FOUND_OPTIONS from './js/constants/notFoundOptions';
import REQUEST_ERROR_OPTIONS from './js/constants/requestErrorOptions';
import SearchStatus from './js/components/SearchStatus';

import { getDateAgo, parseDate } from './js/utils/dateParser';
import { parseApiData, validateApiData } from './js/utils/apiDataParser';

const page = new Page();

const storage = new Storage(sessionStorage);

const header = new Header(HEADER_OPTIONS);

const formValidator = new FormValidator(ERRORS);

const mainApi = new MainApi(MAIN_API_OPTIONS);

const newsApi = new NewsApi(NEWS_API_OPTIONS);

const search = new Search(SEARCH_OPTIONS);

const articlesList = new ArticlesList(ARTICLES_LIST_OPTIONS);

const popupTypeLogin = new PopupTypeLogin(POPUP_LOGIN_OPTIONS);

const popupTypeRegistration = new PopupTypeReg(POPUP_REG_OPTIONS);

const popupTypeSuccess = new PopupTypeSuccess(POPUP_SUCCESS_OPTIONS);

const preloader = new SearchStatus(PRELOADER_OPTIONS);
const notFound = new SearchStatus(NOT_FOUND_OPTIONS);
const requestError = new SearchStatus(REQUEST_ERROR_OPTIONS);

const createCard = (data) => {
  const card = new NewsCard(NEWS_CARD_OPTIONS);

  card.saveDependencies({ parseDate, mainApi, storage });

  return card.create(data);
};

page.saveDependencies({ name: 'main', header, mainApi, storage, search });

header.saveDependencies({ popupTypeLogin, mainApi, storage });

popupTypeLogin.saveDependencies({ formValidator, popupTypeRegistration, mainApi, storage, header });

popupTypeRegistration.saveDependencies({ formValidator, popupTypeLogin, popupTypeSuccess, mainApi });

popupTypeSuccess.saveDependencies({ popupTypeLogin });

articlesList.saveDependencies({ mainApi, createCard, storage });

newsApi.saveDependencies({ getDateAgo });

search.saveDependencies({
  storage,
  newsApi,
  formValidator,
  preloader,
  notFound,
  requestError,
  articlesList,
  parseApiData,
  validateApiData,
});

page.fillPage();
