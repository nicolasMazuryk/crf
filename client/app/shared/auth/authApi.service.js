
class AuthApiService {
    constructor($resource, API, CookieService) {
        this.token = CookieService.get('Auth');

        this.Auth = $resource(`${API.URL}`, {}, {
            'login': {
                url: `login`,
                method: 'POST'
            },
            'logout': {
                url: 'logout',
                method: 'GET',
                headers: CookieService.get('Auth')
            }
        });
    }

    login(user) {
        return this.Auth.login(user).$promise;
    }

    logout() {
        return this.Auth.logout().$promise;
    }

}

AuthApiService.$inject = ['$resource', 'API', 'CookieService'];

export default AuthApiService;