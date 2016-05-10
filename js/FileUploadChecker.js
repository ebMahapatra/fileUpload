'use strict';
/**
* Checks if file matches user defined constraints
*
*/
exports.check = function(file, configHolder) {
	let isValidFile=true;
	let isValidType=true;
	let err=[];
	let validationResult={"isValidFile" : "", "errMsg" : ""};
	//Looping over all objects in config
	for (var configObject in configHolder.config) {
			let isValidSize=true;
			//Looping over validators[] in config
			for (var validator in configHolder.config[configObject].validators) {
				//comparator holds all comparators in validators[]
				let comparator=configHolder.config[configObject].validators[validator].comparator;
				//val holds all values in validators[]
				let val=configHolder.config[configObject].validators[validator].value;
				//Validations for file size
				if(configHolder.config[configObject].object.identifier === 'size') {
					switch(comparator) {
						case '>':
						if (!(file.size > val))
							isValidSize=false;					
						break;

	    				case '<=':
						if (!(file.size <= val))
							isValidSize=false;
						break;
    				}
				}
				//Validations for file type
                if(configHolder.config[configObject].object.identifier === 'type') {
                    switch(comparator) {
                        case 'in':
                        if (val.indexOf(file.type) == -1)
                            isValidType=false;
                        break;
                    }
                }
				
			}
			//Generating error if file size not valid and setting the entire file as an invalid file
			if (!isValidSize)
			{
				isValidFile = false;
				err.push("Invalid file size");
			}
			//Generating error if file type not valid and setting the entire file as an invalid file
			if (!isValidType)
			{
				isValidFile = false;
				err.push("Invalid file type");
			}		
	}
	validationResult.isValidFile = isValidFile;
	validationResult.errMsg = err;
	return validationResult;
};












