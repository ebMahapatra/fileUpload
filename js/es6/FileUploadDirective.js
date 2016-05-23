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
    .controller('uploadController', function($http){
        const vm = this;
        let formData = new FormData();
        let getErrorMessage = function(err) {
            let errMsg = [];
            errMsg.push(err);
            console.log(errMsg);
        }
        //To get all the files chosen in the GUI
        vm.getTheFiles = function ($files){
            //Looping over the list of selected files to get information regarding every file
            angular.forEach($files, function(value, key){   
                //Calling uploadFile() of FileUploadFile.js to store selected file and its attributes
                //let file = new uploadFile();
                let file = window.ebFileUploader.UploadFile;
                let config = window.ebFileUploader.config;
                //Storing each file in rawFile property of uploadFile()
                file.rawFile = value;
                //Assigning selected file's size to 'size' property of uploadFile()
                file.size = value.size;
                //Assigning selected file's type to 'type' property of uploadFile()
                file.type = value.type;
                //Calling check() of FileUploadChecker.js to validate the file attributes
                let validationResult = window.ebFileUploader.fileValidator(file,config);
                //Discarding the invalid files, so that only valid files are uploaded
                if (validationResult.isValidFile) {
                    //Generate preview of image files
                    //Check if file is an image as preview is generated only for image files
                    if (file.type.match(/image.*/)) {
                        let imageSrc = handleFilePreview(file.rawFile);
                    }
                    //Storing valid file in formData
                    formData.append('file', file.rawFile);
                    //Uploading valid files
                    vm.upload = function(){
                        upload(formData, $http);
                    }
                    //Cancelling file upload process
                    /*vm.cancelUpload=function(){
                        cancelUpload(file.rawFile);
                    }*/
                }
                else {
                    getErrorMessage(validationResult.errMsg);
                }
            });
        };
    });
    