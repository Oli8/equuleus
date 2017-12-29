class Level {

	constructor(title, author, tiles, difficulty){
		this.title = title;
		this.author = author;
		// array describing the map of the level
		this.tiles = tiles;
		this.difficulty = difficulty || "Unknown";
	}

}
