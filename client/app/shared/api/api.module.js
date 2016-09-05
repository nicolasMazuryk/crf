import ngResource from 'angular-resource';
import apiConstants from './api.constants';
import UserApiService from './userApi.service';

angular
    .module('api', [ngResource])
    .service('API', apiConstants)
    .service('UserApiService', UserApiService);