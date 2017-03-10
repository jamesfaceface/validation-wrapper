/* validation-wrapper v1.0.70 - 2017-03-10
Copyright (c) 2017 @jamesfaceface (https://github.com/jamesfaceface/validation-wrapper)
Licenses: MIT
*/

var validationWrapperModule = angular.module("validationWrapper", []);

validationWrapperModule.controller("ValidationWrapperCtrl", ["$scope", "$element", function($scope, $element) {
	var vm = this;
	var element = $element;
	
	vm.mandatoryNotifier = $scope.mandatoryNotifier || "*";
	vm.fieldName = $scope.fieldName;
	vm.validationMessages = $scope.validationMessages;
	vm.formObject = $scope.getForm();
	
	vm.shouldShowMessage = function(validationType){
		var show = false;
		
		if(vm.formObject[vm.fieldName]){
			if(!validationType){
				show = vm.formObject[vm.fieldName].$touched && vm.formObject[vm.fieldName].$invalid;
			}
			else{
				show = vm.formObject[vm.fieldName].$error[validationType];
			}
		}
		
		return show;
	};
	
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
			validationMessages: "="
		}
	};
});
