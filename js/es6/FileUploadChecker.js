
/**
* Checks if file matches user defined constraints
*
*/
window.ebFileUploader.fileValidator = (function () {
    'use strict';
    window.ebFileUploader.Checker = class {
        //constructor function
        constructor(file, config) {
            //Assigning the values of file and config received from FileUploadDirective to file and config properties respectively
            this.file = file; 
            this.config = config;
            this.err = [];
        }

        //Method to validate file size
        validateSize(validator, isValidSize) {
            //Validating for every comparator defined in config object w.r.t size
            switch(validator.comparator) {
                case '>':
                    if (!(this.file.size > validator.value)) {
                        isValidSize = false;  
                        this.err.push('file size too small');
                    }
                    break;

                case '<=':
                    if (!(this.file.size <= validator.value)) {
                        isValidSize = false; 
                        this.err.push('file size too big');
                    }  
                    break;
            }
            return isValidSize;
        }

        //Method to validate file type
        validateType(validator, isValidType) {
            //Validating for every comparator defined in config object w.r.t type
            switch(validator.comparator) {
                case 'in':
                if (validator.value.indexOf(this.file.type) === -1) {
                    isValidType = false;
                    this.err.push('File type is not supported');
                }
                break;
            }
            return isValidType;
        }

        validateFile() {  
            let isValidFile = true;
            //let isValidFile = false;
            const err = [];
            //Looping over config object
            for (const objectConfig of this.config) {
                let isValidSize = true;
                let isValidType = true;
                //Looping over validators[] in config
                for (const validator of objectConfig.validators) {
                    //Validations for file size
                    if(objectConfig.object.identifier === 'size') {
                        isValidSize = this.validateSize(validator, isValidSize);
                    }
                    //Validations for file type
                    if(objectConfig.object.identifier === 'type') {
                        isValidType = this.validateType(validator, isValidType);
                    }
                }
                //Generating error if file size not valid and setting the entire file as an invalid file
                if (!isValidSize) {
                    isValidFile = false;
                }
                //Generating error if file type not valid and setting the entire file as an invalid file
                if (!isValidType) {
                    isValidFile = false;
                }  
            }
            return isValidFile;
        }

        //Getter property for boolean isValidFile
        get isValidFile() {
            return this.validateFile();
        }

        //Getter property for error messages
        get errMsg() {
            return this.err;
        }
    }

    //Contructs the validation result
    return function generateResult(file,config) {
        //Creating object for Checker class
        let checker = new window.ebFileUploader.Checker(file,config);
        //validationResult stores the file validation result
        const validationResult = {isValidFile : false, errMsg : ""};
        validationResult.isValidFile = checker.isValidFile;
        validationResult.errMsg = checker.errMsg;
        return validationResult;
    }
})(this);
