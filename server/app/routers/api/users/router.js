const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const {
  browse,
  read,
  readFavorites,
  readComments,
  readRates,
  add,
  addFavoriteVideo,
  destroy,
  destroyFavorite,
} = require("../../../controllers/userActions");

const { hashPassword } = require("../../../services/auth");

router.get("/", browse);

router.get("/:id", read);

router.post("/", hashPassword, add);

router.delete("/:id", destroy);

router.get("/:id/favorites", readFavorites);

router.get("/:id/comments", readComments);

router.get("/:id/rates", readRates);

router.post("/:id/favorites", addFavoriteVideo);

router.delete("/:id/favorites/:id", destroyFavorite);

module.exports = router;
