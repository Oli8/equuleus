class Player {

	static MOVING(){
		return {
			width: 72,
			height: 97,
			time: 500
		};
	}

	constructor(sprite){
		console.log('new player!');
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
		if(dir == 'left' || dir == 'right'){
			if(dir !== this.orientation) //change orientation
				this.sprite.scaleX *= -1;

			createjs.Tween.get(this.sprite)
                .to({
					x: this.sprite.x + (dir === 'right' ? this.constructor.MOVING().width : -this.constructor.MOVING().width),
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
					y: this.sprite.y + (dir === 'down' ? this.constructor.MOVING().height : -this.constructor.MOVING().height)
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
