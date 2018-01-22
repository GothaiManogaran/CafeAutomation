// Implementation of Page Object model & DataDriven used inside program for validation

//PageObjects used
var UserPage  = new require('./PageObjects/propertiesUser.js');
var LoginPage = new require('./PageObjects/properties_Login.js');
var LogoutPage = new require('./PageObjects/properties_Logout.js');

//Test Data used
var testDataLogin = require('./TestData/testdata_loginCredentails.json');

describe('Validating if double clicking an Employee name navigate to the Employee detail page', function(){    
    testDataLogin.forEach( function(dataLogin) {
    	it('Double clicking on an employee name displays the Employee detail page',function(){
	
    	    	var login = new LoginPage();
    	    	var user = new UserPage();
    	    	var logout = new LogoutPage();
    	    
    	    	//Login to the Application	
    	    	browser.get('http://cafetownsend-angular-rails.herokuapp.com/');    	    	
    	    	login.userName.clear().sendKeys(dataLogin.username); 
    	    	login.password.clear().sendKeys(dataLogin.password);
    	    	element(by.buttonText('Login')).click();
	    
    	    	//Validate if expected page is launched
    	    	expect(browser.getCurrentUrl()).toMatch('http://cafetownsend-angular-rails.herokuapp.com/employees');
    	    	
    	    	//Double click the first employee in the list 
    	    	browser.actions().doubleClick(user.employeeRepeaterFirst).perform();
    	    	
    	    	//Validate if it navigates the employee detail page
    	    	expect(browser.getCurrentUrl()).toContain('http://cafetownsend-angular-rails.herokuapp.com/employees/');
    	    	expect(browser.getCurrentUrl()).toContain('/edit');
    	    	
    	    	//Validate if the Employee detail page as Back,Update&Delete button
		var backButton = element(by.css('[ng-click="browseToOverview()"]'));
		var updateButton = element(by.buttonText('Update'));
		var deleteButton = element(by.css('[ng-click="deleteEmployee()"]'));
			 
		//Validate display text of Back,Update&Delete
		expect(backButton.getText()).toEqual('Back');
		expect(updateButton.getText()).toEqual('Update');
		expect(deleteButton.getText()).toEqual('Delete');
		
		//Validate the fields firstname, lastname, startdate & email is present
		expect(user.firstName.isDisplayed()).toEqual(true);
		expect(user.lastName.isDisplayed()).toEqual(true); 
		expect(user.startDate.isDisplayed()).toEqual(true); 
		expect(user.eMail.isDisplayed()).toEqual(true); 
		
		//Logout  
    	    	logout.logoutElement.click();		
    	});
    });
});	
