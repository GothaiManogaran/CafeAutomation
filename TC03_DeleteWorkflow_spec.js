// Implementation of both Page Object model & Data Driven in the validation of DELETE workflow

//PageObjects used
var UserPage  = new require('./PageObjects/propertiesUser.js');
var LoginPage = new require('./PageObjects/properties_Login.js');
var LogoutPage = new require('./PageObjects/properties_Logout.js');

//Test Data used
var testDataLogin = require('./TestData/testdata_loginCredentails.json');
var testData = require('./TestData/testdata_delete_TC03.json');

describe('Validating the Delete workflow to check if set of Employee details can be deleted', function(){
    testDataLogin.forEach( function(dataLogin) {
	it('Login to Application',function() {
		    
	    var login = new LoginPage();
	    //Login to the Application		
	    browser.get('http://cafetownsend-angular-rails.herokuapp.com/');		    
	    login.userName.clear().sendKeys(dataLogin.username); 
	    login.password.clear().sendKeys(dataLogin.password);
	    element(by.buttonText('Login')).click();
			    
	    //Validate if expected page is launched
	    expect(browser.getCurrentUrl()).toMatch('http://cafetownsend-angular-rails.herokuapp.com/employees');
	});
    });
    
	
    testData.forEach( function(data) {
	it('Employee data should get deleted from the Employee list by clicking DELETE button',function(){	
		
	    var user = new UserPage(); 			    
	    var fullName= data.fullName;		
	    var empList = user.employeeRepeater.filter(function(elem, index) {
		return elem.getText().then(function(text) {
		    return text === fullName;
		});
	    });		
	    empList.first().click();			    
				
	    //Click Delete button			
	    browser.driver.findElement(By.id('bDelete')).then(function (el) {
		el.click();
	    }); 	    
		 
	    //Check if the employee has been deleted from the list
	    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);
	    browser.switchTo().alert().accept(); 
	    console.log('Employee '+fullName+' deleted successfully from the list');
	});		
    });
	
    	it('Logout from Application',function(){		
    	    //Logout			    
    	    var logout = new LogoutPage();
    	    logout.logoutElement.click();		
    	});		
});	
