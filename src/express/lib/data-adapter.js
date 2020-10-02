'use strict';

const adapter = (data) => {
  return {
    category: data.category ? data.category.map((item) => parseInt(item, 10)) : [],
    createdDate: data.createdDate || new Intl.DateTimeFormat(`ru-RU`).format(new Date()),
    fullText: data.fullText || ``,
    titleImage: data.titleImage || ``,
    title: data.title || ``,
    announce: data.announce || ``,
  };
};

module.exports = adapter;
