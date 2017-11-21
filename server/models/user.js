var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema ({
    email: {
        type: String,
        required: true,
        minlength: 4,
        trim: true
    }
}));

module.exports = {User}