function init(){

	var stage = new createjs.Stage("canvas");

	var game = {

		buttons: [
			//new Button('Hit', '#fff', 100, 100, () => player.hit()),
		],

		_preload: function(){

		},

		_alert: function(msg){
			/*var alertText = new createjs.Text(msg.msg, '30px Arial', 'orange');
			alertText.x = msg.x || 745;
			alertText.y = 120;
			stage.addChild(alertText);
			createjs.Tween.get(alertText)
				.wait(1000)
				.to({alpha: 0}, 1000, createjs.Ease.getPowInOut(1));*/
		},

		over: function(){

		},

		startScreen: function(){
			setupManifest();
			startPreload();
			console.log('lets go');
			stage.enableMouseOver(10);
			createjs.Ticker.addEventListener('tick', tick);
			createjs.Ticker.setFPS(60);

			var data = new createjs.SpriteSheet({
			"images": imgs.player1_walk_sprite,
			"frames": {"regX": 0, "height": 97, "count": 11, "regY": 0, "width": 72},
			"animations": {
				walk: {
		            frames: [0,1,2,3,4,5,6,7,8,9,10],
		            speed: 0.5,
		        }
			}
			});
			character = new createjs.Sprite(data, "walk");
			character.gotoAndPlay('walk');
			character.x = 5;
			stage.addChild(character);
			//createjs.Sound.registerSound('assets/sounds/sfx_lose.ogg', 'lose');
		},

		start: function(){
			document.onkeydown = handleKeyDown;
			document.onkeyup = handleKeyUp;
		},

		addButtons: function(){
			/*this.buttonContainer = new createjs.Container();
			this.buttonContainer.x = -70;
			this.buttonContainer.y = 500;
			stage.addChild(this.buttonContainer);*/

			/*this.buttons.forEach(function(b){
				var button = new createjs.Text(b.text, '30px Arial', b.color);
				button.x = b.x;
				button.y = b.y;
				var hit = new createjs.Shape();
				hit.graphics.beginFill('#000').drawRect(0, 0, button.getMeasuredWidth(), button.getMeasuredHeight());
				button.hitArea = hit;
				button.alpha = 0.7;
				button.on('mouseover', function(event){
					button.alpha = 1;
					button.cursor = 'Pointer';
				});
				button.on('mouseout', event => button.alpha = 0.7);
				button.addEventListener('click', b.onclick);
				game.buttonContainer.addChild(button);
			});*/
		}

	}

	function tick(){
		stage.update();
		character.x += 1;
	}

	function handleKeyDown(e){

	}

	function handleKeyUp(e){

	}

	game.startScreen();

}
