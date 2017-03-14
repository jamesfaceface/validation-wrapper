/* validation-wrapper v1.0.78 - 2017-03-14
Copyright (c) 2017 @jamesfaceface (https://github.com/jamesfaceface/validation-wrapper)
Licenses: MIT
*/

angular.module('validationWrapper').run(['$templateCache', function($templateCache) {
	$templateCache.put('validation-wrapper/validation-wrapper-template.html',
		'<div ng-controller="ValidationWrapperCtrl as vm"><div class="validation-message-label"><div class="validation-message-label-element" ng-show="!vm.labelMissing"><ng-transclude ng-transclude-slot="labelElement"><span style="display: none;">{{vm.labelMissing=true}}</span></ng-transclude></div><!--Space is required for justification based alignment to work-->		<!--End space--><div class="alert alert-danger validation-message field-validation-error" data-valmsg-for="{{vm.fieldName}}" data-valmsg-replace="true" ng-show="vm.shouldShowMessage()"><span ng-repeat="validationMessage in vm.validationMessages" ng-show="vm.shouldShowMessage(validationMessage.type)">{{validationMessage.message}}</span></div></div><ng-transclude ng-transclude-slot="inputElement"></ng-transclude></div>'
	);
}]);
