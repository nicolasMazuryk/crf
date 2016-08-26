
class homepageController {
    constructor($scope, $state) {
        console.log('homepageController', $scope);
    }
}

homepageController.$inject = ['$scope', '$state'];

export default homepageController;