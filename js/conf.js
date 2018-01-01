const width = 1100;
const height = 650;

const keys = {
	direction: {
		left: 37,
		right: 39,
		up: 38,
		down: 40
	},
	fire: [32, 17],
	pause: [27, 80],
	enter: 13
};

const imgs = {
	
	get: function(){
		return ``;
	},

	player1_walk_sprite: ["img/Player/p1_walk/PNG/p1_walk01.png",
			"img/Player/p1_walk/PNG/p1_walk02.png",
			"img/Player/p1_walk/PNG/p1_walk03.png",
			"img/Player/p1_walk/PNG/p1_walk04.png",
			"img/Player/p1_walk/PNG/p1_walk05.png",
			"img/Player/p1_walk/PNG/p1_walk06.png",
			"img/Player/p1_walk/PNG/p1_walk07.png",
			"img/Player/p1_walk/PNG/p1_walk08.png",
			"img/Player/p1_walk/PNG/p1_walk09.png",
			"img/Player/p1_walk/PNG/p1_walk10.png",
			"img/Player/p1_walk/PNG/p1_walk11.png"],
};

const messages = {
	
};

function startPreload() {
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
}

function handleFileLoad(event) {
    console.log("A file has loaded of type: " + event.item.type);
    if(event.item.id == "logo"){
        console.log("Logo is loaded");
        //create bitmap here
    }
}

function loadError(evt) {
    console.log("Error!", evt.text);
}

function handleFileProgress(event) {
    //progressText.text = (preload.progress*100|0) + " % Loaded";
    //stage.update();
}

function loadComplete(event) {
    console.log("Finished Loading Assets");
}

function setupManifest() {
    manifest = [];
    for(var i in imgs.player1_walk_sprite)
        manifest.push({src: imgs.player1_walk_sprite[i], id: "sprite" + i})
}

// Utils
createjs.Text.prototype.center = function(x = true, y = false){
	var bounds = this.getBounds();
	if(x) this.x = (width / 2) - (bounds.width / 2);
	if(y) this.y = (height / 2) - (bounds.height / 2);
};

function rand(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function l(v){
	console.log(v);
}

function t(v){
	console.table(v);
}
