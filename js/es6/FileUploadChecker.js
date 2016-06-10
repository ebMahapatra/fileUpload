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
               
                // Optimizing based on identifier
                switch(objectConfig.object.identifier) {
                    case 'type': {
                        
                        //Converting to lowercase and trimming the whitespaces if any
                        for (const validator of objectConfig.validators) {
                            validator.value = validator.value.toLowerCase();
                            validator.value = validator.value.trim();
                        }
                        break;
                    } 
                }
            }
            // Assigning config value received from FileUploadDirective to config property
            this.config = config;
        }
        
        /**
         * Validates file size against a set of comparators defined in config
         * @param   file - file that needs to be validated
         * @param  {object} validator - Configuration for the current validator
         * @param  {array} errors - Contains the list of validation errors
         */
        validateSize(file, validator, errors) {
            
            // Validating for every comparator defined in config object w.r.t size
            switch(validator.comparator) {
                case '>': {
                    
                    // Checks if file size not less than minimum size value defined in config
                    if (!(file.size > validator.value)) {
                        errors.push(new Error('File size too small. Required size is atleast: ' 
                                            + validator.value 
                                            + ' bytes and the size of your file is: ' + file.size + ' bytes!'));
                    }
                    break;
                }
                
                case '<=': {
                    
                    // Checks if file size not greater than or equal to maximum size value defined in config
                    if (!(file.size <= validator.value)) {
                        errors.push(new Error('File size too big. Required size is atmost: ' 
                                            + validator.value 
                                            + ' bytes and the size of your file is: ' + file.size + ' bytes!'));
                    }  
                    break;
                }

                 case '<': {
                    
                    // Checks if file size not greater than maximum size value defined in config
                    if (!(file.size < validator.value)) {
                        errors.push(new Error('File size too big. Required size is atmost: ' 
                                            + validator.value 
                                            + ' bytes and the size of your file is: ' + file.size + ' bytes!'));
                    }  
                    break;
                }
                    
                case '>=': {
                    
                    // Checks if file size not less than or equal to minimum size value defined in config
                    if (!(file.size >= validator.value)) {
                        errors.push(new Error('File size too small. Required size is atleast: ' 
                                            + validator.value 
                                            + ' bytes and the size of your file is: ' + file.size + ' bytes!'));
                    }  
                    break;
                }

                default: {
                    const errorMessage = 'Validator comparator ' + validator.comparator + ' is not yet implemented.'
                    console.warn(errorMessage);
                }
            }
        }
        
        /**
         * Validates file type against a set of comparators defined in config
         * @param   file - file that needs to be validated
         * @param  {object} validator - Configuration for the current validator
         * @param  {array} errors - Contains the list of validation errors
         */
        validateType(file, validator, errors) {
            
            // Validating for every comparator defined in config object with respect to type
            switch(validator.comparator) {
                case 'in': {

                    //Putting all validator values inside array
                    const valueArr = this.convertValidatorValToArray(validator.value);
                    
                    // Checks if file type matches one of the valid file types defined in config
                    //if (!validator.value.includes(file.type)) {
                    if (valueArr.indexOf(file.type) === -1) {
                        errors.push(new Error('File type ' + file.type 
                                            + ' is not supported. Supported file types are: ' 
                                            + validator.value));
                    }
                    break;
                }

                case 'notIn': {

                    //Putting all validator values inside array
                    const valueArr = this.convertValidatorValToArray(validator.value);

                    // Checks if file type matches one of the restricted types defined in config
                    if (!(valueArr.indexOf(file.type) === -1)) {
                        errors.push(new Error('File type ' + file.type + ' is not supported.'));
                    }
                    break;
                }

                default: {
                    const errorMessage = 'Validator comparator ' + validator.comparator + ' is not yet implemented.'
                    console.warn(errorMessage);
                }
            }
        }
        
        /**
         * Validates file based on results from validateSize() and validateType()
         * @param  {object} file - file that needs to be validated
         * @return {array} errors - list of errors(if any) encountered during validation
         */
        validateFile(file) {  
            //this.file = file;
            const errors = [];
            for (const objectConfig of this.config) {
                for (const validator of objectConfig.validators) {
                    
                    // Validations for file size
                    if(objectConfig.object.identifier === 'size') {
                        this.validateSize(file, validator, errors);
                    }
                    
                    // Validations for file type
                    if(objectConfig.object.identifier === 'type') {
                        this.validateType(file, validator, errors);
                    }
                }
            }

            /*errors holds information if the file is valid or invalid.
            If file is valid, errors.length == 0 else errors.length > 0 
            */
            return errors;
        }

        /**
         * Puts validator values for 'in' and 'notIn' comparators inside an array
         * @param  validatorValue -- validator values for the corresponding comparator
         * @return {array} -- contains all validator values
         */
        convertValidatorValToArray(validatorValue) {
            console.log('validatorValue ------ ' + validatorValue);
            const valueArr = validatorValue.split(', ');
            console.log('valueArr ------ ' + valueArr);
            return valueArr;
        }
    }
    global.ebFileUploader = global.ebFileUploader || {};
    global.ebFileUploader.Checker = Checker;
})(this);
