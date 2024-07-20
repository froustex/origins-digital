const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const videos = await tables.video.readAll();
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const video = await tables.video.read(req.params.id);
    if (!video) {
      res.sendStatus(404);
    }
    res.json(video);
  } catch (err) {
    next(err);
  }
};

const readByAverage = async (req, res, next) => {
  try {
    const result = await tables.video.readByAverageRate(req.params.id);
    if (!result) {
      res.sendStatus(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const readComments = async (req, res, next) => {
  try {
    const result = await tables.video.readCommentsByVideo(req.params.id);
    if (!result) {
      res.sendStatus(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const readCategories = async (req, res, next) => {
  try {
    const result = await tables.video.readCategoriesByVideo(req.params.id);
    if (!result) {
      res.senStatus(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const video = req.body;
  const { id } = req.params;
  try {
    await tables.video.update(video, id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const editCategoriesByVideo = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  try {
    await tables.video.updateCategoriesByVideo(data, id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const video = req.body;
    const insertId = await tables.video.create(video);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const addRate = async (req, res, next) => {
  try {
    const rate = req.body;
    const insertId = await tables.video.createRate(rate);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const addComment = async (req, res, next) => {
  try {
    const comment = req.body;
    const insertId = await tables.video.createComment(comment);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.video.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroyComment = async (req, res, next) => {
  try {
    await tables.video.deleteVideoComment(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroyCategory = async (req, res, next) => {
  try {
    await tables.video.deleteVideoCategory(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  add,
  addRate,
  addComment,
  read,
  readByAverage,
  readComments,
  readCategories,
  edit,
  editCategoriesByVideo,
  destroy,
  destroyComment,
  destroyCategory,
};
