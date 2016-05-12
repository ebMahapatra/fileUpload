'use strict';
/**
* Checks if file matches user defined constraints
*
*/
this.check = function(file, config) {
	let isValidFile=true;
	let isValidType=true;
	let err=[];
	let validationResult={"isValidFile" : "", "errMsg" : ""};
	//Looping over all objects in config
	for (var configObject in config) {
			let isValidSize=true;
			//Looping over validators[] in config
			for (var validator in config[configObject].validators) {
				//comparator holds all comparators in validators[]
				let comparator=config[configObject].validators[validator].comparator;
				//val holds all values in validators[]
				let val=config[configObject].validators[validator].value;
				//Validations for file size
				if(config[configObject].object.identifier === 'size') {
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
                if(config[configObject].object.identifier === 'type') {
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












