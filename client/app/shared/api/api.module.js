import ngResource from 'angular-resource';
import apiConstants from './api.constants';
import AuthApiService from './authApi.service';
import UserApiService from './userApi.service';

angular
    .module('api', [ngResource])
    .constant('API', apiConstants)
    .service('AuthApiService', AuthApiService)
    .service('UserApiService', UserApiService);