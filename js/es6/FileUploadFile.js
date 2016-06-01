/*Used to instantiate objects that store information regarding every file*/
(function(global) {
    'use strict';

    // Class for uploading file
    class UploadFile {
        /**
         * @class
         * set up the class, define class variables, set defaults for them
         */
        constructor() {
            this.rawFile; // file
            this.status = ''; // queued, uploading, success, error
            this.type = ''; //  image, pdf. text etc.
            this.size = 0; // file size
            //this.previewImage = ''; // preview image of file
        }
    };

    global.ebFileUploader = global.ebFileUploader || {};
    global.ebFileUploader.UploadFile = UploadFile;
})(this);
