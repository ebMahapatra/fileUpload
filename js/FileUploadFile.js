'use strict';
/**
* Used to instantiate objects that store information regarding every file
*
*/
this.uploadFile = function() {
    this.rawFile;
	this.status = ''; //queued, uploading, success, error
	this.type = ''; // image, pdf. text etc.
	this.size; //file size
	//this.sizeUnit = ''; //Unit of file size
	this.previewImage = ''; //preview image of file
};
