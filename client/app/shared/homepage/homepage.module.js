//import angular from 'angular';
import homepageController from "./homepage.controller";

angular
    .module('homepage', [])
    .controller('homepage.controller', homepageController);

//homepageController.$inject = ['$scope', '$state'];

//function homepageController($scope, $state) {
//    console.log('$scope', $scope);
//    console.log('$STATE', $state);
//}
