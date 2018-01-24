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

const oppositeDirections = {
	left: 'right',
	right: 'left',
	up: 'down',
	down: 'up',
}

const movingTime = 500;

const imgs = {
	player1_walk_sprite: [
		"img/Player/p1_walk/PNG/p1_walk01.png",
		"img/Player/p1_walk/PNG/p1_walk02.png",
		"img/Player/p1_walk/PNG/p1_walk03.png",
		"img/Player/p1_walk/PNG/p1_walk04.png",
		"img/Player/p1_walk/PNG/p1_walk05.png",
		"img/Player/p1_walk/PNG/p1_walk06.png",
		"img/Player/p1_walk/PNG/p1_walk07.png",
		"img/Player/p1_walk/PNG/p1_walk08.png",
		"img/Player/p1_walk/PNG/p1_walk09.png",
		"img/Player/p1_walk/PNG/p1_walk10.png",
		"img/Player/p1_walk/PNG/p1_walk11.png",
		"img/Player/p1_jump.png"
	],

	ground: 'img/medievalTile_15.png',
	tiles: Object.values(tiles).map(t => t.image),
};

const font = {
	name: 'Arial',
	size: 20,
	color: '#FFF',
	format: function(){
		return [`${this.size}px ${this.name}`, this.color];
	}
};

const moveActions = {left: {x: -1, y: 0}, right: {x: 1, y: 0}, down: {x: 0, y: 1}, up: {x: 0, y: -1}};

function tile_afterMove(level, pos, tile, dir){
	// TO DO:
	// need to make it work with several tile on one pos
	// -> remove tile from the level
	// and add it to its new pos
	// use a array or something
	return _ => {
		level.tiles[pos.y][pos.x] = 0;
		level.tiles[pos.y + moveActions[dir].y][pos.x + moveActions[dir].x] = tile;
	}
}

function moveObject(bitmap, dir, afterMoveCb=false){
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

	if(afterMoveCb !== false)
		afterMoveCb();
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
