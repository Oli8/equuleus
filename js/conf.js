const width = 680;
const height = 710;

const map = {
	width: 640,
	height: 640,
	// 10 * 10 level
	tiles_w: 64,
	tiles_h: 64,
};

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

const movingTime = 500;

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

	ground: 'img/medievalTile_15.png'
};

const messages = {
	
};

const moveActions = {left: {x: -1, y: 0}, right: {x: 1, y: 0}, down: {x: 0, y: 1}, up: {x: 0, y: -1}};

// after move callback param ?
// would allow us to update level matrix
// and player coords
function moveObject(bitmap, dir){
	let pos = {x: bitmap.x, y: bitmap.y};

	switch(dir){
		case "up":
			pos.y -= map.tiles_h;
			break;
		case "right":
			pos.x += map.tiles_w;
			break;
		case "down":
			pos.y += map.tiles_h;
			break;
		case "left":
			pos.x -=  map.tiles_w;
			break;
	}

	createjs.Tween.get(bitmap).to(
		pos,
		movingTime,
		createjs.Ease.getPowInOut(1)
	)
}

// Utils
createjs.Text.prototype.center = function(x = true, y = false){
	var bounds = this.getBounds();
	if(x) this.x = (width / 2) - (bounds.width / 2);
	if(y) this.y = (height / 2) - (bounds.height / 2);
};

function rand(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function l(){
	console.log(...arguments);
}

function t(v){
	console.table(v);
}
