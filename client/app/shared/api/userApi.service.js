
class UserApiService {
    constructor($resource, API) {
        this.User = $resource(`${API.URL}/api/users/:id`, {id: '@id'}, {
            'get': {
                method: 'GET',
                isArray: true
            },
            'post': {
                method: 'POST'
            },
            'delete': {
                method: 'DELETE'
            }
        })
    }

    getAll() {
        return this.User.get().$promise;
    }

    create(user) {
        return this.User.post(user).$promise;
    }

    remove(id) {
        return this.User.delete(id).$promise;
    }
}

UserApiService.$inject = ['$resource', 'API'];

export default UserApiService;