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
            templateProvider: ($templateCache) => $templateCache.get('layout.html')
        })
        .state('default.homepage', {
            url: '/',
            controller: 'homepage.controller',
            controllerAs: 'vm',
            /* @ngInject */
            templateProvider: ($templateCache) => $templateCache.get('homepage.html')
        })
        .state('default.login', {
            url: '/login',
            controller: 'login.controller',
            controllerAs: 'vm',
            /* @ngInject */
            templateProvider: ($templateCache) => $templateCache.get('login.html')
        })
        .state('default.404', {
            url: '/404',
            /* @ngInject */
            templateProvider: ($templateCache) => $templateCache.get('404.html')
        });
}