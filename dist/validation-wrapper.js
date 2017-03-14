/* validation-wrapper v1.0.76 - 2017-03-14
Copyright (c) 2017 @jamesfaceface (https://github.com/jamesfaceface/validation-wrapper)
Licenses: MIT
*/

var validationWrapperModule = angular.module("validationWrapper", []);

validationWrapperModule.controller("ValidationWrapperCtrl", ["$scope", "$timeout", "$element", function($scope, $timeout, $element) {
	var vm = this;
	var element = $element;
	
	vm.mandatoryNotifier = $scope.mandatoryNotifier || "*";
	vm.fieldName = $scope.fieldName;
	vm.validationMessages = $scope.validationMessages;
	vm.messageDebounce = $scope.messageDebounce || 0;
	vm.formObject = $scope.getForm();
	
	vm.isTouched = false;
	
	vm.shouldShowMessage = function(validationType){
		var show = false;
		
		if(vm.isTouched && vm.formObject[vm.fieldName]){
			if(!validationType){
				show = vm.formObject[vm.fieldName].$invalid;
			}
			else{
				show = vm.formObject[vm.fieldName].$error[validationType];
			}
		}
		
		return show;
	};
	
	$scope.$watch("vm.formObject[vm.fieldName].$touched", function(isTouched) {
		if(isTouched){
			$timeout(function() {
				vm.isTouched = isTouched;
			}, vm.messageDebounce);
		}
		else{
			vm.isTouched = isTouched;
		}
	}, false);
	
	vm.isRequired = function(){
		return element.find("[name='" + vm.fieldName + "']").attr("required") != undefined;
	};
	
	$scope.$watch("vm.isRequired()", function(isRequired){
		// Get the label to add the mandatory notifier to. Need to get it here because it  will not have been transcluded when the control is first called.
		var label = element.find("label[for='" + vm.fieldName + "']");
		
		if(!label.find(".mandatory-notifier").length){
			// First time running so add it
			label.append("<span class='mandatory-notifier'>" + vm.mandatoryNotifier + "</span>");
		}
		
		var mandatoryNotifier = label.find(".mandatory-notifier");
		mandatoryNotifier.toggle(isRequired);
	}, true);
	
	$scope.$watch("vm.shouldShowMessage()", function(invalid) {
		// Get addon to add alert-danger style to on invalid. Needs to be here as the element will not have been transcluded when the control is first called.
		var addOn = element.find(".input-group-addon");
		addOn.toggleClass("alert-danger", invalid);
	}, true);
}]);

validationWrapperModule.directive("validationWrapper", function() {
	return {
		templateUrl: function(element, attributes) {
			return attributes.templateUrl || "validation-wrapper/validation-wrapper-template.html";
		},
		transclude: {
			labelElement: "?labelElement",
			inputElement: "inputElement"
		},
		controller: "ValidationWrapperCtrl",
		scope:
		{
			mandatoryNotifier: "=",
			getForm: "=",
			fieldName: "@",
			validationMessages: "=",
			messageDebounce: "@"
		}
	};
});
