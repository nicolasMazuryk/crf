import './app.router';
import './shared/api/api.module';
import './shared/homepage/homepage.module';
import './shared/login/login.module';
import config from './../../config.json';

angular.module('app', [
        'app.router',
        'api',
        'templates',
        'homepage',
        'login'
    ])
    .config(angularConfiguration)
    .factory('config', config);

angularConfiguration.$inject = ['$locationProvider'];

function angularConfiguration($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $locationProvider.hashPrefix('!');
}
