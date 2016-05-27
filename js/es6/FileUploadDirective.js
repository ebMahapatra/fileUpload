'use strict';
window.ebFileUploader = window.ebFileUploader || {};
//file upload module
angular.module('eb.fileUpload', [])
    //fileUplDirective used for choose files button
    .directive('fileUplDirective', ['$parse', function ($parse) { 
        function linkFiles(scope, element, attrs){
            let onChange = $parse(attrs.fileUplDirective);
            element.on('change', function (event) {
                onChange(scope, { $files: event.target.files }
                        );
            });
        };
        return {
            link:linkFiles
        }
    }])
    //controller for eb.fileUpload
    .controller('uploadController', function($http){
        /** @constant
        */
        const vm = this;
        const formData = new FormData();
        /** @function getErrorMessage 
        * Handles the error messages
        */
        let getErrorMessages = function(error) {
            /** @constant
                @type {array}
                @default
            */
            const errorMessages = [];
            errorMessages.push(error);
            console.error(errorMessages);
        }

        /** @function getTheFiles 
        * Gets the files selected in the UI to be uploaded
        */
        vm.getTheFiles = function ($files){
            //Storing namespace properties for UploadFile and config
            /** @constant
                @type {UploadFile}
                @default
            */
            const file = window.ebFileUploader.UploadFile;

            /** @constant
                    @type {config}
                    @default
            */
            const config = window.ebFileUploader.config;

            //Passing config object to Checker class' instance
            /** @constant
                @default
            */
            const checker = new window.ebFileUploader.Checker(config);

            //Looping over the list of selected files to get information regarding every file
            angular.forEach($files, function(value, key){   
                //Storing each file in rawFile property of uploadFile()
                file.rawFile = value;
                //Assigning selected file's size to 'size' property of uploadFile()
                file.size = value.size;
                //Assigning selected file's type to 'type' property of uploadFile()
                file.type = value.type;
                
                // Calling validateFile() for file validation and discarding the invalid files so that they are not uploaded
                const validationError = checker.validateFile(file);
                if (validationError.length === 0) {
                    //Generating preview of image files
                    //Checking if file is an image as preview is generated only for image files
                    if (file.type.match(/image.*/)) {
                        const imageSrc = window.ebFileUploader.handleFilePreview(file.rawFile);
                    }

                    //Storing valid file in formData
                    formData.append('file', file.rawFile);
                   
                    /** @function upload 
                    * Uploads valid files
                    */
                    vm.upload = function(){
                        window.ebFileUploader.upload(formData, $http);
                    }
                    //Cancelling file upload process
                    /*vm.cancelUpload=function(){
                        cancelUpload(file.rawFile);
                    }*/
                } else {
                    //Calling getErrorMessage() to handle error messages
                    getErrorMessages(validationError);
                }
            });
        };
    });
    