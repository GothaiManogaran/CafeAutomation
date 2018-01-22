// Implementation of only Page Object model & Raw Data used inside program for validation

//PageObjects used
var UserPage  = new require('./PageObjects/propertiesUser.js');
var LoginPage = new require('./PageObjects/properties_Login.js');
var LogoutPage = new require('./PageObjects/properties_Logout.js');

//Test Data used
var testDataLogin = require('./TestData/testdata_loginCredentails.json');
var testData = require('./TestData/testdata_Back_TC05.json');

describe('Validating of modified Employee data if UDPATE button is not clicked', function(){
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
 	it('Validation in Employee List Page: Updated employee data should not get saved if BACK button is selected without hitting UPDATE',function(){	
		
	    var user = new UserPage(); 			    
	    //Click create button			
	    browser.driver.findElement(By.id('bAdd')).then(function (el) {
		el.click();
	    });			    
	    expect(browser.getCurrentUrl()).toMatch('http://cafetownsend-angular-rails.herokuapp.com/employees/new');
		
	    //Feed in a Unique data which is not in the list already	    	
	    user.firstName.sendKeys(data.firstName);
	    user.lastName.sendKeys(data.lastName);
	    user.startDate.sendKeys(data.startDate); 
	    user.eMail.sendKeys(data.emailID);
	    element(by.buttonText('Add')).click(); 
			    
	    //Validate if the employee is added correctly to the list
	    var nameBeforeUpdate =data.fullName;			    			    
	    var empList = user.employeeRepeater.filter(function(elem, index) {
		return elem.getText().then(function(text) {
		    return text === nameBeforeUpdate;
		});
	    });
		
	    //Select the Employee name to be updated
	    empList.first().click();

	    //Click Edit button			
	    browser.driver.findElement(By.id('bEdit')).then(function (el) {
		el.click();
	    });		
	    
	    //Update the firstName and lastName with new values
	    user.firstName.clear().sendKeys(data.updatedFirstName); 
	    user.lastName.clear().sendKeys(data.updatedLastName);
		 
	    var nameAfterEdit =data.updatedFullName;
			 
	    //Click Back button without hitting update button			
	    browser.driver.findElement(By.css('.subButton.bBack')).then(function (el) {
		el.click();
	    });
		 
	    var empList2 = user.employeeRepeater.filter(function(elem, index) {
		return elem.getText().then(function(text) {
		    return text === nameBeforeUpdate;
		});
	    });
		 
	    //Validation in 'Employee List' Page, to check the editing does not have any effect
	    expect(empList2.first().getText()).not.toEqual(nameAfterEdit);		 
	    console.log('Employee name does not get updated by selecting back button and without selecting Update button');
	    
	    
 	});
 	
 	it('Validation in Employee Details Page: Updated employee data should not get saved if BACK button is selected without hitting UPDATE',function(){	
		
	    //Validation in 'Employee Details' Page, if the Employee name remains same as before update
 	    var user = new UserPage(); 
 	    var nameBeforeUpdate =data.fullName;
 	    var empList2 = user.employeeRepeater.filter(function(elem, index) {
		return elem.getText().then(function(text) {
		    return text === nameBeforeUpdate;
		});
	    });
	    empList2.first().click();
	    //Click Edit button			
	    browser.driver.findElement(By.id('bEdit')).then(function (el) {
		el.click();
	    });

	    try{
		 
		 expect(element(by.model('selectedEmployee.firstName')).getAttribute('value')).toEqual(data.firstName);
		 expect(element(by.model('selectedEmployee.lastName')).getAttribute('value')).toEqual(data.lastName);

	    }
	    catch(err){
		 console.log('Unexpected Result, Though the new update not saved in Employee page, it remains in Employee list page');
	    }		
	});	
    });
    
	it('Logout from Application',function(){		
		//Logout			    
    	    var logout = new LogoutPage();
    	    logout.logoutElement.click();		
    	});
		
});	
