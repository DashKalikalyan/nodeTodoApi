var mongoose = require('mongoose');
var validator = require('validator');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength:6,
    },
    tokens:[{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,['_id', 'email']);
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch(e) {
        return new Promise ((resolve, reject) => {
            reject('error.test');
        });
    }

    return User.findOne({_id: decoded._id, 'tokens.token': token, 'tokens.access': 'auth'});
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access ='auth';
    var token = jwt.sign({_id: user._id, access}, 'abc123').toString();
    user.tokens.push({access: access, token: token});
    // return user.save().then((res) => {
    //     return token;
    // });
    user.save();
    return token;
};

var User = mongoose.model('User', UserSchema);

module.exports = {User}

// BASIC PASSWORD STRUCTURE

