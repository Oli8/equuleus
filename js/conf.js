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
	pause: [27, 80],
	enter: 13
};

const oppositeDirections = {
	left: 'right',
	right: 'left',
	up: 'down',
	down: 'up',
};

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
		"img/Player/p1_slide.png"
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

const moveActions = {
	left: {x: -1, y: 0},
	right: {x: 1, y: 0},
	down: {x: 0, y: 1},
	up: {x: 0, y: -1}
};

function getPos(currentPos, dir){
	return {
		x: currentPos.x + moveActions[dir].x,
		y: currentPos.y + moveActions[dir].y
	};
}

/* return 0 if empty
or the tile obj property if defined
else return the ground property */
function getTile(level, x, y){
	let tile = level[y][x];
	return (tile.obj || tile.ground) || 0;
}

function tile_afterMove(level, pos, tile, dir){
	return _ => {
		// the box has moved so we remove it
		level.tiles[pos.y][pos.x].obj = 0;
		// edit the tile where the box has been pushed
		level.tiles[pos.y + moveActions[dir].y][pos.x + moveActions[dir].x].obj = tile;
	};
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
