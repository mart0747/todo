var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};
    
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(){
            console.log('error : ' + data);
        });
    
    $scope.createTodo = function() {
        console.log($scope.formData);
        $http.post('/api/todos', $scope.formData)
            .success(function(data){
                $scope.formData = {};
                
                $http.get('api/todos')
                    .success(function(data){ 
                        $scope.todos = data;
                    });
                
                console.log(data);
            })
            .error(function(data){
                console.log('error : ' + data);
            });
    };
    
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data){
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data){
                console.log('error : ' + data);
            });
    };
}
