const express = require('express');

const { UserController } = require('../../controllers/index')

const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);

module.exports = router;