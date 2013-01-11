define(['jquery', 'backbone', 'collections/playerCollection', 'views/playerView', 'text!templates/newPlayer.html', 'mobile'],
function($, Backbone, playerCollection, playerView, newPlayerTemplate) {
    
  var View = Backbone.View.extend({

    el: 'body',
    
    events: {
        "click #addPlayer":  "openDialog",
        "click #savePlayer":  "addElement"
    },
    
    initialize: function() {
        this.collection = new playerCollection();
        this.collection.on('add', this.renderElement, this);
        this.collection.on('reset', this.addAll, this);
        this.collection.fetch();        
    },

    openDialog: function() {
        if($('#newPlayer').get(0) == undefined)
            this.$el.append(newPlayerTemplate);        
        $.mobile.changePage("#newPlayer", {transition: 'pop', role: 'dialog'});
        this.name = $('#playerName');
        this.gender = $('#gender');
    },

    addElement: function() {
        if (this.name.val() != '') {
            this.collection.create(this.newAttributes());
            this.name.val('');            
            $('#newPlayer').dialog('close');
        }
    },

    addAll: function() {
        this.collection.each(this.renderElement);
    },

    renderElement: function(model) {
        var player = new playerView({model: model});
        player.render();        
    },

    newAttributes: function() {
        return {
            id: this.collection.nextId(),
            name: this.name.val(),
            level: 1,
            bonus: 0,
            extra: 0,
            total: 1,
            races: {
                'Halflings': false,
                'Dwarves': false,
                'Elves': false
            },
            classes: {
                'Warriors': false,
                'Thieves': false,
                'Wizards': false
            },
            gender: this.gender.val()
        };
    }
    
  });

  return View;
});
