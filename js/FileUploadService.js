'use strict';
/**
* Uploads valid files into the server
*
*/
//Creating upload request
let upload=function(formData, $http) {
	var request={
		method: 'POST'
		, url: 'http://localhost:8080/upload'
		, data: formData
		, headers: {
			'Content-Type': undefined
		}
	};
	//sending files			
	$http(request).then(function(response){
		// success callback
		console.log('success: ' + response.data);
	} 
	, function(reason){
		// failure callback
		console.log('failure' + reason.data);
	});
}; 
