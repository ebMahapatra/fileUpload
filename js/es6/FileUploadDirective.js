(function(global) {
    'use strict';
    global.ebFileUploader = global.ebFileUploader || {};

    // file upload module
    angular.module('eb.fileUpload', [])

    // fileUplDirective used for choose files button
    .directive('fileUplDirective', ['$parse',
        function($parse) {
            function linkFiles(scope, element, attrs) {
                let onChange = $parse(attrs.fileUplDirective);
                element.on('change', function(event) {
                    onChange(scope, {
                        $files: event.target.files
                    });
                });
            };
            return {
                link: linkFiles
            }
        }
    ])

    // controller for eb.fileUpload
    .controller('uploadController', function() {

        // Creating a map to store the list of files to be uploaded
        const filesToUpload = new Map();

        // Function to handle the files selected in the GUI
        this.handleTheFiles = ($files) => {
            
            // Storing namespace properties for config
            const config = global.ebFileUploader.config;

            // Passing config object to Checker class' instance
            const checker = new global.ebFileUploader.Checker(config);

            // Looping over the list of selected files to get information regarding every file
            angular.forEach($files, function(value, key) {
                console.log(value);

                // Passing each selectd file to build file object in UploadFile
                const file = new global.ebFileUploader.BuildFile(value);

                //  Calling validateFile() for file validation and discarding the invalid files so that they are not uploaded
                const validationError = checker.validateFile(file);
                if (validationError.length === 0) {

                    // Storing valid file in filesToUpload
                    filesToUpload.set('file', file.selectedFile)
                   
                    // Generating preview of image files
                   
                    // Checking if file is an image as preview is generated only for image files
                    if (file.type.match(/image.*/)) {
                        const imageSrc = global.ebFileUploader.handleFilePreview(file.selectedFile);
                    } else console.log('No preview available');
                    
                } else {

                    // Handling error messages
                    console.error(validationError);
                }
            });
        };
        
        // Function to upload valid files into the server
        this.upload = () => {
        global.ebFileUploader.upload(filesToUpload);
        };
    });

})(this);
