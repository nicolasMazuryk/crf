
class loginController {
    constructor($q) {
        console.log('login');
        console.log($q);
    }
}

loginController.$inject = ['$q'];

export default loginController;
