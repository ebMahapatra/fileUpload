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
		console.log(e.srcElement);
		//document.getElementById('previewImage').setAttribute('src', e.target.result);
		}
		reader.readAsDataURL(file);
};
