const Joi = require("joi");

const USER_REGEX = /^[A-za-z][A-Za-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = Joi.object({
  username: Joi.string().pattern(USER_REGEX).required().messages({
    "string.pattern.base":
      "Username must be 4-24 characters long and start with a letter. Allowed characters: letters, numbers, hyphens, and underscores",
    "any.required": "Username is required",
  }),

  email: Joi.string().pattern(EMAIL_REGEX).required().messages({
    "string.pattern.base": "Email must be valid.",
    "any.required": "Email is required.",
  }),

  hashedPassword: Joi.string().pattern(PASSWORD_REGEX).required().messages({
    "string.pattern.base":
      "Password must be 8-24 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character. Allowed special characters: ! @ # $ %",
    "any.required": "Password is required.",
  }),

  isAdmin: Joi.boolean().required().messages({
    "any.required": "Admin status is required",
  }),
});

module.exports = userSchema;
