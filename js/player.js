class Player {

	constructor(sprite, position, game){
		// TO DO: remove useless property
		this.x = position.x;
		this.y = position.y;
		this.direction = 'right';
		this.orientation = 'right';
		this.state = 'stand';
		this.sprite = sprite;
		this.sprite.x = 5; // useless ?
		this.sprite.y = 5; // useless ?
		this.game = game;
		this.next_pos_data = false;
	}

	move(dir, anim='walk'){
		if(this.state !== 'stand' || !this.can_move(dir)) // if we're not standing, we should't run the animation
			return false;

		if(dir === 'left' || dir === 'right'){
			if(dir !== this.orientation) //change orientation
				this.sprite.scaleX *= -1;

			moveObject(this.sprite, dir);
            this.x += (dir === 'right' ? 1 : -1);
			this.orientation = dir;
		} else {
			moveObject(this.sprite, dir);
			this.y += (dir === 'down' ? 1 : -1);
		}

		this.state = 'walk';
		this.direction = dir;
		this.sprite.gotoAndPlay(anim);

		setTimeout(_ => {
			this.sprite.gotoAndPlay('stand');
			this.state = 'stand';

			if(this.next_pos_data !== false){
				this.game.handleTileEventAfter(...this.next_pos_data);
			}
			// TO DO: don't call it for every direction all the time
			this.game.handleAlignEvent(this)
		}, movingTime);

		if(anim === 'walk')
			this.game.stepContainer.increase();
	}

	can_move(dir){
		let currentTile = getTile(this.game.level.tiles, this.x, this.y);

		if(currentTile !== 0 && this.game.handleTileLeaveEvent(tiles[currentTile.tile],
					{x: this.x, y: this.y}, dir, this) === false){
			return false;
		}

		let newPos = getPos({x: this.x, y: this.y}, dir);
		// check if player in map
		if(!(newPos.x >= 0 && newPos.x < this.game.level.width
			&& newPos.y >= 0 && newPos.y < this.game.level.height)){
			return false;
		}
		// check next pos tiles
		let nextPos = getTile(this.game.level.tiles, newPos.x, newPos.y);
		if(nextPos === 0){ // empty
			this.next_pos_data = false;
			return true;
		} else {
			this.next_pos_data = [tiles[nextPos.tile], newPos, dir, this];
			return this.game.handleTileEventBefore(tiles[nextPos.tile], newPos, dir, this);
		}
	}

	dies(){
		this.sprite.gotoAndPlay("death");
		setTimeout(this.game.failed, 300);
	}

}
