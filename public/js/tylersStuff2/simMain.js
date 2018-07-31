let SG = {
	"Board" : undefined,
	"Canvas"  : document.getElementById("simCanvas"),
	"GameObjects" : [],
	"TankObjects" : [],
	"gameInterval" : 250,
	"GameLength" : 1000,
	"SVGTiles" : {},
	"GameController" : undefined,
	"TileList" : [
		"Tank0.svg","Tank1.svg","Tank2.svg","Tank3.svg",
		"Tank4.svg","Tank5.svg","Tank6.svg","Tank7.svg",
		"rubble.svg","Wall.svg","Barrier.svg"
		],
	"SVGFilePath" : "../SVG/",
	"boardWidth" : undefined,
	"boardHeight" : undefined,
	"tileSize" : 25,
}
for (var i = 0; i <= 37; i++) { SG.TileList.push("tile" + i + ".bmp");}
SG["cvHeight"] = SG.Canvas.height;
SG["cvWidth"] = SG.Canvas.width;
SG["ctx"] = SG.Canvas.getContext("2d");
SG["tileCheckOff"] = new Array(SG.TileList.length);

var imageLoadCheckOff = (tankTileIndex) => {
	SG.tileCheckOff[tankTileIndex] = 1;
	for (var i of SG.tileCheckOff) {
		if (i == true) {
			continue;
		}
		return;
	}
	animate();
}

function tileLoader () {
	var tankTiles = [];
	for (var tileFile of SG.TileList) {
		tankTiles.push(new Image());
		tankTiles[tankTiles.length - 1].onload = imageLoadCheckOff(tankTiles.length - 1);
		tankTiles[tankTiles.length - 1].src = SG.SVGFilePath + tileFile;
		SG.SVGTiles[tileFile] = tankTiles[tankTiles.length - 1];
	}	
}

// animation : always running loop.

function animate() {
  	// call again next time we can draw
  	requestAnimationFrame(animate);
  	// clear canvas
  	SG.ctx.clearRect(0, 0, SG.cvWidth, SG.cvHeight);
  	// draw gameObjects
  	for (var obj of SG.GameObjects) {
  		if (obj.hasOwnProperty('tileID')) {
  			console.log(obj);
	  		SG.ctx.drawImage(SG.SVGTiles[obj.tileID], obj.x * 25, obj.y * 25, 25, 25);
		}
	}
	
  	// everyObject[0] = tunk.x * 30;
  	// everyObject[1] = tunk.y * 30;
  	// var o = everyObject;
  	// ctx.fillStyle = o[4];
  	// ctx.fillRect(o[0], o[1], o[2], o[3]);
}

function BuildSim () {
	tileLoader();

	SG.GameController = new GameController(SG.gameInterval, SG.GameLength);
	SG.boardWidth = 25;
	SG.boardHeight = 25;
	SG.Board = new Map(SG.boardHeight, SG.boardWidth, undefined); // add ssv map or use rngmap.js

}