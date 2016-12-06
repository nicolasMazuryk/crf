
class pluginsService {
    constructor($rootScope) {
        this.$rootScope = $rootScope
    }

    init() {
        $('select').material_select();

        this.$rootScope.$on('update:select', (e) => {
            $('select').material_select();
        })
    }
}

pluginsService.$inject = ['$rootScope']

export default pluginsService;