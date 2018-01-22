const tiles = {
	exit: new Tile(
		'signExit',
		"You need to reach this sign to complete the level.",
		{
			over: (level, pos, dir, player) => {
				player.game.completed();
			}
		}
	),
	box: new Tile(
		'box_brown', 
		"You can push this object, which is a way to create bridge over water. There is no water yet tho :|",
		{
			onPush: (level, pos, dir, player) => {
				// push the box
				let tile = level.tiles[pos.y][pos.x];

				if(level[dir](pos) === 0){
					moveObject(tile.bitmap, dir, tile_afterMove(level, pos, tile, dir));
					return true;
				} else {
					return false;
				}
			}
		}
	),
	boxSpot: new Tile(
		'box_spot',
		"A box must be placed on this spot in order to allow you to exit the level.",
		{
			over: level => {
				// check if box
			}
		}
	),
	ice: new Tile(
		'iceBlock',
		"Will make you slide and unable to move when you are on it.",
		{
			over: (level, pos, dir, player) => {
				console.log('ice');
				// make player slide
				let next_pos = level[dir](pos);
				// TO DO: brainstorm about how we gonna handle the "ground like" tile
				if(next_pos === 0 || ['ice', 'boxSpot'].includes(next_pos.tile)){
					l('can slide');
					player.move(dir, 'slide');
				}
				return true;
			}
		}
	),
	water: new Tile(
		"water",
		"You can not cross over this tile, you may use a box to create a bridge."
	),
	arrow_up: new Tile(
		"arrow_up",
		"You can only walk over this tile on way",
		{
			onPush: (level, pos, dir, player) => {
				return dir === "up";
			},
		}
	),
	arrow_right: new Tile(
		"arrow_right",
		"You can only walk over this tile on way",
		{
			onPush: (level, pos, dir, player) => {
				return dir === "right";
			},
		}
	),
	arrow_down: new Tile(
		"arrow_down",
		"You can only walk over this tile on way",
		{
			onPush: (level, pos, dir, player) => {
				return dir === "down";
			},
		}
	),
	arrow_left: new Tile(
		"arrow_left",
		"You can only walk over this tile on way",
		{
			onPush: (level, pos, dir, player) => {
				return dir === "left";
			},
		}
	),
};
