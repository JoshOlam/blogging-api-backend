const readingTime = (text, wordsPerMinute = 200) => {
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
};

module.exports = readingTime;
