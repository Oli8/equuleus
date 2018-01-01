const tiles = {
	exit: new Tile(
		'signExit',
		level => {
			// The level is done
			//level.completed = true;
		},
		false,
		false,
		"You need to reach this sign to complete the level."
	),
	box: new Tile(
		'box_brown', 
		false,
		level => {
			// push the box
		},
		false,
		"You can push this object, which is a way to create bridge over water. There is no water yet tho :|"
	),
	ice: new Tile(
		'iceBlock',
		level => {
			// make player slides
		},
		false,
		false,
		"Will makes you slide and unable to move when you are on it."
	),
	water: new Tile(
		"water",
		false,
		false,
		level => {
			// can't move on
		},
		"You can not cross over this tile, you may use a box to create a bridge."
	)
};
