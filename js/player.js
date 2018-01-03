class Player {

	constructor(){
		console.log('new player!');
		this.direction = 'right';
		var data = new createjs.SpriteSheet({
			"images": imgs.player1_walk_sprite,
			"frames": {"regX": 0, "height": 97, "count": 11, "regY": 0, "width": 72},
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
		//this.sprite.gotoAndPlay('walk');
		this.sprite.x = 5;
		this.sprite.y = 5;
		this.sprite.scaleX *= -1;
	}

	move(dir){
		l('movin ' + dir + ' from ' + this.direction)
		if(dir == 'left' || dir == 'right'){
			if(dir !== this.direction) //change orientation
				this.sprite.scaleX *= -1;
		}
		this.direction = dir;
		//this.sprite.gotoAndPlay('walk');
	}

}
