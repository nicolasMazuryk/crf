(function() {

angular
    .module('registration')
    .controller('registration.controller', registrationController);

    registrationController.$inject = ['$scope'];

    function registrationController($scope) {
        console.log($scope);
    }
}());