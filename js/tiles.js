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
			onPush: level => {
				// push the box
			}
		}
	),
	ice: new Tile(
		'iceBlock',
		"Will makes you slide and unable to move when you are on it.",
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
