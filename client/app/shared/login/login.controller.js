
class loginController {
    constructor(AuthApiService, UserApiService) {
        this.AuthApiService = AuthApiService;
        this.UserApiService = UserApiService;
        this.user = {email: null, password: null};
    }

    login() {
        this.AuthApiService.login(this.user);
    }
}

loginController.$inject = ['AuthApiService', 'UserApiService'];

export default loginController;
