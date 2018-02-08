function init(){

	var stage = new createjs.Stage("canvas");

	var game = {

		loadGround: function(){
			let ground = new createjs.Shape();
			let groundImg = new Image();
			groundImg.src = imgs.ground;
			ground.graphics.beginBitmapFill(groundImg);
			ground.graphics.drawRect(0, 0, map.width, map.height);
			this.levelContainer.addChild(ground);
		},

		levelContainer: (_ => {
			let levelContainer = new createjs.Container();
			levelContainer.x = 20;
			levelContainer.y = 50;

			stage.addChild(levelContainer);
			return levelContainer;
		})(),

		level: new Level("demo", "Oli", [
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
		"hard af"),

		randomizeLevel: function(){
			for(let i=rand(15, 60); i>=0; i--){
				let [y, x] = [rand(0, 9), rand(0, 9)];
				if((x === 0 && y === 0) || (x === 9 && y === 9))
					continue;
				let tiles_keys = Object.keys(tiles).filter(t => t !== "exit");
				this.level.tiles[y][x] = tiles_keys[rand(0, tiles_keys.length-1)];
			}
		},

		loadLevel: function(){
			let levelTitle = new createjs.Text(this.level.title, ...font.format());
			levelTitle.x = height / 2 - this.level.title.length * 10;
			levelTitle.y = 15;
			stage.addChild(levelTitle);
			this.level.tiles.forEach((line, y) => {
				line.forEach((tile, x) => {
					let levelTile = {ground: 0, obj: 0};
					if(tile !== 0){
						let tileObject = tiles[tile];
						let tileBitmap = new createjs.Bitmap(tileObject.image);
						tileBitmap.x = x * map.tiles_w;
						tileBitmap.y = y * map.tiles_h;
						if(tileObject.ground){
							this.levelContainer.addChildAt(tileBitmap, 1);
							levelTile.ground = {bitmap: tileBitmap, tile: tile};
						} else {
							this.levelContainer.addChildAt(tileBitmap, this.levelContainer.numChildren);
							levelTile.obj = {bitmap: tileBitmap, tile: tile};
						}
						this.level.tiles[y][x] = levelTile;
					} else {
						this.level.tiles[y][x] = levelTile;
					}
				})
			})
		},

		stepContainer: (_ => {
			let stepCounter = new createjs.Text(0, ...font.format());
			stepCounter.x = width - 50;
			stepCounter.y = 15;
			stage.addChild(stepCounter);
			return {
				container: stepCounter,
				increase: function(){
					this.container.text++;
				}
			};
		})(),
		/* ***** Loading related methods ***** */
		setupManifest: function(images){
		    for(var i in images)
				typeof images[i] == 'string' ? this.manifest.push({src: images[i]}) : this.setupManifest(images[i]);
		},

		_preload: function(){
			this.manifest = [];
			this.setupManifest(imgs);
			preload = new createjs.LoadQueue(false);
		    preload.installPlugin(createjs.Sound);
		    preload.on("fileload", this.handleFileLoad);
		    preload.on("progress", this.handleFileProgress);
		    preload.on("complete", this.setup.bind(this));
		    preload.on("error", this.loadError);
		    preload.loadManifest(this.manifest);
		},

		handleFileLoad: function(event){
			l(`File loaded -> ${event.item.src}`);
		},

		handleFileProgress: function(){

		},

		loadError: function(){

		},
		/* ***** ***** */
		setup: function(){
			console.log('lets go');
			stage.enableMouseOver(10);
			createjs.Ticker.addEventListener('tick', tick);
			createjs.Ticker.setFPS(60);

			this.loadGround();

			this.player1 = this.addPlayer();
			this.start();
		},

		start: function(){
			document.onkeydown = handleKeyDown;
			document.onkeyup = handleKeyUp;
			this.randomizeLevel()
			this.loadLevel();
			let alien = this.player1.sprite;
			// FIX ME: getBounds might causes an error
			try {
				alien.y = -(alien.getBounds().height / 2);
			} catch(error) {
				alien.y = -48;
			}
			alien.x = 35;
			this.levelContainer.addChild(alien);
		},

		addPlayer: function(){
			let player_sprite = new createjs.SpriteSheet({
				images: imgs.player1_walk_sprite,
				frames: {
					regX: 36,
					height: 97,
					count: imgs.player1_walk_sprite.length,
					regY: 0,
					width: 72
				},
				animations: {
					walk: {
						frames: [0,1,2,3,4,5,6,7,8,9,10],
						speed: 0.5,
			        },
			        slide: {
						frames: [11],
			        },
			        stand: {
						frames: [1],
			        }
				}
			});
			let sprite = new createjs.Sprite(player_sprite, "stand");
			return new Player(sprite, {x: 0, y: 0}, this);
		},

		completed: function(){
			// TO DO: replace with our custom alert
			alert(`Level completed ! in ${this.stepContainer.container.text} step`);
		},

		handleTileLeaveEvent: function(tile, tilePos, direction, player){
			if(tile.onLeave !== undefined){
				return tile.onLeave(this.level, tilePos, direction, player);
			}
			return true;
		},

		handleTileEventBefore: function(tile, tilePos, direction, player){
			// return a boolean wether we can move or not
			console.log('tile', tile);
			// events that need to be checked before a move
			// TO DO: update multi event to not stop when true
			// need to handle event with obj + ground
			let events = ['onPush'];
			for(let i in events){
				if(tile[events[i]] !== undefined){
					l(events[i] + ' event');
					return tile[events[i]](this.level, tilePos, direction, player);
					//if(tile[events[i]](this.level, tilePos, direction, player) === false)
						//return false;
				}
			}

			return true;
		},

		handleTileEventAfter: function(tile, tilePos, direction, player){
			// return a boolean wether we can move or not
			console.log('tile event after', tile);
			// events that need to be checked after a move
			let events = ['over'];
			for(let i in events){
				if(tile[events[i]] !== undefined){
					l(events[i] + ' event');
					return tile[events[i]](this.level, tilePos, direction, player);
				}
			}

			return true;
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
