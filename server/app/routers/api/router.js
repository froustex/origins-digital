const express = require("express");

const router = express.Router();

// middlewares

const { verifyToken, verifyAdmin } = require("../../services/auth");

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */
const authActions = require("../../controllers/authActions");

router.post("/login", authActions.login);

router.get("/verify-auth", verifyToken, authActions.isLoggedIn);

router.get("/verify-admin", verifyToken, verifyAdmin, authActions.isLoggedIn);

router.get("/logout", verifyToken, authActions.logout);

// items
const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

// users
const userRouter = require("./users/router");

router.use("/users", userRouter);

// videos
const videosRouter = require("./videos/router");

router.use("/videos", videosRouter);

// categories
const categoriesRouter = require("./categories/router");

router.use("/categories", categoriesRouter);

/* ************************************************************************* */

module.exports = router;
