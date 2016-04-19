var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    text : String
});

var Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo; 
