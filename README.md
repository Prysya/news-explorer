<p align="center">
    <img src="https://res.cloudinary.com/prysya/image/upload/v1602105377/news-explorer-logo2_w9kncc.png" width="1060">
</p>
<p align="center">
    <img alt="Version 0.0.1" src="https://img.shields.io/github/package-json/v/prysya/news-explorer" />
    <img alt="Made by: Prysya" src="https://img.shields.io/badge/Made%20by-Prysya-blueviolet" />
    <img alt="Stars *" src="https://img.shields.io/github/stars/prysya/news-explorer" />
    <img alt="Beta Quality" src="https://img.shields.io/badge/Status-Beta-orange.svg" >
    <img alt="Code Size" src="https://img.shields.io/github/languages/code-size/prysya/news-explorer" >
</p>

## О сервисе News Explorer

**_News Explorer_** - проект в котором можно искать свежие статьи на любую тему и сохранять их у себя в личном кабинете.

Ссылка на страницу проекта: https://prysya.github.io/news-explorer

## Установка

Для работы необходим [Node.js](https://nodejs.org/).

Склонировать проект, установить зависимости 

```sh
$ git clone https://github.com/Prysya/news-explorer.git
$ cd news-explorer
$ npm install
```

Запуск локального сервера для разработки в режиме _hot reload_ доступного по ссылке http://localhost:8080/

```sh
$ npm run dev
```

Для сборки проекта в production:
```sh
$ npm run build
```
Соберет все файлы в папку dist, для дальнейшего деплоя.

Для деплоя на GitHub pages:
```sh
$ npm run deploy
```

## В текущей версии реализовано:

- [x] Сверстаны основная страница и страница статей
- [x] Сверстаны все всплывающие окна
- [x] Верстка адаптивна для всех расширений
- [x] Сборка проекта с помощью Webpack
- [x] Настроены PostCss и Babel
- [x] Деплой на github pages

##### Будущие обновления:

- [ ] Валидация форм
- [ ] Поиск новостей
- [ ] Авторизация
- [ ] Аутентификация
- [ ] Сохранение статей в личный кабинет
- [ ] Удаление статей из личного кабинета
- [ ] Переписать CSS на SCSS

## Отдельная благодарность:

<p display="flex">
<img src="https://yastatic.net/q/praktikum/v0.137.16-1594146818/static/favicon-32x32.png" width="20"> <a href="https://praktikum.yandex.ru/profile/web-developer/">Яндекс.Практикум</a>
</p>

