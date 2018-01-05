const width = 720;
const height = 680;

const keys = {
	direction: {
		left: 37,
		right: 39,
		up: 38,
		down: 40
	},
	fire: [32, 17],
	pause: [27, 80],
	enter: 13
};

const imgs = {
	
	get: function(){
		return ``;
	},

	player1_walk_sprite: [
		{id: 'sprite_0', src:"img/Player/p1_walk/PNG/p1_walk01.png"},
		{id: 'sprite_1', src:"img/Player/p1_walk/PNG/p1_walk02.png"},
		{id: 'sprite_2', src:"img/Player/p1_walk/PNG/p1_walk03.png"},
		{id: 'sprite_3', src:"img/Player/p1_walk/PNG/p1_walk04.png"},
		{id: 'sprite_4', src:"img/Player/p1_walk/PNG/p1_walk05.png"},
		{id: 'sprite_5', src:"img/Player/p1_walk/PNG/p1_walk06.png"},
		{id: 'sprite_6', src:"img/Player/p1_walk/PNG/p1_walk07.png"},
		{id: 'sprite_7', src:"img/Player/p1_walk/PNG/p1_walk08.png"},
		{id: 'sprite_8', src:"img/Player/p1_walk/PNG/p1_walk09.png"},
		{id: 'sprite_9', src:"img/Player/p1_walk/PNG/p1_walk10.png"},
		{id: 'sprite_10', src:"img/Player/p1_walk/PNG/p1_walk11.png"}
	],
};

const messages = {
	
};

// Utils
createjs.Text.prototype.center = function(x = true, y = false){
	var bounds = this.getBounds();
	if(x) this.x = (width / 2) - (bounds.width / 2);
	if(y) this.y = (height / 2) - (bounds.height / 2);
};

function rand(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function l(v){
	console.log(v);
}

function t(v){
	console.table(v);
}
