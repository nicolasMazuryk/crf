import ngResource from 'angular-resource';
import apiConstants from './api.constants';
import UserApiService from './userApi.service';
import AuthApiService from './authApi.service';

angular
    .module('api', [ngResource])
    .service('API', apiConstants)
    .service('AuthApiService', AuthApiService)
    .service('UserApiService', UserApiService);