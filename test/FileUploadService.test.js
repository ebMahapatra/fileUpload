// Test case for validating upload service

const upload = window.ebFileUploader.upload;
const fileToUpload = new Map();
fileToUpload.set('file', './test/testFiles/download-min.png');

describe('Checking file upload service', function() {
	it('check if file uploads', function() {
		const spy = sinon.spy(upload(fileToUpload));
		console.log(spy.callCount);

	});
});

