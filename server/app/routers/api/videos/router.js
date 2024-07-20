const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/videoActions");

const uploadMulter = require("../../../services/multerOptions");
const uploadVideo = require("../../../services/upload");

router.get("/", browse);

router.get("/:id", read);

router.put("/:id", edit);

router.post("/", uploadMulter.single("file"), uploadVideo, add);

router.delete("/:id", destroy);

module.exports = router;
