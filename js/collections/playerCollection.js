define(['backbone', 'amplify', 'views/playerView', 'models/playerModel'], function(Backbone, Store, playerView, playerModel){
	  
	var collection = Backbone.Collection.extend({
    
        localStorage: new window.Store("munchkin"),

        initialize: function() {
            //this.bind('add', this.renderElement, this);
        },

        /**
        * get the last ID
        * @return {integer}
        */
        nextId: function() {
            if (!this.length)
                return 1;
            return this.last().get('id') + 1;
        }/*,

        renderElement: function() {
            var playerView = new playerView({model: this.last()});
        }*/
        
    });

    return collection;
    
});
