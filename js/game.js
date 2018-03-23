function init(){

	var stage = new createjs.Stage("canvas");

	var game = {

		loadGround: function(){
			let ground = new createjs.Shape();
			let groundImg = new Image();
			groundImg.src = imgs.ground;
			ground.graphics.beginBitmapFill(groundImg);
			ground.graphics.drawRect(
				this.level.padWidth,
				this.level.padHeight,
				map.tiles_w * this.level.width,
				map.tiles_h * this.level.height
			);
			this.levelContainer.addChild(ground);
		},

		levelContainer: (_ => {
			let levelContainer = new createjs.Container();
			levelContainer.x = 20;
			levelContainer.y = 50;

			stage.addChild(levelContainer);
			return levelContainer;
		})(),

		level: levels[rand(0, levels.length-1)],

		randomizeLevel: function(){
			for(let i=rand(15, 60); i>=0; i--){
				let [y, x] = [rand(0, this.level.height-1), rand(0, this.level.width-1)];
				if(["exit", "start"].includes(this.level.tiles[y][x]))
					continue;
				let tiles_keys = Object.keys(tiles).filter(t => !ignoredTile.includes(t));
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
					/* Why doesn't this works ?
					if(["exit", "start"].includes(tile)){
						this.level[tile + "Pos"] = {x, y};
					}
					*/
					if(tile === 'start')
						this.level.startPos = {x, y};
					else if(tile !== 0){
						let tileObject = tiles[tile];
						let tileBitmap = new createjs.Bitmap(tileObject.image);
						tileBitmap.x = x * map.tiles_w + this.level.padWidth;
						tileBitmap.y = y * map.tiles_h + this.level.padHeight;
						if(tileObject.ground){
							this.levelContainer.addChildAt(tileBitmap, 1);
							levelTile.ground = {bitmap: tileBitmap, tile: tile};
						} else {
							this.levelContainer.addChildAt(tileBitmap, this.levelContainer.numChildren);
							levelTile.obj = {bitmap: tileBitmap, tile: tile};
						}
						if(tileObject.loadOption !== false)
							tileObject.loadOption.bind(this)(tileBitmap, {x, y});
					}
					this.level.tiles[y][x] = levelTile;
				});
			});
			this.level.checkBoxSpot();
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

		loadGiveUpButton: function(){
			let button = new createjs.Text("Give up", ...font.format());
			button.x = 15;
			button.y = 15;
			var hit = new createjs.Shape();
			hit.graphics.beginFill('#000').drawRect(0, 0, button.getMeasuredWidth(), button.getMeasuredHeight());
			button.hitArea = hit;
			button.alpha = 0.7;
			button.on('mouseover', function(event){
				button.alpha = 1;
				button.cursor = 'Pointer';
			});
			button.on('mouseout', event => button.alpha = 0.7);
			button.addEventListener('click', _ => this.giveUp());
			stage.addChild(button);
		},
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

		loadError: function(event){
			console.error(`[Equuleus] Could not load -> ${event.item.src}`);
		},
		/* ***** ***** */
		setup: function(){
			console.log('lets go');
			stage.enableMouseOver(10);
			createjs.Ticker.addEventListener('tick', tick);
			createjs.Ticker.setFPS(60);

			this.level.padWidth = ((10 - this.level.width) * map.tiles_w) / 2;
			this.level.padHeight = ((10 - this.level.height) * map.tiles_h) / 2;

			this.loadGround();
			this.loadGiveUpButton();
			this.start();
		},

		start: function(){
			document.onkeydown = handleKeyDown;

			this.loadLevel();
			this.player1 = this.addPlayer();
			let alien = this.player1.sprite;
			try {
				alien.x = this.level.startPos.x * map.tiles_w + (alien.getBounds().width / 2) + this.level.padWidth;
			} catch(error) {
				alien.x = this.level.startPos.x * map.tiles_w + 36 + this.level.padWidth;
			}
			try {
				alien.y = this.level.startPos.y * map.tiles_h - (alien.getBounds().height / 2) + this.level.padHeight;
			} catch(error) {
				alien.y = this.level.startPos.y * map.tiles_h - 48 + this.level.padHeight;
			}
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
			return new Player(sprite, this.level.startPos, this);
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
		},

		handleAlignEvent: function(player){
			// TO DO: go through the level array from the player position
			// in each four directions and check the onAlign property of the
			// first object met.
			console.log("align event", player, this.level);

			//Factorise code maybe ? :|
			//left
			for(let i = player.x; i >= 0; i--){
				let tile = getTile(this.level.tiles, i, player.y);
				if(tile !== 0) {
					let tileName = tile.tile;
					if(tileName !== 'laser') { // Maybe check if has onAlgin prop ?
						break; // laser can't reach you :o
					}
					else {
						//you dieded :(
						//Trigger onAlign event
						tiles[tileName].onAlign(this.level, {x: i, y: player.y}, 'left', player);
					}
				}
			}

			//right
			for(let i = player.x; i <= this.level.width; i++){
				let tile = getTile(this.level.tiles, i, player.y);
				if(tile !== 0) {
					let tileName = tile.tile;
					if(tileName !== 'laser') {
						break;
					}
					else {
						tiles[tileName].onAlign(this.level, {x: i, y: player.y}, 'right', player);
					}
				}
			}

			//up
			for(let i = player.y; i >= 0; i--){
				let tile = getTile(this.level.tiles, player.x, i);
				if(tile !== 0) {
					let tileName = tile.tile;
					if(tileName !== 'laser') {
						break;
					}
					else {
						tiles[tileName].onAlign(this.level, {x: player.x, y: i}, 'up', player);
					}
				}
			}

			//down
			for(let i = player.y; i <= this.level.height; i++){
				let tile = getTile(this.level.tiles, player.x, i);
				if(tile !== 0) {
					let tileName = tile.tile;
					if(tileName !== 'laser') {
						break;
					}
					else {
						tiles[tileName].onAlign(this.level, {x: player.x, y: i}, 'down', player);
					}
				}
			}

		},

		giveUp: function(){
			location.reload();
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

	game._preload();
}
