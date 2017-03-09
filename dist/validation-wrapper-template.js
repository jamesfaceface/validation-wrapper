/* validation-wrapper v1.0.62 - 2017-03-09
Copyright (c) 2017 @jamesfaceface (https://github.com/jamesfaceface/validation-wrapper)
Licenses: MIT
*/

angular.module('validationWrapper').run(['$templateCache', function($templateCache) {
	$templateCache.put('validation-wrapper/validation-wrapper-template.html',
		'<div ng-controller="ValidationWrapperCtrl as vm">	<div class="validation-message-label">		<ng-transclude ng-transclude-slot="labelElement"></ng-transclude>		<div class="alert alert-danger pull-right validation-message field-validation-error"			data-valmsg-for="{{vm.fieldName}}"			data-valmsg-replace="true"			ng-show="vm.shouldShowMessage()">			<span ng-repeat="validationMessage in vm.validationMessages" ng-show="vm.shouldShowMessage(validationMessage.type)">{{validationMessage.message}}</span>		</div>	</div>	<div class="validation-message-clearfix">		<ng-transclude ng-transclude-slot="inputElement"></ng-transclude>	</div></div>'
	);
}]);
