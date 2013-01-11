require.config({
    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.7.2.min")
    paths: {
        // Core Libraries
        modernizr: "libs/modernizr.v2.6.1",
        //bootstrap: "libs/bootstrap.v2.0.3",
        jquery: "libs/jquery-1.8.1.min",
        mobile: "libs/jquery.mobile-1.2.0.min",
        underscore: "libs/lodash.min.v0.7.0",
        backbone: "libs/backbone.min.v0.9.2",
        amplifyStore: "libs/amplify.store.min",
        amplify: "libs/backbone.amplify",

        // Require.js Plugins
        text: "plugins/text.v2.0.1",
        //image: "plugins/image.v0.2.1",
        i18n: "plugins/i18n.v2.0.1",
        json: "plugins/json.v0.2.1",
        //font: "plugins/font.v0.2.0",
        propertyParser: "plugins/propertyParser.v0.1.0"
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"  //attaches "Backbone" to the window object
        },
        "mobile": {
            deps: ["jquery"]
        },
        "amplifyStore": {
            deps: ["backbone"]
        },
        "amplify": {
            deps: ["amplifyStore"]
        }
    } // end Shim Configuration
});

require(['modernizr', 'backbone', 'routers/Router', 'amplify', 'mobile'],
function (Modernizr, Backbone, Router) {
    var router = new Router();
});
