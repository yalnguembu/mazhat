const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: {
        type:String,
        required:true,
    },
    receiver: {
        type:String,
        required:true,
    },
    text: {
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now()
    },
    state:{
        type:String,
        default:"send"
    }
});

module.exports = mongoose.model('message', MessageSchema);

