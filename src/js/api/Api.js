export default class Api {
  constructor(url) {
    this.url = url;
  }

  saveDependencies(dependencies) {
    this._dependencies = dependencies;
  }
}
