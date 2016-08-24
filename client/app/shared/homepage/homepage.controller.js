
class homepageController {
    constructor($scope, $state) {
        this.name = "nicolas mazuryk";

        console.log('name', this.name);
        console.log('homepage_Controller', $scope);
    }
}

homepageController.$inject = ['$scope', '$state'];

export default homepageController;