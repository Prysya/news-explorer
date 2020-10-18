import Api from './Api';

export default class NewsApi extends Api {
  constructor({ url, endpoint, pageSize, sortBy, apiKey }) {
    super(url);
    this.endpoint = endpoint;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.apiKey = apiKey;
  }

  async getNews(keyword) {
    const { getDateAgo } = this._dependencies;

    const res = await fetch(
      `${this.url}${this.endpoint}?q=${keyword}&` +
        `from=${getDateAgo(7)}&to=${getDateAgo()}` +
        `sortBy=${this.sortBy}&pageSize=${this.pageSize}&` +
        `apiKey=${this.apiKey}`
    );

    return res.json();
  }
}
