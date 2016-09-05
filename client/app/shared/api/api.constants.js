
class apiConstants {
    constructor(config) {
        this.config = config;
        this.URL = `${config.development.host}:${config.development.port}`;
    }
}

apiConstants.$inject = ['config'];

export default apiConstants;
