const tiles = {
	exit: new Tile(
		'signExit',
		"You need to reach this sign to complete the level.",
		{
			over: level => {
				// The level is done
				//level.completed();
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
				if(next_pos === 0 || next_pos.tile === 'ice'){
					l('can slide');
					// TO DO: create method slide and change anim
					player.move(dir); // dont' do this :|
				}
				return true;
			}
		}
	),
	water: new Tile(
		"water",
		"You can not cross over this tile, you may use a box to create a bridge."
	)
};
