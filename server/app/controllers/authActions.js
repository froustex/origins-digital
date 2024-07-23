const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.user.readByEmail(req.body.email);
    if (!user) {
      res.status(422).json({
        message:
          "We couldn't find an account matching the email and password you entered. Please check your email and password and try again.",
      });
      return;
    }
    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password
    );
    if (verified) {
      delete user.hashed_password;
      const token = jwt.sign(
        {
          sub: user.id,
          isAdmin: user.is_admin,
        },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.json({ token, user });
    } else {
      res.status(422).json({
        message:
          "We couldn't fin an account matching the email and password you entered. Please check your email and password and try again.",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
