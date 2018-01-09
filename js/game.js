function init(){

	var stage = new createjs.Stage("canvas");

	var game = {

		levelContainer: (_ => {
			let levelContainer = new createjs.Container();
			levelContainer.x = 20;
			levelContainer.y = 50;

			stage.addChild(levelContainer);
			return levelContainer;
		})(),

		level: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, "exit"]
		],

		randomizeLevel: function(){
			for(let i=rand(15, 60); i>=0; i--){
				let [y, x] = [rand(0, 9), rand(0, 9)];
				if((x === 0 && y === 0) || (x === 9 && y === 9))
					continue;
				this.level[y][x] = Object.keys(tiles).filter(t => t !== "exit")[rand(0, 2)];
			}
		},

		loadLevel: function(){
			this.level.forEach((line, y) => {
				line.forEach((tile, x) => {
					/*
					let ground = new createjs.Bitmap("img/medievalTile_15.png");
					ground.x = x * map.tiles_w;
					ground.y = y * map.tiles_h;
					this.levelContainer.addChild(ground);
					this.levelContainer.setChildIndex(ground, 0);
					*/
					if(tile !== 0){
						let t = new createjs.Bitmap(tiles[tile].image);
						t.x = x * map.tiles_w;
						t.y = y * map.tiles_h;
						this.levelContainer.addChild(t);
						this.levelContainer.setChildIndex(t, 1);
					}
				})
			})
		},
		/* ***** Loading related methods ***** */
		setupManifest: function(){
		    this.manifest = [];
		    for(var i in imgs.player1_walk_sprite)
		        this.manifest.push({src: imgs.player1_walk_sprite[i].src, id: imgs.player1_walk_sprite[i].id})

		    this.manifest.push('img/medievalTile_15.png');
		},

		_preload: function(){
			console.log('preload');
			this.setupManifest();
			preload = new createjs.LoadQueue(false); // (false, null, true)
		    preload.installPlugin(createjs.Sound);
		    preload.on("fileload", this.handleFileLoad);
		    preload.on("progress", this.handleFileProgress);
		    preload.on("complete", this.setup.bind(this));
		    preload.on("error", this.loadError);
		    preload.loadManifest(this.manifest);
		},

		handleFileLoad: function(event){
			console.log("File loaded : " + event.item.id);
		},

		handleFileProgress: function(){

		},

		loadComplete: function(){

		},

		loadError: function(){

		},
		/* ***** ***** */
		setup: function(){
			console.log('lets go');
			stage.enableMouseOver(10);
			createjs.Ticker.addEventListener('tick', tick);
			createjs.Ticker.setFPS(60);

			// let ground = new createjs.Rectangle(20, 50, 700, 700);
			// stage.addChild(ground);
			let ground = new createjs.Shape();
			let groundImg = new Image();
			groundImg.src = 'img/medievalTile_15.png';
			ground.graphics.beginBitmapFill(groundImg);
			ground.graphics.drawRect(20, 50, 700, 700);
			ground.graphics.endFill();
			stage.addChild(ground);


			let sprite_images = [];
			for(var i in imgs.player1_walk_sprite) //store preloaded sprite images
				sprite_images.push(preload.getResult(imgs.player1_walk_sprite[i].id))

			let data_sprite = new createjs.SpriteSheet({
			"images": sprite_images,
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
			sprite = new createjs.Sprite(data_sprite, "stand");
			this.player1 = new Player(sprite, stage);
			let alien = this.player1.sprite;
			alien.y = -(alien.getBounds().height / 2);
			alien.x = 35;

			this.levelContainer.addChild(alien);
			this.levelContainer.setChildIndex(alien, 2);
			this.start();
			//createjs.Sound.registerSound('assets/sounds/sfx_lose.ogg', 'lose');
		},

		start: function(){
			document.onkeydown = handleKeyDown;
			document.onkeyup = handleKeyUp;
			this.randomizeLevel()
			this.loadLevel();
			l(this.level);
		},
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
// for(let tile in tiles){
// 	let t = tiles[tile];
// 	tile_desc_div.insertAdjacentHTML('beforeend',`
// 		<img src='${t.image}' alt='${tile}'/>
// 		<p>${t.description}</p>
// 	`);
// }
