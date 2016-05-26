/*Used to instantiate objects that store information regarding every file*/
(function() {
	'use strict';
	
	/*Class for uploading file*/
	class UploadFile {
		/**
         * Uploads a file to the server.
         */
         //Constructor function
	    constructor() {
	        this.rawFile; //file
	        this.status = ''; //queued, uploading, success, error
	        this.type = ''; // image, pdf. text etc.
	        this.size; //file size
	        this.previewImage = ''; //preview image of file
	    }
	};

	window.ebFileUploader = window.ebFileUploader || {};
    window.ebFileUploader.UploadFile = UploadFile;
})(this);
