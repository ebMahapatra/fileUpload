(function () {
    'use strict';
    /*Class for errors*/
    class Error {
        /**
         * Generates error messages
         * @param {} errorMessage - Error messages
         */
        //constructor function
        constructor(errorMessage) {
            //Assigning config value received from FileUploadDirective to config property
            this.errorMessage = errorMessage;
        }
    }
    window.ebFileUploader = window.ebFileUploader || {};
    window.ebFileUploader.Error = Error;
})(this);
