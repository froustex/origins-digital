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
  destroy,
  destroyComment,
  readCategories,
  destroyCategory,
} = require("../../../controllers/videoActions");

router.get("/", browse);

router.get("/:id", read);

router.put("/:id", edit);

router.post("/", add);

router.delete("/:id", destroy);

router.get("/:id/avgrate", readByAverage);

router.post("/rates", addRate);

router.get("/:id/comments", readComments);

router.post("/comments", addComment);

router.delete("/comments/:id", destroyComment);

router.get("/:id/categories", readCategories);

router.delete("/:id/categories/:id", destroyCategory);

router.put("/:id/categories/:id", editCategoriesByVideo);

module.exports = router;
