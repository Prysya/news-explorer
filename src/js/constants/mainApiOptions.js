const MAIN_API_OPTIONS = {
  url: 'https://api.prysya-news-explorer.tk',
  headers: {
    'Content-Type': 'application/json',
  },
  roots: {
    signup: '/signup',
    signin: '/signin',
    userData: '/users/me',
    articles: '/articles',
    logout: '/logout',
  },
};

export default MAIN_API_OPTIONS;
