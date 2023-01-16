const express = require('express');

const { UserController, QRController } = require('../../controllers/index')

const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);

router.post("/qrcode/:generate", QRController.generateQRCode);

module.exports = router;