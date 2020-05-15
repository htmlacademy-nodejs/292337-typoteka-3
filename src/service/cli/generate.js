'use strict';

const fs = require(`fs`).promises;
const {DateTime} = require(`luxon`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {
  DEFAULT_COUNT,
  MAX_COUNT,
  ExitCode,
  MAX_ID_LENGTH,
} = require(`../../constants`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const FILE_MOCK_PATH = `./mock.json`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const getItemTitle = (titles) => {
  return titles[getRandomInt(0, titles.length - 1)];
};

const getItemCreatedDate = () => {
  const maxTimestamp = Date.now();
  const minTimestamp = DateTime.local().minus({months: 3}).toMillis();

  return DateTime
    .fromMillis(getRandomInt(minTimestamp, maxTimestamp))
    .toFormat(`yyyy-MM-dd HH:mm:ss`);
};

const getItemAnnounce = (sentences) => shuffle(sentences).slice(1, getRandomInt(2, 5)).join(` `);

const getItemFullText = (sentences) => shuffle(sentences).slice(1, getRandomInt(2, sentences.length - 1)).join(` `);

const getItemCategories = (categories) => shuffle(categories).slice(1, getRandomInt(2, categories.length - 1));

const generateCommnents = (count, comments) => {
  return Array(count).fill().map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments).slice(1, getRandomInt(2, comments.length - 1)).join(` `),
  }));
};

const generateItems = (count, titles, categories, sentences, comments) => {
  return Array(count).fill().map(() => ({
    title: getItemTitle(titles),
    createdDate: getItemCreatedDate(),
    announce: getItemAnnounce(sentences),
    fullText: getItemFullText(sentences),
    category: getItemCategories(categories),
    comments: generateCommnents(getRandomInt(1, 3), comments),
  }));
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);

    return content.trim().split(`\n`);
  } catch (error) {
    console.error(
        chalk.red(error)
    );

    return [];
  }
};

const saveToMock = async (content) => {
  try {
    await fs.writeFile(FILE_MOCK_PATH, content);

    console.info(
        chalk.green(`Operation success. File created.`)
    );
  } catch (error) {
    console.error(
        chalk.red(`Can't write data to file...`)
    );
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countItem = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countItem > MAX_COUNT) {
      console.error(
          chalk.red(`Не больше 1000 публикаций`)
      );

      return ExitCode.error;
    }

    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const content = JSON.stringify(
        generateItems(
            countItem,
            titles,
            categories,
            sentences,
            comments
        )
    );

    saveToMock(content);

    return ExitCode.success;
  }
};
