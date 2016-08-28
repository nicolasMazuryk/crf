
class loginController {
    constructor(AuthApiService) {
        console.log('AuthApiService', AuthApiService);
    }
}

loginController.$inject = ['AuthApiService'];

export default loginController;
