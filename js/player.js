class Player {

	constructor(){
		console.log('new player!');
		this.direction = 'right';
		this.orientation = 'right';
		this.state = 'stand';
		var data = new createjs.SpriteSheet({
			"images": imgs.player1_walk_sprite,
			"frames": {"regX": 36, "height": 97, "count": 11, "regY": 0, "width": 72},
			"animations": {
				walk: {
		            frames: [0,1,2,3,4,5,6,7,8,9,10],
		            speed: 0.5,
		        },
		        stand: {
		            frames: [1],
		        }
			}
			});
		this.sprite = new createjs.Sprite(data, "stand");
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
                .to({x: this.sprite.x + (dir === 'right' ? 50 : -50), y: this.sprite.y}, 500, createjs.Ease.getPowInOut(1))

			this.orientation = dir;
		}
		else{
			createjs.Tween.get(this.sprite)
                .to({x: this.sprite.x, y: this.sprite.y + (dir === 'down' ? 50 : -50)}, 500, createjs.Ease.getPowInOut(1))
		}

		this.state = 'walk';
		this.direction = dir;
		this.sprite.gotoAndPlay('walk');
		setTimeout(_ => {
			this.sprite.gotoAndPlay('stand');
			this.state = 'stand';
		}, 500);
	}

}
