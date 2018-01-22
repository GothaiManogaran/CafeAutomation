
		var UserInputPage = function()
		{		
		this.firstName = element(by.model('selectedEmployee.firstName'));
		this.lastName = element(by.model('selectedEmployee.lastName'));
		this.startDate = element(by.model('selectedEmployee.startDate'));
		this.eMail = element(by.model('selectedEmployee.email'));
		this.employeeRepeater = element.all(by.repeater('employee in employees'));
		this.employeeRepeaterFirst = element.all(by.repeater('employee in employees')).first();
		
		};
		
		module.exports = UserInputPage;