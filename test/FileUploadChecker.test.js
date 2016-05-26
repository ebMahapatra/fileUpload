'use strict';
let file = window.ebFileUploader.UploadFile;
let config = window.ebFileUploader.config;
let validFileSize = [150, 1000];
let invalidFileSize = [50, 1001, 1000000];
let validFileType = ['application/pdf', 'image/jpeg', 'image/png'];
let invalidFileType = ['image/gif', 'txt'];

//Test cases for validating file size
describe('Validating file attributes', function() {
	it('Validate with valid file size and valid file type and check error message', function() {
		//Looping over the array for valid file sizes
		for (let i = 0; i < validFileSize.length; i++) {
			//Assigning every value in array to size atttribute of file
			file.size = validFileSize[i];
			//Looping over the array for valid file types
			for (let j = 0; j < validFileType.length; j++) {
				//Assigning every value in array to type atttribute of file
				file.type = validFileType[j];
				//creating object of Checker class
				const checker = new window.ebFileUploader.Checker(config);
				console.log(checker);
				//Calling validateFile() to validate
				const validationResult = checker.validateFile(file);
				//Checking file's validity for valid size and type
				expect(validationResult).toBe(true);
				//Checking there exists no error message for valid files
				expect(checker.errors.length).toBe(0);
			}
		}
	});

	it('check for valid file size and invalid file type', function() {
		//Looping over the array for valid file sizes
		for (let i = 0; i < validFileSize.length; i++) {
			//Assigning every value in array to size atttribute of file
			file.size = validFileSize[i];
			//Looping over the array for invalid file types
			for (let j = 0; j < invalidFileType.length; j++) {
				//Assigning every value in array to type atttribute of file
				file.type = invalidFileType[j];
				//creating object of Checker class
				const checker = new window.ebFileUploader.Checker(config);
				//Calling validateFile() to validate
				const validationResult = checker.validateFile(file);
				//Checking file's validity for valid size and type
				expect(validationResult).toBe(false);
				//Validating if correct error message is generated
				expect(checker.errors.length).toBe(1);
			}
		}
	});

	it('check for invalid file size and valid file type', function() {
		for (let i = 0; i < invalidFileSize.length; i++) {
			//Assigning every value in array to size atttribute of file
			file.size = invalidFileSize[i];
			//Looping over the array for invalid file types
			for (let j = 0; j < validFileType.length; j++) {
				//Assigning every value in array to type atttribute of file
				file.type = validFileType[j];
				//creating object of Checker class
				const checker = new window.ebFileUploader.Checker(config);
				//Calling validateFile() to validate
				const validationResult = checker.validateFile(file);
				//Checking file's validity for valid size and type
				expect(validationResult).toBe(false);
				//Validating if correct error message is generated
				expect(checker.errors.length).toBe(1);
			}
		}
	});

	it('check for invalid file size and invalid file type', function() {
		for (let i = 0; i < invalidFileSize.length; i++) {
			//Assigning every value in array to size atttribute of file
			file.size = invalidFileSize[i];
			//Looping over the array for invalid file types
			for (let j = 0; j < invalidFileType.length; j++) {
				//Assigning every value in array to type atttribute of file
				file.type = invalidFileType[j];
				//creating object of Checker class
				const checker = new window.ebFileUploader.Checker(config);
				//Calling validateFile() to validate
				const validationResult = checker.validateFile(file);
				//Checking file's validity for valid size and type
				expect(validationResult).toBe(false);
				//Validating if correct error message is generated
				expect(checker.errors.length).toBe(2);
			}
		}
	});
});
