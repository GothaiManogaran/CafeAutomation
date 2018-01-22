// Implementation of both Page Object model & Data Driven in the validation of EDIT workflow

//PageObjects used
var UserPage  = new require('./PageObjects/propertiesUser.js');
var LoginPage = new require('./PageObjects/properties_Login.js');
var LogoutPage = new require('./PageObjects/properties_Logout.js');

//Test Data used
var testDataLogin = require('./TestData/testdata_loginCredentails.json');
var testData = require('./TestData/testdata_update_TC04.json');

describe('Validating the EDIT workflow to check if set of Employee details can be updated', function(){
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
	it('Employee data should get Updated in the Employee list when clicking UPDATE button',function(){	
		
	    var user = new UserPage();			    
	    var fullName=data.fullName;			    			    
	    var empList = user.employeeRepeater.filter(function(elem, index) {
		return elem.getText().then(function(text) {
		    return text === fullName;
		});
	    });		
	    expect(empList.first().getText()).toEqual(fullName);
		
	    //Select the Employee name to be updated
	    empList.first().click();

	    //Click Edit button			
	    browser.driver.findElement(By.id('bEdit')).then(function (el) {
		el.click();
	    });
		
	    user.firstName.clear().sendKeys(data.firstName); 
	    user.lastName.clear().sendKeys(data.lastName);
	    user.startDate.clear().sendKeys(data.startDate); 
	    user.eMail.clear().sendKeys(data.emailID);
	    element(by.buttonText('Update')).click();
	    console.log('Employee '+fullName+' Updated successfully in the list');
	});		
    });
	
    	it('Logout from Application',function(){		
    	    //Logout			    
    	    var logout = new LogoutPage();
    	    logout.logoutElement.click();		
    	});
		
});	
