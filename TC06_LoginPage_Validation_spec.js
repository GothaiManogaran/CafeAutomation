// Implementation of Page Object model & DataDriven used inside program for validation

//PageObjects used
var UserPage  = new require('./PageObjects/propertiesUser.js');
var LoginPage = new require('./PageObjects/properties_Login.js');
var LogoutPage = new require('./PageObjects/properties_Logout.js');

//Test Data used
var testDataLogin = require('./TestData/testdata_loginCredentails.json');

describe('Validating the elements in the Login Page', function(){    
    testDataLogin.forEach( function(dataLogin) {
    	it('Login to Application',function(){
	
    	    	var login = new LoginPage();
    	    	//Login to the Application	
    	    	browser.get('http://cafetownsend-angular-rails.herokuapp.com/');
    	    	
    	    	//validate for erroneous credentials; Type in an incorrect Credentials
    	    	login.userName.sendKeys('IncorrectUserName'); 
	    	login.password.sendKeys('IncorrectPassword');
	    	element(by.buttonText('Login')).click();
	    	var errorMsg = element(by.css('[ng-show="showMessage()"]'));
	    	expect(errorMsg.getText()).toEqual('Invalid username or password!');
	    	
    	    	//Validate for Valid Credential
    	    	login.userName.clear().sendKeys(dataLogin.username); 
    	    	login.password.clear().sendKeys(dataLogin.password);
    	    	element(by.buttonText('Login')).click();
	    
    	    	//Validate if expected page is launched
    	    	expect(browser.getCurrentUrl()).toMatch('http://cafetownsend-angular-rails.herokuapp.com/employees');	
    	});    
	
 	it('Validation of Employee List page contents',function(){		
 	    var user = new UserPage(); 	    	
	    var loggedUserName=dataLogin.username;
	    var greetings = element(by.id('greetings'));
	    var createButton = element(by.id('bAdd'));
	    var editButton = element(by.id('bEdit'));
	    var deleteButton = element(by.id('bDelete'));
	    var logoutButton = element(by.css('[ng-click="logout()"]'));	    	
	    	
	    //Validation in Employee Page
	    
	    	//Validate Greetings Text 	    	
	    	expect(greetings.getText()).toEqual('Hello '+loggedUserName);
	    	
	    	//Validate display text of Create, Edit, Delete and Logout buttons
	    	expect(createButton.getText()).toEqual('Create');
	    	expect(editButton.getText()).toEqual('Edit');
	    	expect(deleteButton.getText()).toEqual('Delete');
	    	expect(logoutButton.getText()).toEqual('Logout');    	
	    	
	    	//Validate Create button should be enabled but Edit & Delete button should be disabled
	    	expect(createButton.getAttribute('class')).toMatch('subButton');    	
	    	expect(editButton.getAttribute('class')).toMatch('subButton disabled');	    	
	    	expect(deleteButton.getAttribute('class')).toMatch('subButton disabled');
	    	
	    	//Click any employee and check if Edit & Delete employees are enabled
	    	user.employeeRepeater.first().click();
	    	expect(editButton.getAttribute('class')).toMatch('subButton');	    	
	    	expect(deleteButton.getAttribute('class')).toMatch('subButton');
	    		
	    //Validation in Employee Details Page
	    		
	    	//Click Edit button			
		browser.driver.findElement(By.id('bEdit')).then(function (el) {
		    el.click();
		});
		var backButton = element(by.css('[ng-click="browseToOverview()"]'));
		var updateButton = element(by.buttonText('Update'));
		var deleteButton = element(by.css('[ng-click="deleteEmployee()"]'));
			 
		//Validate display text of Back,Update&Delete
		expect(backButton.getText()).toEqual('Back');
		expect(updateButton.getText()).toEqual('Update');
		expect(deleteButton.getText()).toEqual('Delete');	    	
 	}); 	
    });
    
	it('Logout from Application',function(){		
		//Logout			    
    	    	var logout = new LogoutPage();
    	    	logout.logoutElement.click();		
    	});		
});	
