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
            document.querySelector('img').src = reader.result;
        }
        reader.readAsDataURL(file);
};
