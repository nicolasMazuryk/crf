
class Auth {
    constructor($state, AuthApiService, StorageService) {
        this.$state = $state;
        this.AuthApiService = AuthApiService;
        this.StorageService = StorageService;
    }

    login(user) {
        this.AuthApiService.login(user).then((data) => {
            let token = data.payload;
            this.StorageService.set('Authorization', token);
            this.$state.go('app.private.homepage');
        }).catch(e => console.log(e));
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

Auth.$inject = ['$state', 'AuthApiService', 'StorageService'];

export default Auth;