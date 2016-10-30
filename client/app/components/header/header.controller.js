class headerController {
    constructor($rootScope, Auth, ResearchApiService) {
        this.$rootScope = $rootScope
        this.Auth = Auth

        ResearchApiService.list().then(data => {
            this.researches = data.payload

console.log(this.researches)
        })
    }

    logout() {
        this.Auth.logout()
    }
}

headerController.$inject = ['$rootScope', 'Auth', 'ResearchApiService']

export default headerController