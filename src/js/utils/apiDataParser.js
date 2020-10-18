const parseApiData = (keyword, { source, title, description, url, urlToImage, publishedAt }) => {
  const parsedTitle = title.slice(0, 30);
  const parsedSource = source.name.slice(0, 15);
  const parsedUrlToImage =
    urlToImage === null ? 'https://res.cloudinary.com/prysya/image/upload/v1602845557/news_grapug.jpg' : urlToImage;
  const parsedText = description.replace(/(<\/?(ol|li|ul|td|tr)>)/g, '').replace(/<br\s?\/?>/g, ' ');
  const parsedKeyword = keyword
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/^[а-яёa-z]/, (match) => match.toUpperCase());

  return {
    keyword: parsedKeyword,
    title: parsedTitle,
    text: parsedText,
    date: publishedAt,
    source: parsedSource,
    link: url,
    image: parsedUrlToImage,
  };
};

const validateApiData = ({ source, title, description, url, publishedAt }) =>
  source && title && description && url && publishedAt;

export { parseApiData, validateApiData };
