'use strict';
//file upload module
angular.module('eb.fileUpload', [])
	//fileUplDirective used for choose files button
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
		var vm = this;
		let formData = new FormData();
		//To get all the files chosen in the GUI
		vm.getTheFiles=function ($files){
			//Looping over the list of selected files to get information regarding every file
			angular.forEach($files, function(value, key){
				//Storing every file in formData
				formData.append('file', value);
				//Calling uploadFile() of FileUploadFile.js to store selected file and its attributes
				let file = new uploadFile();
				//Storing each file in rawFile property of uploadFile()
				file.rawFile=value;
				//Assigning selected file's size to 'size' property of uploadFile()
				file.size=value.size;
				//Assigning selected file's type to 'type' property of uploadFile()
				file.type=value.type;
				//Calling check() of FileUploadChecker.js to validate the file attributes
				let validationResult = check(file,config);
				console.log(validationResult.isValidFile);
				console.log(validationResult.errMsg);
			});
		};
		//Uploading files
		vm.upload=function(){
			var request={
				method: 'POST',
                url: 'http://localhost:8080/upload',
                data:formData,
                headers: {
                'Content-Type': undefined
                }
		    };
			//sending files			
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