export default routerConfig;

routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routerConfig($stateProvider, $urlRouterProvider) {

    // IE fix
    $urlRouterProvider.when('', '/');

    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('app', {
            abstract: true,
            template: '<ui-view></ui-view>'
        })
        .state('app.public', {
            abstract: true,
            template: '<ui-view></ui-view>'
        })
        .state('app.public.login', {
            url: '/login',
            controller: 'login.controller',
            controllerAs: 'vm',
            /* @ngInject */
            templateProvider: ($templateCache) => $templateCache.get('login.html')
        })
        .state('app.public.404', {
            url: '/404',
            /* @ngInject */
            templateProvider: ($templateCache) => $templateCache.get('404.html')
        })

        .state('app.private', {
            abstract: true,
            /* @ngInject */
            templateProvider: ($templateCache) => $templateCache.get('layout.html')

        })
        .state('app.private.homepage', {
            url: '/',
            views: {
                'header': {
                    /* @ngInject */
                    templateProvider: ($templateCache) => $templateCache.get('header.html')
                },
                'navigation': {
                    /* @ngInject */
                    templateProvider: ($templateCache) => $templateCache.get('navigation.html')
                },
                "": {
                    controller: 'homepage.controller',
                    controllerAs: 'vm',
                    /* @ngInject */
                    templateProvider: ($templateCache) => $templateCache.get('homepage.html')
                }
            }
        });
}