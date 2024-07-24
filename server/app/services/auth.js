const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password, hashingOptions);
    delete req.body.password;
    req.body.hashedPassword = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    req.auth = jwt.verify(token, process.env.APP_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    if (!req.auth.isAdmin) {
      res.sendStatus(403);
      return;
    }
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = { hashPassword, verifyToken, verifyAdmin };
