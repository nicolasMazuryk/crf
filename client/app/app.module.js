angular
    .module('app', [
    'templates',
    'homepage',
    'registration',
    'product',
    'app.router'
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

