'use strict';
/**
* Checks if file matches user defined constraints
*
*/
this.check = function(file, config) {
    let isValidFile = true;
    let isValidType = true;
    let err = [];
    let validationResult = {"isValidFile" : false, "errMsg" : ""}; 
    //Looping over all objects in config
    for (let configObject of config) {
            let isValidSize = true;
            //Looping over validators[] in config
            for (let validator of configObject.validators) {
                //Validations for file size
                if(configObject.object.identifier === 'size') {
                    //Validating for every comparator for size
                    switch(validator.comparator) {
                        case '>':
                        if (!(file.size > validator.value)) {
                            isValidSize=false;              
                        }
                        break;

                        case '<=':
                        if (!(file.size <= validator.value)) {
                            isValidSize=false;   
                        }
                        break;
                    }
                }
                //Validations for file type
                if(configObject.object.identifier === 'type') {
                    //Validating for every comparator for type
                    switch(validator.comparator) {
                        case 'in':
                        if (validator.value.indexOf(file.type) === -1)
                            isValidType=false;
                        break;
                    }
                }
            }
            //Generating error if file size not valid and setting the entire file as an invalid file
            if (!isValidSize)
            {
                isValidFile = false;
                err.push('Invalid file size');
            }
            //Generating error if file type not valid and setting the entire file as an invalid file
            if (!isValidType)
            {
                isValidFile = false;
                err.push('Invalid file type');
            }       
    }
    validationResult.isValidFile = isValidFile;
    validationResult.errMsg = err;
    return validationResult;
};
