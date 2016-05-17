'use strict';
/**
* Handles previews for image files
*
*/
let dataURL = '';
let filePreview = '';

let handleFilePreview = function(file) {
		var reader = new FileReader();
		reader.onload = function(e) {
		dataURL = reader.result;
		console.log(dataURL);
		}
		reader.readAsDataURL(file);
};
