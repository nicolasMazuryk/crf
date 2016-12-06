
class loginController {
    constructor(Auth) {
        this.Auth = Auth;
        this.user = {phone: null, password: null};
    }

    login() {
        return this.Auth.login(this.user);
    }

    logout() {
        return this.Auth.logout();
    }
}

loginController.$inject = ['Auth'];

export default loginController;
