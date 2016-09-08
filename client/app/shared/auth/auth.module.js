import ngResource from 'angular-resource';
import apiConstants from '../api/api.constants';
import AuthApiService from './authApi.service';

angular
    .module('auth', [ngResource])
    .service('AuthApiService', AuthApiService);