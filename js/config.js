require.config({

    deps: ['main'],

    config: {
        i18n: {
            locale: 'en-us'// language selected by default
        }
    },

    // 3rd party script alias names
    paths: {
        // Core Libraries
        //modernizr:          "libs/vendor/modernizr.min",
        jquery:             "libs/vendor/jquery/jquery.min",
        bootstrap:           "libs/vendor/bootstrap/bootstrap.min",
        underscore:         "libs/vendor/engines/underscore.lodash",
        angular:            "libs/vendor/angular/angular",
        "angular-resource": "libs/vendor/angular/angular-resource",
        "angular-route":    "libs/vendor/angular/angular-route",
        //benchmark:          'libs/vendor/benchmark',
        //constant:           "libs/vendor/constant",
        //mediator:           "libs/vendor/mediator",
        //browserDetect:      'libs/vendor/browserDetect',
        templates: '../templates',
    },

    shim: {
        "bootstrap": {
            deps: ["jquery"],
            exports: "bootstrap"
        },
        "angular": {
            exports: "angular"
        },
        "angular-resource": {
            deps:["angular"]
        },
        "angular-route": {
            deps:["angular"]
        }
    }
});