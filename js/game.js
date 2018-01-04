function init(){

	var stage = new createjs.Stage("canvas");

	var game = {

		buttons: [
			//new Button('Hit', '#fff', 100, 100, () => player.hit()),
		],

		setupManifest: function(){
		    manifest = [];
		    for(var i in imgs.player1_walk_sprite)
		        manifest.push({src: imgs.player1_walk_sprite[i], id: "sprite" + i})
		},

		_preload: function(){
			console.log('preload');
			this.setupManifest();
			preload = new createjs.LoadQueue(true);
		    preload.installPlugin(createjs.Sound);
		    preload.on("fileload", this.handleFileLoad);
		    preload.on("progress", this.handleFileProgress);
		    preload.on("complete", this.startScreen.bind(this));
		    preload.on("error", this.loadError);
		    preload.loadManifest(manifest);
		},

		handleFileLoad: function(){

		},

		handleFileProgress: function(){

		},

		loadComplete: function(){

		},

		loadError: function(){

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
			console.log('lets go');
			stage.enableMouseOver(10);
			createjs.Ticker.addEventListener('tick', tick);
			createjs.Ticker.setFPS(60);

			this.player1 = new Player();
			stage.addChild(this.player1.sprite);
			this.start();
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
	}

	function handleKeyDown(e){
		let key = e.keyCode;
		let dir = Object.entries(keys.direction).find(v => v[1] === key);
		if(dir !== undefined)
			game.player1.move(dir[0]);
	}

	function handleKeyUp(e){

	}

	game._preload();

}

var tile_desc_div = document.getElementById("tile-description");
for(let tile in tiles){
	let t = tiles[tile];
	tile_desc_div.insertAdjacentHTML('beforeend',`
		<img src='${t.image}' alt='${tile}'/>
		<p>${t.description}</p>
	`);
}
