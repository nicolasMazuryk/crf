
class UserApiService {
    constructor($resource, config) {
        console.log($resource);
        console.log(config);
    }
}

UserApiService.$inject = ['$resource', 'config'];

export default UserApiService;