
class Auth {
    constructor($rootScope, $state, AuthApiService, StorageService) {
        this.$rootScope = $rootScope
        this.$state = $state
        this.AuthApiService = AuthApiService
        this.StorageService = StorageService
    }

    login(user) {
        this.AuthApiService.login(user).then((data) => {
            let token = data.payload.token
            let user = data.payload.user
            this.$rootScope.User = angular.copy(user)
            this.StorageService.set('Authorization', token)
            this.$state.go('app.private.homepage')
console.log(this.$rootScope.User)
        }).catch(e => console.log(e))
    }

    logout() {
        this.AuthApiService.logout().then((data) => {
            if (data.payload) {
                this.StorageService.remove('Authorization');
                this.$state.go('app.public.login');
            }
        }).catch(e => console.log(e));
    }

    isSignedIn() {
        return !!this.StorageService.get('Authorization');
    }
}

Auth.$inject = ['$rootScope', '$state', 'AuthApiService', 'StorageService'];

export default Auth;