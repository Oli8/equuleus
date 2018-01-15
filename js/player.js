class Player {

	static MOVING(){
		return {
			time: 500
		};
	}

	constructor(stage, sprite, position, game){
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
	}

	move(dir){
		if(this.state !== 'stand' || !this.can_move(dir)) // if we're not standing, we should't run the animation
			return false;

		l('x: ' + this.x + ' y: ' + this.y);
		l('movin ' + dir + ' from ' + this.direction)
		if(dir == 'left' || dir == 'right'){
			if(dir !== this.orientation) //change orientation
				this.sprite.scaleX *= -1;

			createjs.Tween.get(this.sprite)
                .to({
					x: this.sprite.x + (dir === 'right' ? map.tiles_w : -map.tiles_w),
					y: this.sprite.y
				},
				this.constructor.MOVING().time,
				createjs.Ease.getPowInOut(1))

            this.x += (dir === 'right' ? 1 : -1);
			this.orientation = dir;
		}
		else{
			createjs.Tween.get(this.sprite)
                .to({
					x: this.sprite.x,
					y: this.sprite.y + (dir === 'down' ? map.tiles_h : -map.tiles_h)
				},
				this.constructor.MOVING().time,
				createjs.Ease.getPowInOut(1))

			this.y += (dir === 'down' ? 1 : -1);
		}

		this.state = 'walk';
		this.direction = dir;
		this.sprite.gotoAndPlay('walk');
		setTimeout(_ => {
			this.sprite.gotoAndPlay('stand');
			this.state = 'stand';
		}, this.constructor.MOVING().time);
	}

	can_move(dir){
		let actions = {left: {x: -1, y: 0}, right: {x: 1, y: 0}, down: {x: 0, y: 1}, up: {x: 0, y: -1}};
		let new_x = this.x + actions[dir].x;
		let new_y = this.y + actions[dir].y;

		l('pos: ', new_y, new_x);
		// check if player in map
		if(!(new_x >= 0 && new_x < 10 && new_y >= 0 && new_y < 10)){ //hardcoded bounderies for now
			return false;
		}
		// check next pos tiles
		let next_pos = this.game.level.tiles[new_y][new_x].tile || 0;
		l('next pos:', next_pos);
		if(next_pos === 0){ // empty
			return true;
		} else {
			this.game.handleTileEvent(tiles[next_pos], {x: new_x, y: new_y}, dir);
		}

		return true;
	}

}
