/*Uploads valid files into the server*/
(function (global) {
    'use strict';

    /** @function upload 
    * Uploads files
    */
    let upload = function(formData, $http) {
        // Creating upload request    
        /** @constant
            @type {object}
            @default
        */
        const request={
            method: 'POST'
            , url: 'http://localhost:8080/upload'
            , data: formData
            , headers: {
                'Content-Type': undefined
            }
        };

        // sending files         
        $http(request).then(function(response) {
            // success callback
            console.log('success: ' + response.data);
        } 
        , function(reason) {
            // failure callback
            console.log('failure' + reason.data);
        });
    }; 
    global.ebFileUploader = global.ebFileUploader || {};
    global.ebFileUploader.upload = upload;

})(this);
/*let cancelUpload = function(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.abort(); 
}*/
