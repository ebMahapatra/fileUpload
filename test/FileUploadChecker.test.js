'use strict';
//let file = global.ebFileUploader.UploadFile;
//console.log(global.file);
const config = global.ebFileUploader.config;
const validFileSize = [150, 1000];
const invalidFileSize = [50, 1001, 1000000];
const validFileType = ['application/pdf', 'image/jpeg', 'image/png'];
const invalidFileType = ['txt'];

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
				const checker = new global.ebFileUploader.Checker(config);
				//Calling validateFile() to validate file with valid size and type
				expect(checker.validateFile(file).length).toEqual(0);
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
				const checker = new global.ebFileUploader.Checker(config);
				//Calling validateFile() to validate file with valid size and invalid type
				expect(checker.validateFile(file).length).not.toBe(0);
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
				const checker = new global.ebFileUploader.Checker(config);
				//Calling validateFile() to validate file with invalid size and valid type
				//expect(checker.validateFile(file)).toBe(1);
				expect(checker.validateFile(file).length).not.toBe(0);
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
				const checker = new global.ebFileUploader.Checker(config);
				//Calling validateFile() to validate file with invalid size and intype
				expect(checker.validateFile(file).length).toBeGreaterThan(1);
			}
		}
	});
});
