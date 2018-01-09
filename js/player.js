class Player {

	static MOVING(){
		return {
			time: 500
		};
	}

	constructor(sprite, stage){
		console.log(map.tiles_w)
		console.log('new player!');
		this.stage = stage;
		this.direction = 'right';
		this.orientation = 'right';
		this.state = 'stand';
		this.sprite = sprite;
		this.sprite.x = 5;
		this.sprite.y = 5;
	}

	move(dir){
		if(this.state !== 'stand') // if we're not standing, we should't run the animation
			return false;

		l('movin ' + dir + ' from ' + this.direction)
		l(this.stage.getChildIndex(this.sprite))
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
		}

		this.state = 'walk';
		this.direction = dir;
		this.sprite.gotoAndPlay('walk');
		setTimeout(_ => {
			this.sprite.gotoAndPlay('stand');
			this.state = 'stand';
		}, this.constructor.MOVING().time);
	}

}
