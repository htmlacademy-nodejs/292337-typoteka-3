'use strict';

const adapter = require(`../lib/data-adapter`);
const {saveFile} = require(`../lib/file-manager`);

const {ALLOWED_FILETYPES} = require(`../../constants`);

module.exports = async (req, res, next) => {
  try {
    req.files.titleImage = await saveFile({...req.files.titleImage});
  } catch (error) {
    return res.render(`admin/new-post`, {
      allowedFileTypes: ALLOWED_FILETYPES,
      article: adapter({
        ...res.fields,
        ...res.files,
      }),
      error: error.message,
    });
  }

  res.locals.data = adapter({
    ...req.fields,
    ...req.files,
  });

  return next();
};
