'use strict';
/**
* Holds user defined constraints for file validation
*
*/
/*let config = {
    fileSize: {
        comparator: '>'
		,value: ''
		,unit: ''
	}
	,validFileTypes: []
};*/
let config= [
	fileTypeValidators = [{
		object: {
			identifier: 'type'
        	, name: 'file type'
    	}
    	, validators: [{
            comparator: 'in'
            , value: 'image/jpeg,image/png'
    	}]
	}],

	fileSizeValidators = [{
		object: {
			identifier: 'size'
        	, name: 'file size'
    	}
    	, validators: [{
    		comparator: '<='
        	, value: '10000000'
    	}
    	, {
    		comparator: '>'
        	, value: '200000'
    	}]
	}]
];
