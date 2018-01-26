class Player {

	constructor(stage, sprite, position, game){
		// TO DO: remove useless property
		this.x = position.x;
		this.y = position.y;
		this.direction = 'right';
		this.orientation = 'right';
		this.state = 'stand';
		this.sprite = sprite;
		this.sprite.x = 5;
		this.sprite.y = 5;
		this.game = game;
		this.next_pos_data = false;
	}

	move(dir, anim='walk'){
		if(this.state !== 'stand' || !this.can_move(dir)) // if we're not standing, we should't run the animation
			return false;

		if(dir == 'left' || dir == 'right'){
			if(dir !== this.orientation) //change orientation
				this.sprite.scaleX *= -1;

			moveObject(this.sprite, dir);
            this.x += (dir === 'right' ? 1 : -1);
			this.orientation = dir;
		}
		else{
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
		}, movingTime);

		if(anim === 'walk')
			this.game.stepContainer.increase();
	}

	can_move(dir){
		let currentTile = this.game.level.tiles[this.y][this.x].tile || 0;
		if(currentTile !== 0){
				if(this.game.handleTileLeaveEvent(tiles[currentTile], {x: this.x, y: this.y}, dir, this) === false){
					return false;
				}
		}

		let newPos = getPos({x: this.x, y: this.y}, dir);
		// check if player in map
		if(!(newPos.x >= 0 && newPos.x < 10 && newPos.y >= 0 && newPos.y < 10)){ //hardcoded bounderies for now
			return false;
		}
		// check next pos tiles
		let nextPos = this.game.level.tiles[newPos.y][newPos.x].tile || 0;
		if(nextPos === 0){ // empty
			this.next_pos_data = false;
			return true;
		} else {
			this.next_pos_data = [tiles[nextPos], newPos, dir, this];
			return this.game.handleTileEventBefore(tiles[nextPos], newPos, dir, this);
		}
	}

}
