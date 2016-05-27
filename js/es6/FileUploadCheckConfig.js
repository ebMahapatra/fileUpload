/**
* Holds user defined constraints for file validation
*
*/
(function() {
    'use strict';
    const config = [{
        object: {
            identifier: 'size'
            , name: 'file size'
        }
        , validators: [{
            comparator: '>'
            , value: 100
        }
        , {
            comparator: '<='
            , value: 1000
        }
        , {
            comparator: '<'
            , value: 2000
        }
        , {
            comparator: '>='
            , value: 150
        }
        /*, {
            comparator: '='
            , value: 200
        }*/]
    }
    , {
        object: {
            identifier: 'type'
            , name: 'file type'
        }
        , validators: [{
            comparator: 'in'
            , value: 'IMAGE /jpeg, image/png,   application/pdf'
        }
        , {
            comparator: 'notIn'
            , value: 'txt'
        }]
    }];
    window.ebFileUploader = window.ebFileUploader || {};
    window.ebFileUploader.config = config;
})(this);

