//Implemented Page Object Model Framework along with Data Driven Approach

//PageObjects used
var UserPage  = new require('./PageObjects/propertiesUser.js');
var LoginPage = new require('./PageObjects/properties_Login.js');
var LogoutPage = new require('./PageObjects/properties_Logout.js');
//Test Data used
var testData = require('./TestData/testdata_invalidDate_TC02.json');
var testDataLogin = require('./TestData/testdata_loginCredentails.json');

describe('Validation of error message when adding employee detail with errorneous Date', function() {    
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
	it('Validating error message for Invalid Date',function(){		
	    
	    var user = new UserPage();		    
	    //Click create button			
	    browser.driver.findElement(By.id('bAdd')).then(function (el) {
		el.click();
	    });    	
		    
	    expect(browser.getCurrentUrl()).toMatch('http://cafetownsend-angular-rails.herokuapp.com/employees/new');
	    user.firstName.sendKeys('Date');
	    user.lastName.sendKeys('Date');
	    user.startDate.sendKeys(data.startDate); 
	    user.eMail.sendKeys('Date@gmail.com');
	    element(by.buttonText('Add')).click();
		    
	    // wait up to 1000ms for alert to pop up to check if Error Alert pops up.
	    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000); 
	    var alertDialog = browser.switchTo().alert();
	    expect(alertDialog.getText()).toContain('Error trying to create a new employee');
	    alertDialog.accept();	  
		    			    
	    expect(user.startDate.getAttribute('class')).toContain('ng-dirty');
	    expect(element(by.model('selectedEmployee.startDate')).getAttribute('title')).toMatch('Please enter a date formatting YYYY-MM-DD');
		    
	    //Validate if Application remains in the same page
	    expect(browser.getCurrentUrl()).toMatch('http://cafetownsend-angular-rails.herokuapp.com/employees/new');
	    	   
	    //Click Cancel button to go back to main menu page			
	    browser.driver.findElement(By.css('.subButton.bCancel')).then(function (el) {
		el.click();
	    });
	});	    	   
    });
    
    it('Logout of Application',function(){		
	//Logout			    
	    var logout = new LogoutPage();
    	    logout.logoutElement.click();	
    });
});	
