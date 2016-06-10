// Handles previews for valid image files
(function(global) {
    'use strict';
    /**
     * Handles preview for every image file
     * @param  {UploadFile} file - image file
     * @return image src
     */
    const handleFilePreview = function(file) {
        const reader = new FileReader();
        reader.onload = (event) => {

            // onload method of file reader
            document.querySelector('img').src = reader.result;
        }
        reader.readAsDataURL(file);
    };
    global.ebFileUploader = global.ebFileUploader || {};
    global.ebFileUploader.handleFilePreview = handleFilePreview;
})(this);
