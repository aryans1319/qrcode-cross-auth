const mongoose = require("mongoose");

const qrCodeSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Users",
    },
    connectedDeviceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "connectedDevices"
    },
    lastUsedDate: {
        type: Date,
        default: null
    },
    isActiveNow: {  
        type: Boolean, 
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const QRCode = mongoose.model("QRCode", qrCodeSchema);

module.exports = QRCode;