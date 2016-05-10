'use strict';
var checker=require('../js/FileUploadChecker.js');
var config=require('../js/FileUploadCheckConfig.js');
var fileuploadFile=require('../js/FileUploadFile.js');

//Test cases for validating file size
describe('Validating file attributes', function() {
	it('check file size greater than minimum value specified in config', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 150; //file size
		file.type = 'pdf'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.isValidFile).toBe(true);
	});

	it('check file size not less than minimum value specified in config', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 50; //file size
		file.type = 'pdf'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.isValidFile).toBe(false);
	});

	it('check file size equal to maximum value specified in config', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 1000; //file size
		file.type = 'pdf'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.isValidFile).toBe(true);
	});

	it('check file size <= maximum value specified in config', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 1001; //file size
		file.type = 'pdf'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.isValidFile).toBe(false);
	});

	it('check file size equal not greater than maximum value specified in config', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 100000; //file size
		file.type = 'pdf'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.isValidFile).toBe(false);
	});

	it('check pdf as valid file type', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 110; //file size
		file.type = 'pdf'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.isValidFile).toBe(true);

	});

	it('check image/jpeg as valid file type', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 110; //file size
		file.type = 'image/jpeg'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.isValidFile).toBe(true);

	});

	it('check image/png as valid file type', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 110; //file size
		file.type = 'image/png'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.isValidFile).toBe(true);

	});

	it('check with valid file size and invalid file type', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 110; //file size
		file.type = 'image/gif'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.isValidFile).toBe(false);

	});

	it('check with invalid file size and valid file type', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 1000000; //file size
		file.type = 'pdf'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.isValidFile).toBe(false);

	});

	it('check with invalid file size and invalid file type', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 1000000; //file size
		file.type = 'txt'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.isValidFile).toBe(false);

	});

	it('check error message for valid file size and invalid file type', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 110; //file size
		file.type = 'image/gif'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.errMsg[0]).toBe('Invalid file type');

	});

	it('check error message for valid file type and invalid file size', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 1000000; //file size
		file.type = 'pdf'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.errMsg[0]).toBe('Invalid file size');

	});

	it('check error message for invalid file type and invalid file size', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 1000000; //file size
		file.type = 'txt'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.errMsg[0]).toBe('Invalid file size');
		expect(validationResult.errMsg[1]).toBe('Invalid file type');

	});

	it('check if error exists message for valid file type and valid file size', function() {
		var file = new fileuploadFile.uploadFile();
		file.size = 150; //file size
		file.type = 'pdf'; //file type
		var validationResult=checker.check(file,config);
		expect(validationResult.errMsg.length).toBe(0);

	});
	
});
