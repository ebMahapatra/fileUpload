
"use strict";
console.log("inside corescript");
angular.module("fileuploadapp")

		.directive("fileUplDirective", ['$parse', function ($parse){
 
			
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
			} ])

			.controller("fuController", function($scope, $http){
				
			//	function fuController($scope, $http){

				var formData = new FormData();
				$scope.getTheFiles=function ($files){
					console.log("inside getfiles");
					console.log("List of files: " + $files);
					angular.forEach($files, function(value, key){
						formData.append(key, value);
						

						/*if(value.type=="application/pdf"){
							console.log("pdf file");
						}

						else
							console.log("key: " + key + " value: "+ value.type);*/

					});

				};
				

			//Uploading files 

			$scope.upload=function(){
				
				var request={
					method: 'POST',
                    url: 'http://localhost:8080/upload',
                  	data: formData,
                   	headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
				};

				//sending the files
				
				$http(request)
					
					 .then(
					       function(response){
					         // success callback
					         console.log("success" + response);
					       }, 
					       function(reason){
					         // failure callback
					         console.log("failure" + reason.data);

					       }
    					);
			}
		});
		//};
