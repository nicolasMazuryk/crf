
class apiConstants {
    constructor(config) {
        this.URL = config.host + ':' + config.port;
    }
}

apiConstants.$inject = ['config'];

export default apiConstants;
