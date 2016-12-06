import './app.router';
import './shared/api/api.module';
import './shared/auth/auth.module';
import './shared/storage/storage.module';
import './shared/plugins/plugins.module';
import './shared/directives/directives.module';
import './shared/services/services.module';
import './components/homepage/homepage.module';
import './components/header/header.module';
import './components/login/login.module';
import config from './../../config.json';

angular
    .module('app', [
        'ngMessages',
        'app.router',
        'api',
        'authorization',
        'plugins',
        'directives',
        'services',
        'storage',
        'templates',
        'homepage',
        'header',
        'login'
    ])
    .constant('config', config)
    .config(angularConfiguration);

angularConfiguration.$inject = ['$locationProvider', '$httpProvider'];

function angularConfiguration($locationProvider, $httpProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $locationProvider.hashPrefix('!');
    /* @ngInject */
    $httpProvider.interceptors.push(['$q', 'StorageService', ($q, StorageService) => {
        return {
            responseError: (rejection) => {
                switch (rejection.status) {
                    // 401
                    case 500:
                        if (rejection.type) {
                            StorageService.remove('Authorization')
                            console.log('REMOVED')
                            //$state.go('app.public.login');
                        }
                        return $q.reject(err)
                }
            }
        }
    }])
}
