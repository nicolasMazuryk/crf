export default routerConfig;

routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routerConfig($stateProvider, $urlRouterProvider) {

    // IE fix
    $urlRouterProvider.when('', '/');

    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('default', {
            abstract: true,
            /* @ngInject */
            templateProvider: ($templateCache) => {
                return $templateCache.get('layout.html');
            }
        })
        .state('default.homepage', {
            url: '/',
            controller: 'homepage.controller',
            controllerAs: 'vm',
            /* @ngInject */
            templateProvider: ($templateCache) => {
                return $templateCache.get('homepage.html');
            }
        })
        .state('default.login', {
            url: '/login',
            controller: 'login.controller',
            controllerAs: 'vm',
            /* @ngInject */
            templateProvider: ($templateCache) => {
                return $templateCache.get('login.html');
            }
        })
        .state('default.404', {
            url: '/404',
            /* @ngInject */
            templateProvider: ($templateCache) => {
                return $templateCache.get('404.html');
            }
        });
}