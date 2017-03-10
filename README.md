# validation-wrapper
An Angular directive to provide boiler plate reduction when using the built in validation framework. This directive works best when used in conjunction with Bootstrap styling but is also fully customizable.

##Features
- Placement of error message with standard styles based on Angular validation rules.
- Styling of attached add-on element if present.
- Addition of customizable "mandatory" notifier to the label of the validated field.
- Compatible with existing form layouts, handling wrapping correctly.
- Customizable template.

##Requirements
- Angular (1.6.2 was used in development other versions may work)
- jQuery (any version should be fine)
- Bootstrap CSS (version 3 was used in development but any version should be fine)
  - *Note: the directive will still work without Bootrap styles but the validation messages will not have any meaningful styling)*
- A modern browser (old versions of IE may not render correctly)

##Installation
###Bower
```sh
bower install angular-validation-wrapper --save
```
*Note: You should include the files from the dist directory rather than the src directory.*

###Manual
- Download the [latest release](https://github.com/jamesfaceface/validation-wrapper/releases/latest) and unzip it.

##Usage
###References
- Include script references to ```validation-wrapper<.min>.js``` and ```validation-wrapper-template<.min>.js``` in your markup.
  - *Note: If you are using a custom template, you do not need to reference ```validation-wrapper-template<.min>.js```.*
- Include a stylesheet link to ```validation-wrapper<.min>.css``` in your markup. When used in conjunction with Bootstrap, validation messages should appear to the right of labels and should wrap if required.
  - *Note: You do not have to use the styling if you prefer to create your own, especially if you are not using Bootstrap. If this is the case, simply override the styles that you wish to tweak or use whatever ones you like via a custom template.*

###Markup / Script
- Add "validationWrapper" to your angular.module dependencies.
- Wrap the form input block that you wish to validate in ```<validation-wrapper></validation-wrapper>``` tags.
- The label (if present) should be wrapped in ```<label-element></label-element>``` tags and the input block in ```<input-element></input-element>``` tags.
- The directive will add whatever elements you wrap into its tempalte in the appropriate sections. Anything not wrapped correctly will not be rendered.
- Set the ```get-form``` attribute to a function, which returns the form object, containing the field to validate. This is needed because that's where Angular stores its validation objects.
- Set the ```field-name``` attribute to the __name__ of the field that you are validating.
- Set the ```validation-messages``` attribute to an array, containing pairs of validation type and validation message for the field that you are validating. It may be easier to create a function to return these based on the name of the field.

###Custom Template
- If you wish to customize the template, the easiest way is to modify ```validation-wrapper-template.html``` and place it in ```/validation-wrapper/validation-wrapper-template.html```. This is the default location where the directive will look for the template. You can provide a different file all together by setting the ```template-url``` attribute when using the directive.

##[Example](https://plnkr.co/edit/1mR7DcvCjeTK5WLwJgVk?p=preview)
This example shows the validation of an email field, which can be set to required or not. The standard template is used and the form is structured in the Bootstrap style. It also demonstrates how to supply a custom value for the mandatory notifier rather than the default *.
###Markup
```html
<body ng-app="example">
  <script src="https://rawgit.com/jamesfaceface/validation-wrapper/master/dist/validation-wrapper.min.js"></script>
  <script src="https://rawgit.com/jamesfaceface/validation-wrapper/master/dist/validation-wrapper-template.min.js"></script>
  <link href="https://rawgit.com/jamesfaceface/validation-wrapper/master/dist/validation-wrapper.min.css" rel="stylesheet">
  
  <h1>Validation Wrapper Example</h1>
  
  <form name="vm.exampleForm" id="exampleForm" ng-controller="ExampleCtrl as vm">
    <div class="row">
      <div class="form-group col-md-6 col-sm-6">
        <validation-wrapper get-form="vm.getFormObject" field-name="email" validation-messages="vm.getValidationMessages('email')" mandatory-notifier="' (required)'">
          <label-element>
            <input type='checkbox' ng-model="vm.emailRequired"/>
            <label for="email">Email Address</label>
          </label-element>
          <input-element>
            <div class="input-group">
              <span class="input-group-addon" id="email-addon"><i class="fa fa-info"></i></span>
              <input type="email" class="form-control" id="email" aria-describedby="email-addon" ng-model="vm.email" name="email" ng-required="vm.emailRequired">
            </div>
          </input-element>
        </validation-wrapper>
      </div>
    </div>
    <pre style="max-width: 600px;max-height: 350px;overflow:scroll;">{{vm | json}}</pre>
  </form>
</body>
```
###Script
```javascript
angular.module('example', ['validationWrapper']).controller('ExampleCtrl', function($scope) {
  var vm = this;

  vm.emailRequired = true;
  vm.getFormObject = function() {
    return vm.exampleForm;
  };
  var validationMessages = {
    email: [
      {type: "required", message: "Email is required"},
      {type: "email", message: "A valid email is required, e.g. enter the email as myname@mycompany.com"}
    ]
  };
  vm.getValidationMessages = function(fieldName) {
    return validationMessages[fieldName];
  };
});
```
