import uiRouter from 'angular-ui-router';
import routerConfig from './router.config';

angular
    .module('app.router', [uiRouter])
    .config(routerConfig);
