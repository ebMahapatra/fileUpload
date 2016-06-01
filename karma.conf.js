// Karma configuration
// Generated on Fri May 06 2016 14:10:21 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
        "./js/lib/angular.min.js"
        ,"./js/es6/FileUploadDirective.js"
        , "./js/es6/FileUploadCheckConfig.js"
        , "./js/es6/FileUploadFile.js"
        , "./js/es6/FileUploadChecker.js"
        , "./test/FileUploadChecker.test.js"
        , "./test/FileUploadService.test.js"
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './js/**/*.js': [ 'browserify' ],
        './test/*.js': [ 'browserify' ]
    },

    browserify: {
      debug: true
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'html'],
    
    // the default configuration 
    htmlReporter: {
      outputDir: 'karma_html', // where to put the reports  
      templatePath: null, // set if you moved jasmine_template.html 
      focusOnFailures: true, // reports show failures on start 
      namedFiles: false, // name files instead of creating sub-directories 
      pageTitle: null, // page title for reports; browser info by default 
      urlFriendlyName: false, // simply replaces spaces with _ for files/dirs 
      reportName: 'report-summary-filename', // report summary filename; browser info by default 
    },

    // web server port
    port: 3333,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
