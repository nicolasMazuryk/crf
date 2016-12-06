import selectDirective from './select.directive'

angular
    .module('directives', [])
    .directive('customSelect', selectDirective.createInstance)