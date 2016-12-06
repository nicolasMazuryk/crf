class ClinicApiService {
    constructor($resource, API) {
        this.Clinic = $resource(`${API.URL}/api/researches/:rid/clinics/:cid`, {rid: '@rid', cid: '@cid'}, {
            'get': {
                method: 'GET'
            }
        })
    }

    getOne(rid) {
        return this.Clinic.get({rid}).$promise
    }
}

ClinicApiService.$inject = ['$resource', 'API']

export default ClinicApiService