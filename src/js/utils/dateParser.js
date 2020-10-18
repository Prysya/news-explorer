const getDateAgo = (daysAgo = 0) => {
  const date = new Date();

  date.setDate(date.getDate() - daysAgo);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}

const parseDate = (newsDate) => {
  const date = new Date(newsDate);

  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  return `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
}

export { getDateAgo, parseDate };
