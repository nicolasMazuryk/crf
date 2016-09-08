
class homepageController {
    constructor(UserApiService) {
        this.UserApiService = UserApiService;
        this.user = {email: null, password: null};
    }

    createUser() {
        this.UserApiService.create(this.user).then(data => {
            console.log(data);
        }).catch(e => console.log(e));
    }

    getUsers() {
        this.UserApiService.getUsers().then(data => {
            console.log(data);
        }).catch(e => console.log(e));
    }

    removeUser() {
        this.UserApiService.remove().then(data => {
            console.log(data);
        }).catch(e => console.log(e));
    }

}

homepageController.$inject = ['UserApiService'];

export default homepageController;