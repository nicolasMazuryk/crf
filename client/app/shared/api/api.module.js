import ngResource from 'angular-resource'
import apiConstants from './api.constants'
import UserApiService from './userApi.service'
import AuthApiService from './authApi.service'
import ResearchApiService from './researchApi.service'
import ClinicApiService from './clinicApi.service'

angular
    .module('api', [ngResource])
    .service('API', apiConstants)
    .service('AuthApiService', AuthApiService)
    .service('UserApiService', UserApiService)
    .service('ResearchApiService', ResearchApiService)
    .service('ClinicApiService', ClinicApiService)