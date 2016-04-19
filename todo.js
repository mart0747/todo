var http = require('http');
var express = require('express');
var app = express(); 

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Todo = require('./models/todo.js');

//initialize the DB and DB Connection
var dbURI = 'mongodb://localhost/todo';
var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions : {keepalive : 1}
    }
};

mongoose.connect(dbURI, opts); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {'extended':'true'} ));
app.use(bodyParser.json());
app.use(bodyParser.json( {type: 'application/vnd.api+json' }));
app.use(methodOverride());


// API Routes 
app.delete('/api/todos/:todo_id', function(req,res){
    console.log('delete: ' );
    console.log(req.params.todo_id); 
    
    Todo.remove( {_id : req.params.todo_id }, function(err, todo){
       if (err)
           res.send(err);
        
        
        Todo.find(function(err, todos){ 
           if (err) 
               res.send(err); 
            
            res.json(todos); 
        });
    });
});


app.get('/api/todos', function(req,res){
    Todo.find(function(err, todos){
        if(err)
            res.send(err);
        
        res.json(todos); 
    });
});

app.post('/api/todos', function(req,res){    
    console.log(req.body);
    
    var newRecord = new Todo({
        text : req.body.text
    });
    
    newRecord.save(function(err, a){
        if (err) 
            return res.status(500).send(err);
        
               
        res.json( { id : a._id });
    });
    
});
    
app.get('*', function(req,res){
    res.sendfile('./public/index.html');
});

app.listen(3000);
console.log('app listening on port 3000'); 

                                