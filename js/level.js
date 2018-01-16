class Level {

	constructor(title, author, tiles, difficulty="Unknown"){
		this.title = title;
		this.author = author;
		// array describing the map of the level
		this.tiles = tiles;
		this.difficulty = difficulty;
	}

	/* TO DO: those will make an error if the y is undefined */
	up(pos){
		return this.tiles[pos.y-1][pos.x];
	}

	right(pos){
		return this.tiles[pos.y][pos.x+1];
	}

	down(pos){
		return this.tiles[pos.y+1][pos.x];
	}

	left(pos){
		return this.tiles[pos.y][pos.x-1];
	}

}
