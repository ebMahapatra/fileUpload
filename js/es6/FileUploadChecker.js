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
        validateSize(validator) {
            //Validating for every comparator defined in config object w.r.t size
            switch(validator.comparator) {
                case '>':
                    //Checks if file size not less than minimum size value defined in config
                    if (!(this.file.size > validator.value)) {
                        this.errors.push('file size too small');
                    }
                    break;

                case '<=':
                    //Checks if file size not greater than maximum size value defined in config
                    if (!(this.file.size <= validator.value)) {
                        this.errors.push('file size too big');
                    }  
                    break;

                default:
                    console.error('Case cannot be handled');
            }
        }

        /** @function validateType 
        * Validates file type w.r.t. type defined in config
        */
        validateType(validator) {
            //Validating for every comparator defined in config object w.r.t type
            switch(validator.comparator) {
                case 'in':
                //Checks if file type matches one of the types defined in config
                if (validator.value.indexOf(this.file.type) === -1) {
                    this.errors.push(this.file.type + ' is not supported. Supported file types are: ' + validator.value);
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
            return this.errors.length;
        }
    }
    window.ebFileUploader = window.ebFileUploader || {};
    window.ebFileUploader.Checker = Checker;
})(this);
