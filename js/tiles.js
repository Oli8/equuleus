const tiles = {
	exit: new Tile(
		'signExit',
		"You need to reach this sign to complete the level.",
		{
			over: (level, pos, dir, player) => {
				player.game.completed();
			}
		},
		{
			walkable: true,
		}
	),
	box: new Tile(
		'box_brown', 
		"You can push this object, which is a way to create bridge over water. There is no water yet tho :|",
		{
			onPush: function(level, pos, dir, player){
				// push the box
				let tile = getTile(level.tiles, pos.x, pos.y);
				let nextPos = level[dir](pos);
				l('push next pos', nextPos);
				if(nextPos === 0){
					moveObject(tile.bitmap, dir, tile_afterMove(level, pos, tile, dir));
					return true;
					}
				else if(tiles[nextPos.tile].walkable === true &&
					(tiles[nextPos.tile].onPush === undefined || tiles[nextPos.tile].onPush(...arguments))){
					// TO DO:
					// edit pos in the onPush above call
					moveObject(tile.bitmap, dir, tile_afterMove(level, pos, tile, dir));
					// launch the over event ?
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
		},
		{
			walkable: true,
			ground: true,
		}
	),
	ice: new Tile(
		'iceBlock',
		"Will make you slide and unable to move when you are on it.",
		{
			over: (level, pos, dir, player) => {
				let next_pos = level[dir](pos);
				// TO DO
				// if we hit a box
				// the box will move but not the player as player.move won't be called
				let nextPosCoord = getPos(pos, dir);
				if(next_pos === 0 ||
					(tiles[next_pos.tile].onPush === undefined
						|| tiles[next_pos.tile].onPush(level, nextPosCoord, dir, player))
					&& tiles[next_pos.tile].walkable){
					// need to edit pos in the above onPush call ?
					l('can slide');
					player.move(dir, 'slide');
				}
				return true;
			}
		},
		{
			walkable: true,
			ground: true,
		}
	),
	water: new Tile(
		"water",
		"You can not cross over this tile, you may use a box to create a bridge.",
		{},
		{
			ground: true,
		}
	),
	arrow_up: new Tile(
		"arrow_up",
		"You can only walk over this tile one way",
		{
			onPush: (level, pos, dir, player) => {
				return dir !== oppositeDirections.up;
			},
			onLeave: (level, pos, dir, player) => {
				return dir === "up";
			},
		},
		{
			walkable: true,
			ground: true,
		}
	),
	arrow_right: new Tile(
		"arrow_right",
		"You can only walk over this tile one way",
		{
			onPush: (level, pos, dir, player) => {
				return dir !== oppositeDirections.right;
			},
			onLeave: (level, pos, dir, player) => {
				return dir === "right";
			},
		},
		{
			walkable: true,
			ground: true,
		}
	),
	arrow_down: new Tile(
		"arrow_down",
		"You can only walk over this tile one way",
		{
			onPush: (level, pos, dir, player) => {
				return dir !== oppositeDirections.down;
			},
			onLeave: (level, pos, dir, player) => {
				return dir === "down";
			},
		},
		{
			walkable: true,
			ground: true,
		}
	),
	arrow_left: new Tile(
		"arrow_left",
		"You can only walk over this tile one way",
		{
			onPush: (level, pos, dir, player) => {
				return dir !== oppositeDirections.left;
			},
			onLeave: (level, pos, dir, player) => {
				return dir === "left";
			},
		},
		{
			walkable: true,
			ground: true,
		}
	),
};
