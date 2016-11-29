
class AuthApiService {
    constructor($resource, API, CookieService) {
        const
            token = CookieService.get('Authorization'),
            authHeader = {Authentication: `Bearer ${token}`};

        this.Auth = $resource(null, {}, {
            'login': {
                url: `${API.URL}/login`,
                method: 'POST'
            },
            'logout': {
                url: `${API.URL}/logout`,
                method: 'GET',
                headers: authHeader
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