
export default runRouterBlock;

runRouterBlock.$inject = ['$rootScope', '$state', 'Auth', 'pluginsService'];

function runRouterBlock($rootScope, $state, Auth, pluginsService) {

    pluginsService.init();

    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
        if (toState.name && toState.name.match(/^app\.private\./)) {
            if (!Auth.isSignedIn()) {
                event.preventDefault();
                return $state.go('app.public.login');
            }
        }
    })
}