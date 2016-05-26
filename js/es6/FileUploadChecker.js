/*Method to validate if file matches user defined constraints*/
(function () {
    'use strict';
    /*Class for validation*/
    class Checker {
        /**
         * Validates a file wr.t. user defined configuration.
         * @param {FileUploadCheckConfig} config - Configuration for the file to be validated against.
         */
        //constructor function
        constructor(config) {
            //Assigning config value received from FileUploadDirective to config property
            this.config = config;
            //errror messages
            this.errors = [];
        }

        /** @function validateSize 
        * Validates file size w.r.t. size defined in config
        */
        validateSize(validator, isValidSize) {
            //Validating for every comparator defined in config object w.r.t size
            switch(validator.comparator) {
                case '>':
                    //Checks if file size not less than minimum size value defined in config
                    if (!(this.file.size > validator.value)) {
                        isValidSize = false;  
                        this.errors.push('file size too small');
                    }
                    break;

                case '<=':
                    //Checks if file size not greater than maximum size value defined in config
                    if (!(this.file.size <= validator.value)) {
                        isValidSize = false; 
                        this.errors.push('file size too big');
                    }  
                    break;

                    // TODO: Include the default case
            }
            return isValidSize;
        }

        /** @function validateType 
        * Validates file type w.r.t. type defined in config
        */
        validateType(validator, isValidType) {
            //Validating for every comparator defined in config object w.r.t type
            switch(validator.comparator) {
                case 'in':
                //Checks if file type matches one of the types defined in config
                if (validator.value.indexOf(this.file.type) === -1) {
                    isValidType = false;
                    this.errors.push(this.file.type + ' is not supported. Supported file types are: ' + validator.value);
                }
                break;
            }
            return isValidType;
        }
        
        /** @function validateFile 
        * Validates file based on results from validateSize() and validateType()
        */
        validateFile(file) {  
            this.file = file;
            let isValidFile = true;
            
            //Looping over config object
            /** @constant
            */
            for (const objectConfig of this.config) {
                let isValidSize = true;
                let isValidType = true;
                //Looping over validators[] in config
                /** @constant
                 */
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

        /** @function generateResult 
        * Contructs the validation result
        */
        generateResult(file,config) {
            //Creating instance for Checker class
            const checker = new window.ebFileUploader.Checker(config);
            //validationResult stores the file validation result
            /** @constant
                @type {object}
                @default
            */
            const validationResult = {isValidFile : false, errorMessages : ""};
            validationResult.isValidFile = checker.validateFile;
            validationResult.errorMessages = this.errors;
            return validationResult;
        }
    }
    window.ebFileUploader = window.ebFileUploader || {};
    window.ebFileUploader.Checker = Checker;

})(this);
