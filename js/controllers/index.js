'use strict';

define(['modules/App', 'jquery', 'services/localStorage'], function (App, $) {

	var controller = App.controller('starting', function ($scope, $location, localStorage, $log) {

			var players = $scope.players = localStorage.get();
			//$log.info('SomeCtrl - starting up, yeah!');
			$scope.newPlayer = function() {
				var name = $scope.player.name != '' ? $scope.player.name.trim() : null;
				var gender = $scope.player.gender != '' ? $scope.player.gender : null;
				if(name && gender) {
					var player = {
						"name": name,
						"gender": gender,
						"level": 1,
						"bonus": 0,
						"total": 1,
						"race": {'human':'active', 'elves':'', 'dwarves':'', 'halflings':'', 'orcs':''},
						"class": {'cleric':'', 'warrior':'', 'thief':'', 'wizard':''},
						"items": {
							"super-munchkin": false, // allow 2 classes
							"half-breed": true, // allow 2 races
						},
						"battle": 0
					}

					players.push(player);
					$scope.player.name = '';
					$('#newPlayer').modal('hide');
				}
			};

			$scope.setIndex = function(index) {
				$scope.players[index].index = index
			}

			$scope.$watch('players', function () {
				localStorage.put(players);
			}, true);

			$scope.checkItem = function(self, item) {
				return (self.player.items[item]) ? 'ok' : 'remove';
			};

			$scope.changePoints = function(event, self) {
				var nClass = '';
				var i = self.$index;
				var li = $(event.target).parent().siblings('.badge');
				var total = $('.total-' + i);
				var arrow = $(event.target).hasClass('glyphicon-chevron-up') ? 1 : -1;
				var where = (li.hasClass('level')) ? 'level' : 'bonus';
				players[i][where] += arrow;
				players[i].total += arrow;
				li.text(players[i][where]);
				total.text(players[i].total);				
			}

			$scope.changeState = function($event, self) {
				var nClass = '';
				var i = self.$index;
				var li = $($event.target).parent();
				var name = $($event.target).text();
				name = name.toLowerCase();
				// we check if belong to a races o class
				if(players[i]['race'].hasOwnProperty(name) || players[i]['class'].hasOwnProperty(name)) {
					var type = players[i]['class'].hasOwnProperty(name) ? 'class' : 'race'; // check wich has the property					
					players[i][type][name] = (players[i][type][name] == 'active') ? '' : 'active';
					nClass = players[i][type][name];
				}
				// it's belong to an item
				else {
					name = name.replace(/\s/, "-");
					if(players[i]['items'].hasOwnProperty(name)) {					
						if(players[i]['items'][name] === true) {
							li.removeClass('glyphicon-ok').addClass('glyphicon-remove');
							players[i]['items'][name] = false;
						}
						else {
							li.removeClass('glyphicon-remove').addClass('glyphicon-ok');
							players[i]['items'][name] = true;
						}
					}
				}
			}

			$scope.removePlayer = function(self) {
				var i = self.$index;
				players.splice(i, 1);								
				$('#remove-player-' + i).modal('hide');
				$('.player-' + i).parentsUntil('.panel').remove();
			}

			$scope.friend = null;
			$scope.enemy = null;
			$scope.monster = {
				battle: 0,
				level: 1
			}

			$scope.setFriend = function() {
				$scope.friend = this.friend;
			}

			$scope.setEnemy = function() {
				$scope.enemy = this.enemy;
			}

			$scope.orderPlayers = function(player) {
		        return -player.level;
		    }

		    $scope.whoIsWining = function(player) {
		    	var f = 0;
		    	var e = 0;
		    	if($scope.friend != null)
		    		f = parseInt($scope.friend.battle) + parseInt($scope.friend.total);		    	
		    	if($scope.enemy != null)
		    		e = parseInt($scope.enemy.battle) + parseInt($scope.enemy.total);
		    	var result = (parseInt(player.battle) + parseInt(player.total) + f) - (e + parseInt($scope.monster.battle) + parseInt($scope.monster.level));
		    	return (result > 0) ? player.name : 'The Monster';
		    }

		    $scope.getMonster = function() {
		    	var e = 0;
		    	if($scope.enemy != null)
		    		e = parseInt($scope.enemy.battle) + parseInt($scope.enemy.level);
		    	return parseInt($scope.monster.battle) + parseInt($scope.monster.level) + e;
		    }
		    
		    $scope.getPlayer = function(player) {
		    	var f = 0;
		    	if($scope.friend != null)
		    		f = parseInt($scope.friend.battle) + parseInt($scope.friend.total);
		    	return parseInt(player.battle) + parseInt(player.total) + f;
		    }

		    $scope.victory = function(event, self) {
		    	var i = self.$index;
		    	var m = $(event.target).parentsUntil('.modal.fade').parent();
		    	m.modal('hide');
		    	var j = $scope.friend.index;
		    	players[i].level++;
		    	players[i].total++;
		    	if(i != j) {
		    		players[j].level++;
		    		players[j].total++;
		    	}		    	
		    	reset(i);
		    }

		    $scope.getItemName = function(name) {
		    	name = name.replace(/-/, " ").replace(/\w*/g, function(txt){
		    		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		    	});
		    	return name;
		    }

		    $scope.reset = function(index) {		    	
		    	reset(index);		    	
		    }

		    function reset(index) {
		    	$scope.players[index].battle = 0;
		    	$scope.monster.level = 1;
		    	$scope.monster.battle = 0;
		    	$scope.friend = null;
		    	$scope.enemy = null;
		    }

		}
	);

	return controller;

});
