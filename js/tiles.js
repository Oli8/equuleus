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
			onPush: (level, pos, dir, player) => {
				level.tiles[pos.y][pos.x].obj.bitmap.alpha = 1;
				let tile = getTile(level.tiles, pos.x, pos.y);
				let nextPos = level[dir](pos);
				let nextPosCoord = getPos(pos, dir);
				if(nextPos === 0){
					moveObject(tile.bitmap, dir, tile_afterMove(level, pos, tile, dir))
						.then(_ => level.checkBoxSpot())
					return true;
				}
				else if(tiles[nextPos.tile].ground === true &&
					(tiles[nextPos.tile].onPush === undefined
						|| tiles[nextPos.tile].onPush(level, nextPosCoord, dir, player))){
					moveObject(tile.bitmap, dir, tile_afterMove(level, pos, tile, dir))
						.then(_ => {
							l('promise then');
							if(tiles[nextPos.tile].over !== undefined)
								tiles[nextPos.tile].over(level, nextPosCoord, dir,
									{tile: 'box', game: player.game});
							level.checkBoxSpot();
						});
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
			over: (level, pos, dir, obj) => {
				if(obj.tile === 'box'){
					console.log("boxspot validated");
					level.tiles[pos.y][pos.x].obj.bitmap.alpha = 0.6;
				}
			}
		},
		{
			walkable: true,
			ground: true,
		}
	),
	bridge: new Tile(
		'crate_42',
		"Box over water",
		{},
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
		{
			over: (level, pos, dir, obj) => {
				l('water over event from', obj);
				if(obj.tile === 'box'){
					l('create bridge');
					// change water to bridge
					// remove box
					obj.game.levelContainer.removeChild(
						level.tiles[pos.y][pos.x].obj.bitmap);
					level.tiles[pos.y][pos.x].obj = 0;
					// add bridge
					level.tiles[pos.y][pos.x].ground.bitmap.image.src = tiles["bridge"].image;
					level.tiles[pos.y][pos.x].ground.tile = "bridge";
				}
			}
		},
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
	rock: new Tile(
		"grey_rock",
		"A tile you can not walk on nor move",
		{
			onPush: (level, pos, dir, player) => false
		}
	),
};
