'use strict';

const fs = require(`fs`);
const {DateTime} = require(`luxon`);

const {
  DEFAULT_COUNT,
  MAX_COUNT,
  ExitCode,
} = require(`../../constants`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучше рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];
const PHRASES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];
const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const getItemTitle = () => {
  return TITLES[getRandomInt(0, TITLES.length - 1)];
};

const getItemCreatedDate = () => {
  const maxTimestamp = Date.now();
  const minTimestamp = DateTime.local().minus({months: 3}).toMillis();

  return DateTime
    .fromMillis(getRandomInt(minTimestamp, maxTimestamp))
    .toFormat(`yyyy-MM-dd HH:mm:ss`);
};

const getItemAnnounce = () => shuffle(PHRASES).slice(1, getRandomInt(2, 5)).join(` `);

const getItemFullText = () => shuffle(PHRASES).slice(1, getRandomInt(2, PHRASES.length - 1)).join(` `);

const getItemCategories = () => shuffle(CATEGORIES).slice(1, getRandomInt(2, CATEGORIES.length - 1));

const generateItems = (count) => {
  return Array(count).fill().map(() => ({
    title: getItemTitle(),
    createdDate: getItemCreatedDate(),
    announce: getItemAnnounce(),
    fullText: getItemFullText(),
    category: getItemCategories(),
  }));
};

const saveToMock = (content) => {
  fs.writeFile(`mock.json`, content, (err) => {
    if (err) {
      return console.error(`Can't write data to file...`);
    }

    return console.info(`Operation success. File created.`);
  });
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countItem = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countItem > MAX_COUNT) {
      console.error(`Не больше 1000 публикаций`);

      return ExitCode.error;
    }

    const content = JSON.stringify(generateItems(countItem));

    saveToMock(content);

    return ExitCode.success;
  }
};
