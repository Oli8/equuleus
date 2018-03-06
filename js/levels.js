const levels = [
	new Level("Boxes", "Oli", [
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
];