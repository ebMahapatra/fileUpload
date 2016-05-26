/*Handles previews for valid image files*/
(function() {
    'use strict';
    //let dataURL = '';
	//let filePreview = '';

    /** @function handleFilePreview 
    * Handles preview for every image file
    */
	let handleFilePreview = function(file) {	
        /** @constant
            @type {object}
            @default
        */
        const reader = new FileReader();
        /** @function onload 
        * onload method of file reader
        */
        reader.onload = function(e) {
            document.querySelector('img').src = reader.result;
        }
        reader.readAsDataURL(file);
	};
    window.ebFileUploader = window.ebFileUploader || {};
    window.ebFileUploader.handleFilePreview = handleFilePreview;
})(this);


