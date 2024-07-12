const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

const userRouter = require("./users/router");

router.use("/users", userRouter);

const videosRouter = require("./videos/router");

router.use("/videos", videosRouter);

/* ************************************************************************* */

module.exports = router;
