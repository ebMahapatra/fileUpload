'use strict';

/**
* Checks if file matches user defined constraints
*
*/
function check(FileUploadFile file, FileUploadCheckConfig config){
	let isValidFile=true;
	let newSize=0;
	/*Checks if unit of file size and user defined file size unit are same. 
	If not, then file size unit is converted to bytes*/
	
	if (file.sizeUnit!=config.fileSize.unit){
		switch(config.fileSize.unit){
			case 'KB':
				newSize=file.size/1024;
				break;

			case 'MB':
				newSize=file.size/(1024*1024);
				break;

			case 'GB':
				newSize=file.size/(1024*1024*1024);
				break;
			default:
                newSize =file.size;
		}
		file.size=newSize.toFixed(2);
	}

	//Checks if file size is <= user defined file size constraint
	if (file.size > config.fileSize.value){
		return false;
	}
	
	/*Checks if the file type is same as one of the types defined by user. 
	  If no file type is defined by user, files of all types(extensions) are considered valid
	*/	
	if(config.validFileTypes.length>0){
		isValidFile=config.validFileTypes.indexOf(file.type.toLowerCase()) > -1? true:false
	}
}







	