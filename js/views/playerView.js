define(['jquery', 'backbone', 'text!templates/player.html'], function($, Backbone, template){
    var View = Backbone.View.extend({

        el: $('#players-list'),
        template: _.template(template),

        initialize: function() {
            var self = this;
            this.model.view = this;            
            this.$el.append(this.template(this.model.toJSON()));
            this.id = $('#player-' + this.model.get('id'));
            this.levelList = $('#player-' + this.model.get('id') + ' span.level-list');
            this.bonusList = $('#player-' + this.model.get('id') + ' span.bonus-list');
            this.totalList = $('#player-' + this.model.get('id') + ' span.total-list');
            this.level = $('#player-' + this.model.get('id') + ' span.level');
            this.bonus = $('#player-' + this.model.get('id') + ' span.bonus');
            this.extra = $('#player-' + this.model.get('id') + ' span.extra');
            this.total = $('#player-' + this.model.get('id') + ' span.total');
            this.gender = $('#player-' + this.model.get('id') + ' .gender');
            this.classes = $('#player-' + this.model.get('id') + ' .classes');
            this.races = $('#player-' + this.model.get('id') + ' .races');

            $('#player-' + this.model.get('id') + ' a.level').on('click', [this], this.changeLevel);
            $('#player-' + this.model.get('id') + ' a.bonus').on('click', [this], this.changeBonus);
            $('#player-' + this.model.get('id') + ' a.extra').on('click', [this], this.changeExtra);
            this.gender.on('change', [this], this.changeGender);
            this.races.on('change', [this], this.changeRaces);            
            _.each(self.races, function(race) {
                if (_.indexOf(self.model.get('races'), $(race).attr('name')) >= 0) {
                    $(race).attr('checked', 'checked');
                }
            });
        },

        render: function() {
            var self = this;
            this.id.collapsible();
            this.classes.checkboxradio();
            this.gender.slider();
            $('#player-' + this.model.get('id') + ' a.counters').button();
            $('#player-' + this.model.get('id') + ' a.fight').button();            
            $('#player-' + this.model.get('id') + ' input.races').checkboxradio();
            $(':jqmData(role=controlgroup)').controlgroup('refresh');
            $(':jqmData(role=fieldcontain)').fieldcontain('refresh');            

            var opt =  this.gender.siblings('div[role=application]').children('span');
            _.each(opt, function(item) {
                if($(item).text() == self.model.get('gender')) {
                    $(item).width('100%');
                    self.gender.siblings('div[role=application]').find('a.ui-slider-handle').css('left', 0);
                }
                else {
                    $(item).width('0%');
                    self.gender.siblings('div[role=application]').find('a.ui-slider-handle').css('left', '100%');

                }
            });
            
        },

        changeLevel: function(event) {
            var self = event.data[0];
            var counter = self.model.get('level');
            counter += $(event.currentTarget).children().children('span.ui-icon').hasClass('ui-icon-plus') ? 1 : -1;
            self.model.save({'level': counter});
            self.level.text(counter);
            self.levelList.text(counter);
            self.changeTotal();
        },

        changeBonus: function(event) {
            var self = event.data[0];
            var counter = self.model.get('bonus');
            counter += $(event.currentTarget).children().children('span.ui-icon').hasClass('ui-icon-plus') ? 1 : -1;
            self.model.save({'bonus': counter});
            self.bonus.text(counter);
            self.calculateBonus();
            self.changeTotal();
        },

        changeExtra: function(event) {
            var self = event.data[0];
            var counter = self.model.get('extra');
            counter += $(event.currentTarget).children().children('span.ui-icon').hasClass('ui-icon-plus') ? 1 : -1;
            self.model.save({'extra': counter});
            self.extra.text(counter);
            self.calculateBonus();
            self.changeTotal();
        },

        calculateBonus: function() {
            this.bonusList.text(this.model.get('bonus') + this.model.get('extra'));
        },

        changeTotal: function() {
            var total = this.model.get('level') + this.model.get('bonus') + this.model.get('extra');
            this.model.save({'total': total});
            this.total.text(total);
            this.totalList.text(total);
        },

        changeGender: function(event) {
            var self = event.data[0];
            self.model.save({'gender': $(event.currentTarget).val()});
        },

        changeRaces: function(event) {
            var self = event.data[0];
            if (self.checkTotalElemnts(self.model.get('races')) < 2) {
                var races = self.model.get('races');
                var name = $(event.currentTarget).attr('name');
                races[name] = !races[name]
                self.model.save({'races': races});
            }
            else {
                $("#error-message").text('You cant do it my friend');
                $.mobile.changePage("#error", {transition: 'pop', role: 'dialog'});
            }
        },

        checkTotalElemnts: function(object) {
            var count = 0;
            _.each(object, function(value) {
                if (object)
                    count++;
            });
            return count;
        }

    });

    return View;
});
