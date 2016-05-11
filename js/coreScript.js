'use strict';
console.log("inside corescript");
angular.module('eb.fileUpload', [])
	.directive('fileUplDirective', ['$parse', function ($parse) { 
		function linkFiles(scope, element, attrs){
			var onChange = $parse(attrs.fileUplDirective);
		    element.on('change', function (event) {
		    	onChange(scope, { $files: event.target.files }
		                );
            });
		};
		return {
			link:linkFiles
		}
	}])
	.controller('uploadController', function($http){
		var formData = new FormData();
		var vm = this;
		vm.getTheFiles=function ($files){
			console.log("inside getfiles");
			console.log("List of files: " + $files);
			angular.forEach($files, function(value, key){
				formData.append('file', value);
				check(value,config);
			});
		};
		//Uploading files
		vm.upload=function(){
			var request={
				method: 'POST',
                url: 'http://localhost:8080/upload',
                data:formData,
                headers: {
                //'Content-Type': 'application/x-www-form-urlencoded',
                //'Content-Type': 'multipart/form-data',
                'Content-Type': undefined
                }
		    };
			//sending the files				
			$http(request)
				.then(
					function(response){
					// success callback
					console.log('success' + response);
					}, 
					function(reason){
					// failure callback
					console.log('failure' + reason.data);
					}
	    		);
		}
	});