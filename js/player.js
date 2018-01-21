class Player {

	constructor(stage, sprite, position, game){
		// TO DO: remove useless property
		// stage ?
		console.log(map.tiles_w)
		console.log('new player!');
		this.stage = stage; // useless ?
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
	}

	can_move(dir){
		let new_x = this.x + moveActions[dir].x;
		let new_y = this.y + moveActions[dir].y;

		l('pos: ', new_y, new_x);
		// check if player in map
		if(!(new_x >= 0 && new_x < 10 && new_y >= 0 && new_y < 10)){ //hardcoded bounderies for now
			return false;
		}
		// check next pos tiles
		let next_pos = this.game.level.tiles[new_y][new_x].tile || 0;
		l('next pos:', next_pos);
		if(next_pos === 0){ // empty
			this.next_pos_data = false;
			return true;
		} else {
			this.next_pos_data = [tiles[next_pos], {x: new_x, y: new_y}, dir, this];
			return this.game.handleTileEventBefore(tiles[next_pos], {x: new_x, y: new_y}, dir, this);
		}
	}

}
