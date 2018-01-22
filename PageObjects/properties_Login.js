
		var LoginInputPage = function()
		{		
		this.userName = element(by.model('user.name'));
		this.password = element(by.model('user.password'));
	
		};
		
		module.exports = LoginInputPage;