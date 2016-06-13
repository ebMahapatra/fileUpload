/*Uploads valid files into the server*/
(function (global) {
    'use strict';

    // Uploads files
    let upload = function(filesToUpload) {
        const formData = new FormData();
        formData.append('file' , filesToUpload.get('file'));
       
        // Creating upload request  
        fetch('/upload', {
            method: 'POST'
            , body: formData
            /*, headers: {
                'Content-Type': 'multipart/form-data'
            }*/
        })
        .then (processStatus);
    }

    let processStatus = function (response) {
        if (response.status === 200) {
            console.log('File is successfully uploaded');
        } else {
            console.error(response.statusText);
        }   
    };
    
    global.ebFileUploader = global.ebFileUploader || {};
    global.ebFileUploader.upload = upload;

})(this);
