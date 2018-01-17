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
			onPush: (level, levelContainer, pos, dir) => {
				// push the box
				let tile = level.tiles[pos.y][pos.x];
				// check if next tile is available
				if(level[dir](pos) === 0){
					//move box
					// TO DO:
					// function that really move the objet
					// use const moving time
					createjs.Tween.get(levelContainer.getChildAt(levelContainer.getChildIndex(tile.bitmap))).to(
						moveObject(tile.bitmap, dir),
						movingTime,
						createjs.Ease.getPowInOut(1)
					)

					level.tiles[pos.y][pos.x] = 0; // empty level tile
					level.tiles[pos.y + moveActions[dir].y][pos.x + moveActions[dir].x] = tile; // update level
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
			over: level => {
				// make player slide
			}
		}
	),
	water: new Tile(
		"water",
		"You can not cross over this tile, you may use a box to create a bridge."
	)
};
