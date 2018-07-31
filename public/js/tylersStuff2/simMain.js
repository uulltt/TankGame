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
	//animate();
	console.log("doneloading")
}

SG.SVGTiles["Tank0.svg"] = new Image();
SG.SVGTiles["Tank0.svg"].onload = imageLoadCheckOff(0);
SG.SVGTiles["Tank0.svg"].src = SG.SVGFilePath + "Tank0.svg";
SG.SVGTiles["Tank1.svg"] = new Image();
SG.SVGTiles["Tank1.svg"].onload = imageLoadCheckOff(1);
SG.SVGTiles["Tank1.svg"].src = SG.SVGFilePath + "Tank1.svg";
SG.SVGTiles["Tank2.svg"] = new Image();
SG.SVGTiles["Tank2.svg"].onload = imageLoadCheckOff(2);
SG.SVGTiles["Tank2.svg"].src = SG.SVGFilePath + "Tank2.svg";
SG.SVGTiles["Tank3.svg"] = new Image();
SG.SVGTiles["Tank3.svg"].onload = imageLoadCheckOff(3);
SG.SVGTiles["Tank3.svg"].src = SG.SVGFilePath + "Tank3.svg";
SG.SVGTiles["Tank4.svg"] = new Image();
SG.SVGTiles["Tank4.svg"].onload = imageLoadCheckOff(4);
SG.SVGTiles["Tank4.svg"].src = SG.SVGFilePath + "Tank4.svg";
SG.SVGTiles["Tank5.svg"] = new Image();
SG.SVGTiles["Tank5.svg"].onload = imageLoadCheckOff(5);
SG.SVGTiles["Tank5.svg"].src = SG.SVGFilePath + "Tank5.svg";
SG.SVGTiles["Tank6.svg"] = new Image();
SG.SVGTiles["Tank6.svg"].onload = imageLoadCheckOff(6);
SG.SVGTiles["Tank6.svg"].src = SG.SVGFilePath + "Tank6.svg";
SG.SVGTiles["Tank7.svg"] = new Image();
SG.SVGTiles["Tank7.svg"].onload = imageLoadCheckOff(7);
SG.SVGTiles["Tank7.svg"].src = SG.SVGFilePath + "Tank7.svg";
SG.SVGTiles["tile0.bmp"] = new Image();
SG.SVGTiles["tile0.bmp"].onload = imageLoadCheckOff(8);
SG.SVGTiles["tile0.bmp"].src = SG.SVGFilePath + "tile0.bmp";
SG.SVGTiles["tile1.bmp"] = new Image();
SG.SVGTiles["tile1.bmp"].onload = imageLoadCheckOff(9);
SG.SVGTiles["tile1.bmp"].src = SG.SVGFilePath + "tile1.bmp";
SG.SVGTiles["tile2.bmp"] = new Image();
SG.SVGTiles["tile2.bmp"].onload = imageLoadCheckOff(10);
SG.SVGTiles["tile2.bmp"].src = SG.SVGFilePath + "tile2.bmp";
SG.SVGTiles["tile3.bmp"] = new Image();
SG.SVGTiles["tile3.bmp"].onload = imageLoadCheckOff(11);
SG.SVGTiles["tile3.bmp"].src = SG.SVGFilePath + "tile3.bmp";
SG.SVGTiles["tile4.bmp"] = new Image();
SG.SVGTiles["tile4.bmp"].onload = imageLoadCheckOff(12);
SG.SVGTiles["tile4.bmp"].src = SG.SVGFilePath + "tile4.bmp";
SG.SVGTiles["tile5.bmp"] = new Image();
SG.SVGTiles["tile5.bmp"].onload = imageLoadCheckOff(13);
SG.SVGTiles["tile5.bmp"].src = SG.SVGFilePath + "tile5bmp";
SG.SVGTiles["tile6.bmp"] = new Image();
SG.SVGTiles["tile6.bmp"].onload = imageLoadCheckOff(14);
SG.SVGTiles["tile6.bmp"].src = SG.SVGFilePath + "tile6.bmp";
SG.SVGTiles["tile7.bmp"] = new Image();
SG.SVGTiles["tile7.bmp"].onload = imageLoadCheckOff(15);
SG.SVGTiles["tile7.bmp"].src = SG.SVGFilePath + "tile7.bmp";
SG.SVGTiles["tile8.bmp"] = new Image();
SG.SVGTiles["tile8.bmp"].onload = imageLoadCheckOff(16);
SG.SVGTiles["tile8.bmp"].src = SG.SVGFilePath + "tile8.bmp";
SG.SVGTiles["tile9.bmp"] = new Image();
SG.SVGTiles["tile9.bmp"].onload = imageLoadCheckOff(17);
SG.SVGTiles["tile9.bmp"].src = SG.SVGFilePath + "tile9.bmp";
SG.SVGTiles["tile10.bmp"] = new Image();
SG.SVGTiles["tile10.bmp"].onload = imageLoadCheckOff(18);
SG.SVGTiles["tile10.bmp"].src = SG.SVGFilePath + "tile10.bmp";
SG.SVGTiles["tile11.bmp"] = new Image();
SG.SVGTiles["tile11.bmp"].onload = imageLoadCheckOff(19);
SG.SVGTiles["tile11.bmp"].src = SG.SVGFilePath + "tile11.bmp";
SG.SVGTiles["tile12.bmp"] = new Image();
SG.SVGTiles["tile12.bmp"].onload = imageLoadCheckOff(20);
SG.SVGTiles["tile12.bmp"].src = SG.SVGFilePath + "tile12.bmp";
SG.SVGTiles["tile13.bmp"] = new Image();
SG.SVGTiles["tile13.bmp"].onload = imageLoadCheckOff(21);
SG.SVGTiles["tile13.bmp"].src = SG.SVGFilePath + "tile13.bmp";
SG.SVGTiles["tile14.bmp"] = new Image();
SG.SVGTiles["tile14.bmp"].onload = imageLoadCheckOff(22);
SG.SVGTiles["tile14.bmp"].src = SG.SVGFilePath + "tile14.bmp";
SG.SVGTiles["tile15.bmp"] = new Image();
SG.SVGTiles["tile15.bmp"].onload = imageLoadCheckOff(23);
SG.SVGTiles["tile15.bmp"].src = SG.SVGFilePath + "tile15.bmp";
SG.SVGTiles["tile16.bmp"] = new Image();
SG.SVGTiles["tile16.bmp"].onload = imageLoadCheckOff(24);
SG.SVGTiles["tile16.bmp"].src = SG.SVGFilePath + "tile16.bmp";
SG.SVGTiles["tile17.bmp"] = new Image();
SG.SVGTiles["tile17.bmp"].onload = imageLoadCheckOff(25);
SG.SVGTiles["tile17.bmp"].src = SG.SVGFilePath + "tile17.bmp";
SG.SVGTiles["tile18.bmp"] = new Image();
SG.SVGTiles["tile18.bmp"].onload = imageLoadCheckOff(26);
SG.SVGTiles["tile18.bmp"].src = SG.SVGFilePath + "tile18.bmp";
SG.SVGTiles["tile19.bmp"] = new Image();
SG.SVGTiles["tile19.bmp"].onload = imageLoadCheckOff(27);
SG.SVGTiles["tile19.bmp"].src = SG.SVGFilePath + "tile19.bmp";
SG.SVGTiles["tile20.bmp"] = new Image();
SG.SVGTiles["tile20.bmp"].onload = imageLoadCheckOff(28);
SG.SVGTiles["tile20.bmp"].src = SG.SVGFilePath + "tile20.bmp";
SG.SVGTiles["tile21.bmp"] = new Image();
SG.SVGTiles["tile21.bmp"].onload = imageLoadCheckOff(29);
SG.SVGTiles["tile21.bmp"].src = SG.SVGFilePath + "tile21.bmp";
SG.SVGTiles["tile22.bmp"] = new Image();
SG.SVGTiles["tile22.bmp"].onload = imageLoadCheckOff(30);
SG.SVGTiles["tile22.bmp"].src = SG.SVGFilePath + "tile22.bmp";
SG.SVGTiles["tile23.bmp"] = new Image();
SG.SVGTiles["tile23.bmp"].onload = imageLoadCheckOff(31);
SG.SVGTiles["tile23.bmp"].src = SG.SVGFilePath + "tile23.bmp";
SG.SVGTiles["tile24.bmp"] = new Image();
SG.SVGTiles["tile24.bmp"].onload = imageLoadCheckOff(32);
SG.SVGTiles["tile24.bmp"].src = SG.SVGFilePath + "tile24.bmp";
SG.SVGTiles["tile25.bmp"] = new Image();
SG.SVGTiles["tile25.bmp"].onload = imageLoadCheckOff(33);
SG.SVGTiles["tile25.bmp"].src = SG.SVGFilePath + "tile25.bmp";
SG.SVGTiles["tile26.bmp"] = new Image();
SG.SVGTiles["tile26.bmp"].onload = imageLoadCheckOff(34);
SG.SVGTiles["tile26.bmp"].src = SG.SVGFilePath + "tile26.bmp";
SG.SVGTiles["tile27.bmp"] = new Image();
SG.SVGTiles["tile27.bmp"].onload = imageLoadCheckOff(35);
SG.SVGTiles["tile27.bmp"].src = SG.SVGFilePath + "tile27.bmp";
SG.SVGTiles["tile28.bmp"] = new Image();
SG.SVGTiles["tile28.bmp"].onload = imageLoadCheckOff(36);
SG.SVGTiles["tile28.bmp"].src = SG.SVGFilePath + "tile28.bmp";
SG.SVGTiles["tile29.bmp"] = new Image();
SG.SVGTiles["tile29.bmp"].onload = imageLoadCheckOff(37);
SG.SVGTiles["tile29.bmp"].src = SG.SVGFilePath + "tile29.bmp";
SG.SVGTiles["tile30.bmp"] = new Image();
SG.SVGTiles["tile30.bmp"].onload = imageLoadCheckOff(38);
SG.SVGTiles["tile30.bmp"].src = SG.SVGFilePath + "tile30.bmp";
SG.SVGTiles["tile31.bmp"] = new Image();
SG.SVGTiles["tile31.bmp"].onload = imageLoadCheckOff(39);
SG.SVGTiles["tile31.bmp"].src = SG.SVGFilePath + "tile31.bmp";
SG.SVGTiles["tile32.bmp"] = new Image();
SG.SVGTiles["tile32.bmp"].onload = imageLoadCheckOff(40);
SG.SVGTiles["tile32.bmp"].src = SG.SVGFilePath + "tile32.bmp";
SG.SVGTiles["tile33.bmp"] = new Image();
SG.SVGTiles["tile33.bmp"].onload = imageLoadCheckOff(41);
SG.SVGTiles["tile33.bmp"].src = SG.SVGFilePath + "tile33.bmp";
SG.SVGTiles["tile34.bmp"] = new Image();
SG.SVGTiles["tile34.bmp"].onload = imageLoadCheckOff(42);
SG.SVGTiles["tile34.bmp"].src = SG.SVGFilePath + "tile34.bmp";
SG.SVGTiles["tile35.bmp"] = new Image();
SG.SVGTiles["tile35.bmp"].onload = imageLoadCheckOff(43);
SG.SVGTiles["tile35.bmp"].src = SG.SVGFilePath + "tile35.bmp";
SG.SVGTiles["tile36.bmp"] = new Image();
SG.SVGTiles["tile36.bmp"].onload = imageLoadCheckOff(44);
SG.SVGTiles["tile36.bmp"].src = SG.SVGFilePath + "tile36.bmp";
SG.SVGTiles["tile37.bmp"] = new Image();
SG.SVGTiles["tile37.bmp"].onload = imageLoadCheckOff(45);
SG.SVGTiles["tile37.bmp"].src = SG.SVGFilePath + "tile37.bmp";
SG.SVGTiles["Wall.svg"] = new Image();
SG.SVGTiles["Wall.svg"].onload = imageLoadCheckOff(46);
SG.SVGTiles["Wall.svg"].src = SG.SVGFilePath + "tile.bmp";
SG.SVGTiles["rubble.svg"] = new Image();
SG.SVGTiles["rubble.svg"].onload = imageLoadCheckOff(47);
SG.SVGTiles["rubble.svg"].src = SG.SVGFilePath + "tile.bmp";
SG.SVGTiles["Barrier.svg"] = new Image();
SG.SVGTiles["Barrier.svg"].onload = imageLoadCheckOff(48);
SG.SVGTiles["Barrier.svg"].src = SG.SVGFilePath + "tile.bmp";
// function tileLoader () {
// 	var tankTiles = [];
// 	for (var tileFile of SG.TileList) {
// 		tankTiles.push(new Image());
// 		tankTiles[tankTiles.length - 1].onload = imageLoadCheckOff(tankTiles.length - 1);
// 		tankTiles[tankTiles.length - 1].src = SG.SVGFilePath + tileFile;
// 		SG.SVGTiles[tileFile] = tankTiles[tankTiles.length - 1];
// 	}	
// }

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