class ResearchApiService {
    constructor($resource, API) {
        this.Research = $resource(`${API}/researches/:id`, {id: '@id'})
    }

    getOne(id) {
        return this.Research.get(id).$promise
    }

    list() {
        return this.Research.get().$promise
    }
}

ResearchApiService.$inject = ['$resource', 'API']

export default ResearchApiService