class Tile {

	constructor(image, description, event={}){
		this.image = `img/${image}.png`;
		// What happens when we're over the tile
		this.over = event.over;
		// What happens when we push the tile
		this.onPush = event.onPush;
		// What happens when we're on the same line or column than the tile
		this.onAlign = event.onAlign;
		// What happens when we leave the tile
		this.onLeave = event.onLeave
		this.description = description;
	}	

}
