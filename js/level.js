class Level {

	constructor(title, author, tiles, difficulty="Unknown"){
		this.title = title;
		this.author = author;
		// array describing the map of the level
		this.tiles = tiles;
		this.difficulty = difficulty;
	}

	up(pos){
		try {
			return getTile(this.tiles, pos.x, pos.y-1);
		} catch(error) {
			return false;
		}
	}

	right(pos){
		try {
			return getTile(this.tiles, pos.x+1, pos.y);
		} catch(error) {
			return false;
		}
	}

	down(pos){
		try {
			return getTile(this.tiles, pos.x, pos.y-1);
		} catch(error) {
			return false;
		}
	}

	left(pos){
		try {
			return getTile(this.tiles, pos.x-1, pos.y);
		} catch(error) {
			return false;
		}
	}

}
