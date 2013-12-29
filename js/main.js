require([
	'jquery',
	'angular',
	'bootstrap',
	'modules/App',
	'routes/index',
	'controllers/index',
	'directives/gender'
],
function ($, angular) {
	angular.element(document).ready(function() {        
        angular.bootstrap(document, ['App']);
    });
});