const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const {
  browse,
  read,
  add,
  destroy,
} = require("../../../controllers/userActions");

const { hashPassword } = require("../../../services/auth");

// Route to get a list of users
router.get("/", browse);

// Route to get a specific user by ID
router.get("/:id", read);

// Route to add a new user
router.post("/", hashPassword, add);

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
