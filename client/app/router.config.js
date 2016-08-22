export default routerConfig;

routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routerConfig($stateProvider, $urlRouterProvider) {

    // IE fix
    $urlRouterProvider.when('', '/');

    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('default', {
            url: '/',
            abstract: true,
            templateProvider: ($templateCache) => {
                return $templateCache.get('layout.html');
            }
        })
        .state('default.homepage', {
            url: '?q',
            controller: 'homepage.controller',
            controllerAs: 'vm',
            templateProvider: ($templateCache) => {
                return $templateCache.get('homepage.html');
            }
        })
        .state('default.login', {
            url: 'login',
            controller: 'login.controller',
            controllerAs: 'vm',
            templateProvider: ($templateCache) => {
                return $templateCache.get('login.html');
            }
        })
        .state('default.404', {
            url: '404',
            templateProvider: ($templateCache) => {
                return $templateCache.get('404.html');
            }
        });

    //.state('default', {
    //    //abstract: true,
    //    url: '/',
    //    templateProvider: function($templateCache) {
    //        return $templateCache.get('layout.template.html');
    //    }
    //})
    //.state('default.product', {
    //    controller: 'product.controller',
    //    controllerAs: 'vm',
    //    templateProvider: function($templateCache) {
    //        return $templateCache.get('product.tpl.html');
    //    }
    //})
    //.state('default.header', {
    //    //url: 'header',
    //    data: {
    //        id: "0637226478",
    //        cerrier: 'lifecell'
    //    },
    //    resolve: {
    //        inject: function() {
    //            return window.location.origin;
    //        }
    //    },
    //    controller: 'header.controller',
    //    controllerAs: 'vm',
    //    templateProvider: function($templateCache) {
    //        return $templateCache.get('header.template.html');
    //    }
    //})
}