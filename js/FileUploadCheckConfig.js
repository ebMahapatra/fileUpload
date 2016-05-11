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
this.config = [{
	"object": {
		"identifier": "size"
        , "name": "file size"
    }
    , "validators": [{
    	"comparator": ">"
        , "value": 100
    }
    , {
    	"comparator": "<="
        , "value": 1000
    }]
}
, {
	"object": {
		"identifier": "type"
        , "name": "file type"
    }
    , "validators": [{
    	"comparator": "in"
        , "value": "image/jpeg, image/png, pdf"
    }]
    
}];
