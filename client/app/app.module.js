import './app.router';
import './shared/api/api.module';
import './shared/auth/auth.module';
import './shared/cookie/cookie.module';
import './components/homepage/homepage.module';
import './components/login/login.module';
import config from './../../config.json';

angular
    .module('app', [
        'app.router',
        'api',
        'auth',
        'cookie',
        'templates',
        'homepage',
        'login'
    ])
    .constant('config', config)
    .config(angularConfiguration);

angularConfiguration.$inject = ['$locationProvider'];

function angularConfiguration($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $locationProvider.hashPrefix('!');
}
