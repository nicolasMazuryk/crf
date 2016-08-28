
class AuthApiService {
    constructor($resource, API) {
        console.log($resource);
        console.log(API);
    }
}

AuthApiService.$inject = ['$resource', 'API'];

export default AuthApiService;