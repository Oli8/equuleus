const levels = [
	new Level("It's a Box's Box's World", "Oli", [
		["start", 0, 0, "rock", "water", "water", "water"],
		[0, "box", "box", "rock", "water", "rock", "rock"],
		[0, "box", 0, "rock", "water", "rock", "boxSpot"],
		["rock", "rock", 0, "rock", "rock", "rock", "boxSpot"],
		["rock", "rock", 0, 0, 0, 0, "boxSpot"],
		["rock", 0, 0, 0, "rock", "exit", 0],
		["rock", 0, 0, 0, "rock", "rock", "rock"],
	], 7, 7, "Easy"),
	new Level("Over the Bridge", "Oli", [
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
	new Level("Laser", "Jé", [
		["start", 0, 0, 0],
		["rock", 0, "box", 0],
		["laser", 0, 0, 0],
		[0, "box", "exit", 0],
	], 4, 4, "Easy"),
];