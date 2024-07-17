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

const add = async (req, res, next) => {
  try {
    const video = req.body;
    const insertId = await tables.video.create(video);
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

module.exports = {
  browse,
  add,
  read,
  edit,
  destroy,
};
