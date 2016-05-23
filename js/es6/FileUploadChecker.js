
/**
* Checks if file matches user defined constraints
*
*/
window.ebFileUploader.fileValidator = (function () {
    'use strict';
    window.ebFileUploader.Checker = class {
        //constructir function
        constructor(file, config) {
            //Assigning the values of file and config received from FileUploadDirective to file and config properties respectively
            this.file = file; 
            this.config = config;
            this.err = [];
        }
    //Getter property for boolean isValidFile
    get isValidFile() {
        let isValidFile = true;
        let isValidType = true;
        const err = [];
        //Looping over config object
        for (let configObject of this.config) {
            let isValidSize = true;
                //Looping over validators[] in config
                for (let validator of configObject.validators) {
                    //Validations for file size
                    if(configObject.object.identifier === 'size') {
                        //Validating for every comparator for size
                        switch(validator.comparator) {
                            case '>':
                            if (!(this.file.size > validator.value)) {
                                isValidSize = false;              
                            }
                            break;

                            case '<=':
                            if (!(this.file.size <= validator.value)) {
                                isValidSize = false;   
                            }
                            break;
                        }
                    }
                    //Validations for file type
                    if(configObject.object.identifier === 'type') {
                        //Validating for every comparator for type
                        switch(validator.comparator) {
                            case 'in':
                            if (validator.value.indexOf(this.file.type) === -1)
                                isValidType = false;
                            break;
                        }
                    }
                }
                //Generating error if file size not valid and setting the entire file as an invalid file
                if (!isValidSize)
                {
                    isValidFile = false;
                    this.err.push('Invalid file size');
                }
                //Generating error if file type not valid and setting the entire file as an invalid file
                if (!isValidType)
                {
                    isValidFile = false;
                    this.err.push('Invalid file type');
                }  
        }
        return isValidFile;
    }

      //Getter property for String Error message
     /* get err() {
        //return this.err;
        console.log(err);
      }*/
      get errMsg() {
        let err = this.err;
        return err;
      }

    }
    return function check(file,config) {
        let checker = new window.ebFileUploader.Checker(file,config);
        const validationResult = {isValidFile : false, errMsg : ""};
        validationResult.isValidFile = checker.isValidFile;
        validationResult.errMsg = checker.errMsg;
        return validationResult;
    }
    //return check;
})(this);

//window.ebFileUploader.fileValidator = fileValidator();
