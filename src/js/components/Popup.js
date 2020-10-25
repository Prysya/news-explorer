import BaseComponents from './BaseComponents';

export default class Popup extends BaseComponents {
  constructor(options) {
    super(options);
  }

  _open() {
    this.container.classList.add(this.props.popupIsOpened);
    document.querySelector('.page').classList.add('page_fixed');
  }

  _close() {
    this.container.classList.remove(this.props.popupIsOpened);
    document.querySelector('.page').classList.remove('page_fixed');
  }

  _closeByEscOrClick(event, callback) {
    if (event.key === 'Escape' || event.target.classList.contains('popup')) {
      this._close();

      callback();
    }
  }
}
