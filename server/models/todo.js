var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = mongoose.model('Todo', new Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    }
}));

module.exports = {Todo}