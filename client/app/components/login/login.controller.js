
class loginController {
    constructor(AuthApiService, CookieService) {
        this.AuthApiService = AuthApiService;
        this.CookieService = CookieService;
        this.user = {email: null, password: null};
    }

    login() {
        this.AuthApiService.login(this.user).then((data) => {
            let token = data.payload;
            this.CookieService.set('Authorization', token, 12);
        }).catch(e => console.log(e));
    }

    logout() {
        this.AuthApiService.logout().then((data) => {
            console.log(data);
        })
    }
}

loginController.$inject = ['AuthApiService', 'CookieService'];

export default loginController;
