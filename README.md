# CafeAutomation
**Test Approach used**    : BDD Behavioural Driven Development<br />
**Development IDE**		    : Eclipse IDE for Java Developers Version: Oxygen.1a <br />
**Automation Tool**	      : Protractor – It is an end to end test framework for AngularJS applications. It is a wrapper on WedDriver JS                            & Jasmine<br />
**Development Framework**	: Jasmine<br />
**Reports**			          : Jasmine2HtmlReporter<br />
**Other Implementation**	: PageObjectModel & DataDriven approach implemented<br />

## PreRequisite:
1.	Install latest version [Node.js](https://nodejs.org/en/)
2.	Install protractor using node package manager. [Follow the steps](http://www.protractortest.org/#/protractor-setup)
3.	Install Eclipse IDE for Java EE developers. Verify the environment variables properly set for the jdk
4.	Update the WebDriver manager using the command ‘webdriver-manager update’
5.	Install term plugin into Eclipse by adding it from Eclipse Marketplace from help menu.</br>
## Steps to Run the project:
1.	In Eclipse, 
    -	Create a Javascript Project and name the root folder.
    -	Copy the node_module folder (which is originally present in the place where you have installed the node.js. For example:    C:\Users\UserName\AppData\Roaming\npm) and paste is under your Javascript root folder you have created
    -	Convert your project as a ‘tern’ project. Right click the root folder> Configure>Convert to tern project> In modules page, select Jasmine & Protractor>Click OK
2.	Start add your spec files and configuration files in the Project root folder. Spec files are the actual Javascript files consisting the automation code to be performed. Conf.js is the configuration file need to process the spec files.
Follow the below project structure:
    -	Spec files and conf.js files are directly under Project Root folder
    -	Test data  in folder `./TestData/file_name`
    -	Page Objects  in folder `./PageObjects/file_name`
    -	Html report  in `./target_Report_Screenshots/screenshots`

3.	Set up Run configuration for conf.js
    -	Right click on the `conf.js`>Run as>Run configuration> choose new configuration and browse your conf.js file into Protractor config file>Select working directory as root folder> In protractor tab choose the `cli.js` file from node_modules folder and apply.
    -	Save this run configuration with suitable name.
4. To run the project click on the conf.js file and run with the configuration set up created in above step. Note: Only the test scripts given in `specs` element will be run. If you want to run any other test scripts add it in the `specs element in conf.js file`
4.	For reporting purpose, install JasmineHTML2Reporter via npm using command
```
$ npm install protractor-jasmine2-html-reporter --save-dev
```





