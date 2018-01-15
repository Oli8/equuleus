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
				let bitmap = level.tiles[pos.y][pos.x].bitmap;
				let index = levelContainer.getChildIndex(bitmap);
				// check if next tile is available
				if(level[dir](pos) === 0){
					//move box
					createjs.Tween.get(levelContainer.getChildAt(index)).to({
							x: bitmap.x + 64
						},
						500,
						createjs.Ease.getPowInOut(1))
					return true;
				}
				return false;
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
