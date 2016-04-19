var assert = require('chai').assert;
var rest = require('restler'); 
var http = require('http');

suite('API Tests', function(){
   
    var base = 'http://localhost:3000'
    
    test('should be able to retreive todos', function(done){
        rest.get(base + '/api/todos').on('success', function(data) {
            assert(data);
            done();
        });
    });
    
    var todo = { text : 'give me love' };
    test('should be able to add a todo', function(done){ 
        rest.post(base + '/api/todos', {data : todo}).on('success', function(data){
            assert.match(data.id, /\w/, 'id must be set');
            done();
        });
    });
    
    var tododelete = { test : 'this only lasts for a moment' };
    test('should be able to delete a todo', function(done){
        //first, add the record
        rest.post(base + '/api/todos', {data : tododelete}).on('success', function(data){
            //now delete it.
            rest.del(base + '/api/todos/' + data.id).on('success', function(data){
                assert.match(data.id,/\w/, 'id must be set');
                console.log(data);
                done();
            });
        });
    });
});