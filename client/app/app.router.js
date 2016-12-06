import uiRouter from 'angular-ui-router';
import routerConfig from './router.config';
import routerRun from './router.run';

angular
    .module('app.router', [uiRouter])
    .config(routerConfig)
    .run(routerRun);
