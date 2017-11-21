var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require ('./db/mongoose').mongoose;
var Todo = require ('./models/todo').Todo;
var User = require ('./models/user').User;

//ALTERNATE METHOD
// var {mongoose} = require ('./db/mongoose');
// var {Todo} = require ('./models/todo');
// var {User} = require ('./models/user');



var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo ({
            text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/users', (req, res) => {
    var user = new User ({
        email: req.body.email
    });
    user.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find({text: 'postman'},'text').then((todos) => {
        res.send(todos);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/users', (req, res) => {
    User.find({email: 'test1@test.com'}, 'email').then((users) => {
        res.send(users);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('started on port 3000');
});



//
// var newTodo = new Todo({
//     text: 'hit there'
// });

//Insert Using Promise

// newTodo.save().then((doc) => {
//     console.log('Saved todo:',doc);
// }, (e) => {
//     console.log('Unable to save todo',e);
// });

//Insert Using Callback

// newTodo.save((err) => {
//     if (err) {
//         console.log('Unable to save todo',err);
//     } else {
//         console.log('Saved todo');
//     }
//
// });




// var newUser = new User({email: 'test@test.com'});
//
// newUser.save().then((doc) => {
//     console.log('Saved user:', doc);
// }, (e) => {
//     console.log('Unable to save user',e);
// });