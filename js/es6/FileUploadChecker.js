// Method to validate if file matches user defined constraints
(function (global) {
    'use strict';
    
    // Class for validation
    class Checker {
        /**
         * Validates a file with respect to the user defined configuration in config.
         * @param {object} config - Configuration for the file to be validated against.
         */
        
        constructor(config) {

            // Optimizing the config data
            for (const objectConfig of config) {
                for (const validator of objectConfig.validators) {
                    if (typeof validator.value == 'string') {

                        // Converting the type to lowercase
                        validator.value = validator.value.toLowerCase();

                        // Removing whitespace if exists
                        validator.value = validator.value.replace(/\s/g, '');
                    }
                }
            }
            // Assigning config value received from FileUploadDirective to config property
            this.config = config;
        }

        /**
         * [Validates file size against a set of comparators defined in config]
         * @param  {[object]} validator [configuration for the current validator]
         */
        validateSize(validator, errors) {
            
            // Validating for every comparator defined in config object w.r.t size
            switch(validator.comparator) {
                case '>': {
                    
                    // Checks if file size not less than minimum size value defined in config
                    if (!(this.file.size > validator.value)) {
                        errors.push(new Error('file size too small'));
                    }
                    break;
                }
                
                case '<=': {
                    
                    // Checks if file size not greater than or equal to maximum size value defined in config
                    if (!(this.file.size <= validator.value)) {
                        errors.push(new Error('file size too big'));
                    }  
                    break;
                }

                 case '<': {
                    
                    // Checks if file size not greater than maximum size value defined in config
                    if (!(this.file.size < validator.value)) {
                        errors.push(new Error('file size too big'));
                    }  
                    break;
                }
                    
                case '>=': {
                    
                    // Checks if file size not less than or equal to minimum size value defined in config
                    if (!(this.file.size >= validator.value)) {
                        errors.push(new Error('file size too small'));
                    }  
                    break;
                }

                default: {
                    errors.push(new Error('Case cannot be handled'));
                }
            }
        }

        /**
         * [Validates file type against a set of comparators defined in config]
         * @param  {[object]} validator [configuration for the current validator]
         */
        validateType(validator, errors) {
            
            // Validating for every comparator defined in config object w.r.t type
            switch(validator.comparator) {
                case 'in':
                    
                    // Checks if file type matches one of the types defined in config
                    if (validator.value.indexOf(this.file.type) === -1) {
                        errors.push(new Error(this.file.type + ' is not supported. Supported file types are: ' + validator.value));
                    }
                    break;
                case 'notIn':
                   
                    // Checks if file type matches one of the restricted types defined in config
                    if (!(validator.value.indexOf(this.file.type) === -1)) {
                        errors.push(new Error(this.file.type + ' is not supported.'));
                    }
                    break;
            }
        }
        
        /** @function validateFile 
        * Validates file based on results from validateSize() and validateType()
        */
        /**
         * [Validates file based on results from validateSize() and validateType()]
         * @param  {[object]} file [file that needs to be validated]
         * @return {[array]} errors [list of errors(if any) encountered during validation]
         */
        validateFile(file) {  
            this.file = file;
            const errors = [];
            for (const objectConfig of this.config) {
                for (const validator of objectConfig.validators) {
                    
                    // Validations for file size
                    if(objectConfig.object.identifier === 'size') {
                        this.validateSize(validator, errors);
                    }
                    
                    // Validations for file type
                    if(objectConfig.object.identifier === 'type') {
                        this.validateType(validator, errors);
                    }
                }
            }
            /*this.errors holds information if the file is valid or invalid.
            If file is valid, this.errors.length == 0 else this.errors.length > 0 
            */
            return errors;
        }
    }
    global.ebFileUploader = global.ebFileUploader || {};
    global.ebFileUploader.Checker = Checker;
})(this);
