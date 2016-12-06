import ngResource from 'angular-resource';
import Auth from './auth.service.js';

angular
    .module('authorization', [ngResource])
    .service('Auth', Auth);