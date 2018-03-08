const levels = [
	new Level("It's a Box's Box's World", "Oli", [
		["rock", "rock", "rock", "rock", "water", "water", "water", "water", "water"],
		["rock", "start", "exit", 0, "rock", "water", "water", "water", "water"],
		["rock", 0, "box", "box", "rock", "water", "rock", "rock", "rock"],
		["rock", 0, "box", 0, "rock", "water", "rock", "boxSpot", "rock"],
		["rock", "rock", "rock", 0, "rock", "rock", "rock", "boxSpot", "rock"],
		["water", "rock", "rock", 0, 0, 0, 0, "boxSpot", "rock"],
		["water", "rock", 0, 0, 0, "rock", 0, 0, "rock"],
		["water", "rock", 0, 0, 0, "rock", "rock", "rock", "rock"],
		["water", "rock", "rock", "rock", "rock", "water", "water", "water", "water"]
	], 9, 9, "Easy"),
	new Level("Over the Briges", "Oli", [
		["start", 0, 0],
		[0, "box", 0],
		[0, "box", 0],
		[0, 0, "water"],
		["rock", "rock", 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, "water", "water"],
		[0, "water", "exit"],
	], 3, 9, "Easy"),
];