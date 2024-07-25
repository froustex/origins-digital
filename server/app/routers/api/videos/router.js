const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  readByAverage,
  readComments,
  edit,
  editCategoriesByVideo,
  add,
  addRate,
  addComment,
  addFavoriteVideo,
  destroy,
  destroyComment,
  readCategories,
  destroyCategory,
} = require("../../../controllers/videoActions");

const uploadMulter = require("../../../services/multerOptions");
const uploadVideo = require("../../../services/upload");

router.get("/", browse);

router.get("/:id", read);

router.put("/:id", edit);

router.post("/", uploadMulter, uploadVideo, add);

router.delete("/:id", destroy);

router.post("/:id/favorites", addFavoriteVideo);

router.get("/:id/avgrate", readByAverage);

router.post("/rates", addRate);

router.get("/:id/comments", readComments);

router.post("/comments", addComment);

router.delete("/:videoId/comments/:id", destroyComment);

router.get("/:id/categories", readCategories);

router.delete("/:videoId/categories/:id", destroyCategory);

router.put("/:id/categories/:id", editCategoriesByVideo);

module.exports = router;
