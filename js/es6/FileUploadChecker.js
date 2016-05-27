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
            //this.errors = new Error();
        }

        /** @function validateSize 
        * Validates file size w.r.t. size defined in config
        */
        validateSize(validator) {
            //Validating for every comparator defined in config object w.r.t size
            switch(validator.comparator) {
                case '>':
                    //Checks if file size not less than minimum size value defined in config
                    if (!(this.file.size > validator.value)) {
                        const error = new window.ebFileUploader.Error('file size too small');
                        this.errors.push(error);
                    }
                    break;

                case '<=':
                    //Checks if file size not greater than or equal to maximum size value defined in config
                    if (!(this.file.size <= validator.value)) {
                        const error = new window.ebFileUploader.Error('file size too big');
                        this.errors.push(error);
                    }  
                    break;

                 case '<':
                    //Checks if file size not greater than maximum size value defined in config
                    if (!(this.file.size < validator.value)) {
                        const error = new window.ebFileUploader.Error('file size too big');
                        this.errors.push(error);
                    }  
                    break;

                case '>=':
                    //Checks if file size not less than or equal to minimum size value defined in config
                    if (!(this.file.size >= validator.value)) {
                        const error = new window.ebFileUploader.Error('file size too small');+
                        this.errors.push(error);
                    }  
                    break;

                default:
                    const error = new window.ebFileUploader.Error('Case cannot be handled');
                    this.errors.push(error);
            }
        }

        /** @function validateType 
        * Validates file type w.r.t. type defined in config
        */
        validateType(validator) {
            //Removing whitespace if exists
            validator.value = validator.value.replace(/\s/g, '');
            //Converting the type to lowercase
            validator.value = validator.value.toLowerCase();
            //Validating for every comparator defined in config object w.r.t type
            switch(validator.comparator) {
                case 'in':
                    //Checks if file type matches one of the types defined in config
                    if (validator.value.indexOf(this.file.type) === -1) {
                        const error = new window.ebFileUploader.Error(this.file.type + ' is not supported. Supported file types are: ' + validator.value);
                        this.errors.push(error);
                    }
                    break;
                case 'notIn':
                    //Checks if file type matches one of the restricted types defined in config
                    if (!(validator.value.indexOf(this.file.type) === -1)) {
                        //this.errors.push(this.file.type + ' is not supported.');
                        const error = new window.ebFileUploader.Error(this.file.type + ' is not supported.');
                        this.errors.push(error);
                    }
                    break;
            }
        }
        
        /** @function validateFile 
        * Validates file based on results from validateSize() and validateType()
        */
        validateFile(file) {  
            this.file = file;
            //Looping over config object
            /** @constant
            */
            for (const objectConfig of this.config) {
                //Looping over validators[] in config
                /** @constant
                 */
                for (const validator of objectConfig.validators) {
                    //Validations for file size
                    if(objectConfig.object.identifier === 'size') {
                        this.validateSize(validator);
                    }
                    //Validations for file type
                    if(objectConfig.object.identifier === 'type') {
                        this.validateType(validator);
                    }
                }
            }
            /*this.errors.length holds information if the file is valid or invalid.
            If file is valid, this.errors.length == 0 else this.errors.length > 0 
            */
            console.log(this.errors);
            return this.errors;
        }
    }
    window.ebFileUploader = window.ebFileUploader || {};
    window.ebFileUploader.Checker = Checker;
})(this);
