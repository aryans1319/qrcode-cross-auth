const mongoose = require("mongoose");

const connectedDeviceSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Users",
    },
    qrCodeID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "QRCodes",
    },
    deviceName: {
        type: String,
        default: null,
    },
    deviceModel: {
        type: String,
        default: null,
    },
    deviceOS: {
        type: String,
        default: null,
    },
    deviceVersion: {
        type: String,
        default: null,
    },
    disabled: {
        type: Boolean,
        default: false,
    },

})

const ConnectedDevice = mongoose.model("ConnectedDevice", connectedDeviceSchema);

module.exports = ConnectedDevice;