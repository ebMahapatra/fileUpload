'use strict';
let file = window.ebFileUploader.UploadFile;
let config = window.ebFileUploader.config;
let validFileSize = [100, 150, 1000];
let invalidFileSize = [50, 1001, 1000000];
let validFileType = ['application/pdf', 'image/jpeg', 'image/png'];
let invalidFileType = ['image/gif', 'txt'];


//Test cases for validating file size
describe('Validating file attributes', function() {
	it('check file size greater than minimum value specified in config', function() {
		for (let i = 0; i < validFileSize.length; i++) {
			file.size = validFileSize[i];
		}
		for (let i = 0; i < validFileType.length; i++) {
			file.type = validFileType[i];
		}
		let validationResult = window.ebFileUploader.fileValidator(file,config);
		expect(validationResult.isValidFile).toBe(true);
	});

	it('check file size not less than minimum value specified in config', function() {
		for (let i = 0; i < invalidFileSize.length; i++) {
			file.size = invalidFileSize[i];
		}
		for (let i = 0; i < validFileType.length; i++) {
			file.type = validFileType[i];
		}
		let validationResult = window.ebFileUploader.fileValidator(file,config);
		expect(validationResult.isValidFile).toBe(false);
	});

	it('check file size equal to maximum value specified in config', function() {
		for (let i = 0; i < validFileSize.length; i++) {
			file.size = validFileSize[i];
		}
		for (let i = 0; i < validFileType.length; i++) {
			file.type = validFileType[i];
		}
		let validationResult = window.ebFileUploader.fileValidator(file,config);
		expect(validationResult.isValidFile).toBe(true);
	});

	it('check file size <= maximum value specified in config', function() {
		for (let i = 0; i < invalidFileSize.length; i++) {
			file.size = invalidFileSize[i];
		}
		for (let i = 0; i < validFileType.length; i++) {
			file.type = validFileType[i];
		}
		let validationResult = window.ebFileUploader.fileValidator(file,config);
		expect(validationResult.isValidFile).toBe(false);
	});

	it('check pdf, image/jpeg and image/png are the only valid file types', function() {
		for (let i = 0; i < validFileSize.length; i++) {
			file.size = validFileSize[i];
		}
		for (let i = 0; i < validFileType.length; i++) {
			file.type = validFileType[i];
		}
		let validationResult = window.ebFileUploader.fileValidator(file,config);
		expect(validationResult.isValidFile).toBe(true);

	});

	it('check with valid file size and invalid file type', function() {
		for (let i = 0; i < validFileSize.length; i++) {
			file.size = validFileSize[i];
		}
		for (let i = 0; i < invalidFileType.length; i++) {
			file.type = invalidFileType[i];
		}
		let validationResult = window.ebFileUploader.fileValidator(file,config);
		expect(validationResult.isValidFile).toBe(false);

	});

	it('check with invalid file size and valid file type', function() {
		for (let i = 0; i < invalidFileSize.length; i++) {
			file.size = invalidFileSize[i];
		}
		for (let i = 0; i < validFileType.length; i++) {
			file.type = validFileType[i];
		}
		let validationResult = window.ebFileUploader.fileValidator(file,config);
		expect(validationResult.isValidFile).toBe(false);

	});

	it('check with invalid file size and invalid file type', function() {
		for (let i = 0; i < invalidFileSize.length; i++) {
			file.size = invalidFileSize[i];
		}
		for (let i = 0; i < invalidFileType.length; i++) {
			file.type = invalidFileType[i];
		}
		let validationResult = window.ebFileUploader.fileValidator(file,config);
		expect(validationResult.isValidFile).toBe(false);

	});

	it('check error message for valid file size and invalid file type', function() {
		for (let i = 0; i < validFileSize.length; i++) {
			file.size = validFileSize[i];
		}
		for (let i = 0; i < invalidFileType.length; i++) {
			file.type = invalidFileType[i];
		}
		let validationResult = window.ebFileUploader.fileValidator(file,config);
		expect(validationResult.errMsg[0]).toBe('Invalid file type');

	});

	it('check error message for invalid file size and valid file type ', function() {
		for (let i = 0; i < invalidFileSize.length; i++) {
			file.size = invalidFileSize[i];
		}
		for (let i = 0; i < validFileType.length; i++) {
			file.type = validFileType[i];
		}
		let validationResult = window.ebFileUploader.fileValidator(file,config);
		expect(validationResult.errMsg[0]).toBe('Invalid file size');

	});

	it('check error message for invalid file size and invalid file type', function() {
		for (let i = 0; i < invalidFileSize.length; i++) {
			file.size = invalidFileSize[i];
		}
		for (let i = 0; i < invalidFileType.length; i++) {
			file.type = invalidFileType[i];
		}
		let validationResult = window.ebFileUploader.fileValidator(file,config);
		expect(validationResult.errMsg[0]).toBe('Invalid file size');
		expect(validationResult.errMsg[1]).toBe('Invalid file type');

	});

	it('check if error message exists for valid file type and valid file size', function() {
		for (let i = 0; i < validFileSize.length; i++) {
			file.size = validFileSize[i];
		}
		for (let i = 0; i < validFileType.length; i++) {
			file.type = validFileType[i];
		}
		let validationResult = window.ebFileUploader.fileValidator(file,config);
		expect(validationResult.errMsg.length).toBe(0);

	});
});
