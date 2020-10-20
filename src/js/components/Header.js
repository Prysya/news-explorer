import BaseComponents from './BaseComponents';

export default class Header extends BaseComponents {
  constructor(options) {
    super(options);
  }

  setHandlers() {
    const { headerMain } = this.elements;

    super._setHandlers([
      { element: this.elements.dropdownBtn, event: 'click', handler: this._toggleDropdownMenuStatus.bind(this) },
      { element: this.elements.dropdownLinks, event: 'mousedown', handler: this._toggleDropdownMenuStatus.bind(this) },
      { element: this.elements.dropdownLinks, event: 'touchend', handler: this._toggleDropdownMenuStatus.bind(this) },
      { element: this.elements.buttonLogged, event: 'click', handler: this._logout.bind(this) },
    ]);

    if (this.container.classList.contains(headerMain)) {
      const { popupTypeLogin } = this._dependencies;

      super._setHandlers([
        {
          element: this.elements.buttonLogin,
          event: 'click',
          handler: popupTypeLogin.open.bind(popupTypeLogin),
        },
      ]);
    }
  }

  setLoggedStatusToHeader(name) {
    this._setLoggedButtonName(name);

    this._setLoggedHeaderMenu();
  }

  setUnloggedStatusToHeader() {
    this._setUnloggedHeaderMenu();
  }

  _checkHeaderPage(headerValue) {
    return this.container.classList.contains(headerValue);
  }

  _setLoggedButtonName(name) {
    const { buttonLoginText } = this.elements;

    buttonLoginText.textContent = name;
  }

  _setLoggedHeaderMenu() {
    const { savedArticlesLink, buttonLogged, buttonLogin } = this.elements;

    const { disableHeaderItem } = this.props;

    buttonLogin.classList.add(disableHeaderItem);
    savedArticlesLink.classList.remove(disableHeaderItem);
    buttonLogged.classList.remove(disableHeaderItem);
  }

  _setUnloggedHeaderMenu() {
    const { savedArticlesLink, buttonLogged, buttonLogin } = this.elements;

    const { disableHeaderItem } = this.props;

    buttonLogin.classList.remove(disableHeaderItem);
    savedArticlesLink.classList.add(disableHeaderItem);
    buttonLogged.classList.add(disableHeaderItem);
  }

  _toggleDropdownMenuStatus() {
    const { links, dropdownLinks, headerMain, dropdownBtn, headerArticles } = this.elements;

    const {
      dropdownLightOpened,
      dropdownLightClosed,
      dropdownDarkOpened,
      dropdownDarkClosed,
      dropdownOpened,
      popupOpened,
    } = this.props;

    links.classList.toggle(dropdownOpened);
    dropdownLinks.classList.toggle(popupOpened);
    document.querySelector('.page').classList.toggle('page_fixed');

    if (this._checkHeaderPage(headerMain)) {
      dropdownBtn.classList.toggle(dropdownLightClosed);
      dropdownBtn.classList.toggle(dropdownLightOpened);
    } else if (this._checkHeaderPage(headerArticles)) {
      dropdownBtn.classList.toggle(dropdownDarkClosed);
      dropdownBtn.classList.toggle(dropdownDarkOpened);
    }
  }

  async _logout() {
    if (window.confirm('Вы действительно хотите выйти из учетной записи?')) {
      try {
        const { mainApi, storage } = this._dependencies;

        const { headerArticles } = this.elements;

        const res = await mainApi.logout();

        if (res.status === '200') {
          this._setUnloggedHeaderMenu();

          storage.removeStorageItem('username');
          delete localStorage.token;

          if (this.container.classList.contains(headerArticles)) {
            document.location.href = '../';
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
}
