import './app.router';
import './shared/homepage/homepage.module';
import './shared/login/login.module';

angular.module('app', [
        'app.router',
        'templates',
        'homepage',
        'login'
    ])
    .config(config);

config.$inject = ['$locationProvider'];

function config($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $locationProvider.hashPrefix('!');
}
