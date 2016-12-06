
class selectDirective {
    constructor($rootScope) {
        this.restrict = 'A'
        this.scope = {}
        this.$rootScope = $rootScope
    }

    link(scope, elem, attrs, ctrl) {
        let name = attrs.customSelect
        scope.$on(`update:${name}`, () => {
            $(elem).material_select()
        })
    }

    static createInstance($rootScope) {
        selectDirective.Instance = new selectDirective($rootScope)
        return selectDirective.Instance
    }
}

selectDirective.createInstance.$inject = ['$rootScope']

export default selectDirective