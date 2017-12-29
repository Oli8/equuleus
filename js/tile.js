class Tile {

	static doNothing(){
		return _ => null;
	}

	constructor(image, over, onPush, onAlign, description){
		this.image = `img/${image}.png`;
		// What happens when we're over the tile
		this.over = over || this.constructor.doNothing();
		// What happens when we push the tile
		this.onPush = onPush || this.constructor.doNothing();
		// What happens when we're on the same line or column than the tile
		this.onAlign = onAlign || this.constructor.doNothing();
		this.description = description;
	}	

}
