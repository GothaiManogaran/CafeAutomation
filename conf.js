var Jasmine2HtmlReporter = require('protractor-jasmine2-screenshot-reporter');

exports.config = {
    directConnect : true,

    capabilities : {
	'browserName' : 'chrome'
    },

    framework : 'jasmine',

   //specs:['TC01_CreateWorkflow_spec.js'],
  //specs:['TC02_Create_Flow_InvalidDate_spec.js', ],
 // specs:['TC03_DeleteWorkflow_spec.js'],
  //specs:['TC04_UpdateWorkflow_spec.js'],
  //specs:['TC05_Back_Button_Validation_spec.js'],
  //specs:['TC06_LoginPage_Validation_spec.js'],
  specs:['TC07_DoubleClick_spec.js'],
  
   
  /*  specs:['TC01_CreateWorkflow_spec.js','TC02_Create_Flow_InvalidDate_spec.js','TC03_DeleteWorkflow_spec.js',
	'TC04_UpdateWorkflow_spec.js','TC05_Back_Button_Validation_spec.js','TC06_LoginPage_Validation_spec.js',
	'TC07_DoubleClick_spec.js'],*/
    
    jasmineNodeOpts : {
	defaultTimeoutInterval : 90000
    },

    // Jasmine2-screenshot reporter used
    onPrepare : function() {
	browser.driver.manage().window().maximize();
	jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
	    dest : 'target_Reports_Screenshots/screenshots'
	}));
    }

}
