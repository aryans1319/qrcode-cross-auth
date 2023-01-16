const QRCode = require("../models/qrCode");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const QR = require("qrcode");

const generateQRCode = asyncHandler(async (req, res) => {
  try {
    const { userID } = req.body;
    if (!userID) {
      res.status(400).json({
        message: "User ID is required!",
      });
    }

    const existingUser = await User.findById(userID);

    if (!existingUser) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const isQRExists = await QRCode.findOne({userID});
    /*
            if qr code already exists create a new qr and update
            disabled to true
            else create a qr with a specific userID
        */
    if (!isQRExists) {
      await QRCode.create({ userID });
    } else {
      await QRCode.findOneAndUpdate({ userID }, { $set: { disabled: true } });
      await QRCode.create({ userID });
    }

    const encryptedQR = jwt.sign(
      {
        userID: existingUser._id,
        email: existingUser.email
      },
      process.env.TOKEN,
      {
        expiresIn: "6h",
      }
    );
    // Generate QR Code
    const encryptedQRImage = await QR.toDataURL(encryptedQR);
    return res.status(200).json({
      encryptedQRImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = {
  generateQRCode,
};
