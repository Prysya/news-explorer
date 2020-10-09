import './index.css';

// Мини код для попапа для ревью верстки
const headerDropdownButton = document.querySelector('.header__dropdown-btn');
const headerDropdownContainer = document.querySelector('.header__dropdown-container');
const headerList = document.querySelector('.header__list');


headerDropdownButton.addEventListener('click', () => {
  headerList.classList.toggle('header__list_opened');
  headerDropdownContainer.classList.toggle('popup_is-opened');
  headerDropdownButton.classList.toggle('header__dropdown-btn_light_closed')
  headerDropdownButton.classList.toggle('header__dropdown-btn_light_opened')
});
