let SG;
SG = {
	"Board" : undefined,
	"Canvas"  : document.getElementById("simCanvas"),
	"GameObjects" : [],
	"TankObjects" : [],
	"gameInterval" : 250,
	"GameLength" : 1000,
	"SVGTiles" : {},
	"GameController" : undefined,
	"TileList" : ["Tank0.svg",	"Tank1.svg",	"Tank2.svg",	"Tank3.svg",	"Tank4.svg",	"Tank5.svg",	"Tank6.svg",	"Tank7.svg"], 	//"rubble.svg", 	"Wall.svg", "Barrier.svg"],
	"tileCheckOff" : new Array(SG.TileList.length),
	"SVGFilePath" : "../SVG/",
	"ctx" : SG.Canvas.getContext("2d"),
	"cvWidth" : SG.Canvas.width,
	"cvHeight" : SG.Canvas.height,
	"boardWidth" : undefined,
	"boardHeight" : undefined,
	"tileSize" : 25,
}

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
	  		SG.ctx.drawImage(SG.SVGTiles[obj.tileID], obj.x * SG.tileSize, obj.y * SG.tileSize, SG.tileSize, SG.tileSize);
		}
	}
	
  	// everyObject[0] = tunk.x * 30;
  	// everyObject[1] = tunk.y * 30;
  	// var o = everyObject;
  	// ctx.fillStyle = o[4];
  	// ctx.fillRect(o[0], o[1], o[2], o[3]);
}

document.onload = function () {
	tileLoader();

	SG.GameController = new GameController(SG.gameInterval, SG.GameLength);

	SG.Board = new Map(SG.boardHeight, SG.boardWidth, undefined); // add ssv map or use rngmap.js

}