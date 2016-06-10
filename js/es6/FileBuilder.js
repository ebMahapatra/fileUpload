// Builds file object in UploadFile by assigning values from selected file
(function(global) {
    'use strict';

    class BuildFile {
        constructor(selectedFile) {
            
            // Storing namespace properties for config
            const file = global.ebFileUploader.UploadFile;
            
            // Storing each file in selectedFile property of uploadFile()
            file.selectedFile = selectedFile;
                   
            // Assigning selected file's size to 'size' property of uploadFile()
            file.size = selectedFile.size;
                   
            // Assigning selected file's type to 'type' property of uploadFile()
            file.type = selectedFile.type;
            return file;
        };
    }

    global.ebFileUploader = global.ebFileUploader || {};
    global.ebFileUploader.BuildFile = BuildFile;
})(this);
