/*global define*/
'use strict';
/**
 * Directive that executes an expression when the element it is applied to loses focus.
 */
define(['modules/App'], function (App) {

	App.directive('ngGender', function () {
		var link = function ($scope, element, attrs, localStorage) {

			var text = element.text().toLowerCase();
			var index = attrs.ngIndex;
			if(text == $scope.players[index]['gender'].toLowerCase()) {
				element.addClass('active');
			}

			element.on('click', function() {
				if(!element.hasClass('active')) {
					var text = element.text().toLowerCase();
					var index = element.attr('ng-index');
					element.addClass('active');
					element.siblings().removeClass('active');
					$scope.$apply(function() {
						$scope.player.gender = text;
					});
				}
				
      		});
		};

		return {
			restrict: 'A',
			link: link
		}
	});

});
