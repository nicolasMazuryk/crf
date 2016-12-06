class headerController {

    constructor($rootScope, Auth, ResearchApiService, ClinicApiService, toastService) {
        this.$rootScope = $rootScope
        this.Auth = Auth
        this.ClinicApiService = ClinicApiService
        this.toastService = toastService

        this.user = $rootScope.User

        ResearchApiService.list().then(data => {
            this.researches = data.payload
// refactor
            setTimeout(() => $rootScope.$broadcast('update:select', {}), 10)
        }).catch(e => console.log(e))
    }

    clinicsList(rid) {
        this.ClinicApiService.getOne(rid).then(data => {
            this.clinics = data.payload
            $('select').material_select()
            setTimeout(() => this.$rootScope.$broadcast('update:select', {}), 10)
        }).catch(e => console.log(e))
    }

    logout() {
        this.Auth.logout()
    }
}

headerController.$inject = ['$rootScope', 'Auth', 'ResearchApiService', 'ClinicApiService', 'toastService']

export default headerController