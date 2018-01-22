// Implementation of both Page Object model & Data Driven in the validation of CREATE workflow

//PageObjects used
var UserPage  = new require('./PageObjects/propertiesUser.js');
var LoginPage = new require('./PageObjects/properties_Login.js');
var LogoutPage = new require('./PageObjects/properties_Logout.js');

//Test Data used
var testDataLogin = require('./TestData/testdata_loginCredentails.json');
var testData = require('./TestData/testdata_create_TC01.json');


describe('Validating the Create workflow to check if set of Employee details can be added', function(){
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
	it('Employee data should get added to the Employee list when ADD button is clicked',function(){	
		
	    var user = new UserPage(); 			    
	    //Click create button			
	    browser.driver.findElement(By.id('bAdd')).then(function (el) {
		el.click();
	    });  			    
	    expect(browser.getCurrentUrl()).toMatch('http://cafetownsend-angular-rails.herokuapp.com/employees/new');
			    	
	    user.firstName.sendKeys(data.firstName); 
	    user.lastName.sendKeys(data.lastName);
	    user.startDate.sendKeys(data.startDate); 
	    user.eMail.sendKeys(data.emailID);
	    element(by.buttonText('Add')).click();
			    
	    //Validate if the employee is added correctly to the list			    
	    var fullName= data.fullName;
	    var empList = user.employeeRepeater.filter(function(elem, index) {
		return elem.getText().then(function(text) {
		    return text === fullName;
		});
	    });
	    empList.first().click();			    
	    expect(empList.first().getText()).toEqual(fullName);
	    console.log('Employee '+fullName+' added successfully to the list');
	});		
    });
	
    	it('Logout of Application',function(){		
    	    //Logout
    	    var logout = new LogoutPage();
    	    logout.logoutElement.click();
    	});		
});	
