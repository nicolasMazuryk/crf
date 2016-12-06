
class AuthApiService {
    constructor($resource, API, StorageService) {
        this.StorageService = StorageService
        this.Auth = $resource(null, {}, {
            'login': {
                url: `${API.URL}/login`,
                method: 'POST'
            },
            'logout': {
                url: `${API.URL}/logout`,
                method: 'GET',
                headers: this.setHeaders
            }
        });
    }

    setHeaders() {
        const
            token = this.StorageService.get('Authorization'),
            authHeader = {Authorization: `Bearer ${token}`}
        debugger
        return authHeader
    }

    login(user) {
        return this.Auth.login(user).$promise;
    }

    logout() {
        return this.Auth.logout().$promise;
    }
}

AuthApiService.$inject = ['$resource', 'API', 'StorageService'];

export default AuthApiService;