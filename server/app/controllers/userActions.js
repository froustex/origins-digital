const tables = require("../../database/tables");

const userSchema = require("../services/userValidation");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const readFavorites = async (req, res, next) => {
  try {
    const favorites = await tables.user.readFavorites(req.params.id);
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

const readComments = async (req, res, next) => {
  try {
    const comments = await tables.user.readCommentsByUser(req.params.id);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const readRates = async (req, res, next) => {
  try {
    const rates = await tables.user.readRatesByUser(req.params.id);
    res.json(rates);
  } catch (err) {
    next(err);
  }
};

const readRateOfOneVideo = async (req, res, next) => {
  try {
    const rate = await tables.user.readRateByUserByVideo(
      req.params.id,
      req.params.videoId
    );
    if (!rate) {
      res.sendStatus(404);
    } else {
      res.json(rate);
    }
  } catch (err) {
    next();
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        message: "Validation error",
        details: error.details.map((err) => err.message),
      });
      return;
    }

    const userExists = await tables.user.readByEmail(req.body.email);
    if (userExists) {
      res.status(409).json({ message: "Email already taken, please log in." });
      return;
    }

    const user = req.body;
    const insertId = await tables.user.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.user.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroyFavorite = async (req, res, next) => {
  const { userId, id } = req.params;
  try {
    await tables.user.deleteFavorite(userId, id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroyComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.user.deleteComment(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  readFavorites,
  readComments,
  readRates,
  readRateOfOneVideo,
  // edit,
  add,
  destroy,
  destroyFavorite,
  destroyComment,
};
