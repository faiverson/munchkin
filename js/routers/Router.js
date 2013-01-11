define(['backbone', 'views/mainView'], function (Backbone, mainView) {

    var Router = Backbone.Router.extend({

        initialize: function() {
            Backbone.history.start();
        },

        routes: {
            '': 'init',
            'fight/:id': 'init'
        },
        
        init: function (id) {
            var self = this;
            if (self.mainView == undefined) {
                self.mainView = new mainView();
            }            
        }

    });

    return Router;
});