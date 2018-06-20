let board; // object to hold the 2d array of cells that make up the board
let gameObjects = []; // array to hold list of game objects that need to be drawn over canvas tiles
let gameInterval = 1000; //interval between tank code execution; in ms

let tanks = []; // subset of the gameObjects array containing only tanks that will need to be told to execute code.
let code; // array of Command Objects to be stored in a tank's internal code field

let cv = document.getElementById('cv');  // canvas context variables
let ctx = cv.getContext('2d');
let cvWidth = cv.width;
let cvHeight = cv.height;

let tronScape = new Image();  // blue-black grid svg 
tronScape.src = "./SVG/background.svg";

SVGTiles = {}; // object to map tileID's of gameObjects to be drawn on canvas to their SVG images
let tunkTile = new Image(); // tile for "tunk" tank
tunkTile.onload = function () { //  loading "tunk" sprite into tile lookup object
	SVGTiles["tunk"] = tunkTile;
}

tunkTile.src = "./SVG/player.svg"; // setting path of image object to begin loading it

// Enumeration of directions that maps to their XY transforms
const directions = Object.freeze( {"N" : [0,-1], "E" : [1, 0], "S" : [0, 1], "W" : [-1, 0], "NE" : [1,-1], "NW" : [-1,-1], "SE" : [1, 1], "SW" : [-1, 1] });

// function to post messages to the client gameLog
function gameLog (message) {
	$("#log").prepend("<li>" + message + "</li>");
}


// cell class declaration where 
//		tileID maps to the sprite to be drawn underneath
//		obj is a reference to what game object currently occupies it
//		occupied is a function to return true/false if occupied
function Cell (tile, obj = undefined) {
	this.tileID = tile;
	this.obj = obj;
	this.occupied = () => {
		if (!this.obj) {
			return false;
		} else {
			return true;
		}
	}
}

// map object
function Map (rows, columns, csv) {
	// init rows
	this.cells = [];

if (csv) {	// if map csv is provided build map from it

	} else { //else build blank map
		// add 2nd dimension for each row
		for (var r = 0; r < rows; r++) {
			this.cells.push([]);
			// add cell in each index
			for (var c = 0; c < columns; c++) {
				this.cells[r].push(new Cell(0, undefined));
			}
		}

		// FILLING OUTER CELLS WITH WALL OBSTACLES TO PREVENT ARRAY OUT OF BOUNDS
		for (c = 0; c < columns; c++) {
			this.cells[0][c].obj = {"type": "WALL"};
		}
		for (c = 0; c < columns; c++) {
			this.cells[rows - 1][c].obj = {"type": "WALL"};
		}
		for (c = 1; c < (rows - 1); c++) {
			this.cells[c][0].obj = {"type": "WALL"};
			this.cells[c][columns - 1].obj = {"type": "WALL"};
		}

	}

}

// TANK OBJECT
// has name, code store, dead/alive, program counter, x-cell coord, y-cell coord, id mapping to its sprite
function Tank (name, x, y, instructions) {
	this.name = name;
	this.code = instructions;
	this.alive = true;
	this.pc = 0;
	this.x = x;
	this.y = y;
	this.tileID = "tunk";
	// logs creation to client gamelog giving its name and coords
	gameLog("Creating " + this.name + " at " + this.x + ", " + this.y);

	// check if placement is available
	if (board.cells[x][y]) {
		board.cells[x][y].obj = this;
	} else {
		// error message when tank creation conflicts with object already on board
		gameLog("Map location is already unoccupied.");
		return undefined;
	}


	// method to map command instruction to tank method
	this.execute = () => {

		// if pc has reached the end of codestore set to 0 to wrap back to beginning
		if (this.pc >= this.code.length) {
			this.pc = 0;
		}
		// grab next instruction and log it
		let instruction = this.code[this.pc];
		gameLog(this.pc + " " + this.name + ": " + instruction.command + " " + instruction.args);
		
		// switch to map command to method
		switch(instruction.command) {
			case "MOVE":
				this.move(instruction.args[0]);
				break;
			default:
				break;
		}
	}

	// call execution of next instruction and increment pc

	this.step = () => {
		this.execute();
		this.pc++;
	}

	// method to return whether tile in selected direction is blocked
	
	this.adjCheck = (dir) => {
		let tf = directions[dir];
		let tfx = this.x + tf[0];
		let tfy = this.y + tf[1];
		console.log(tfx + " " + tfy);
		return board.cells[tfx][tfy].occupied();
	}

	// method to execute move in the direction specified

	this.move = (dir) => {
		if (!this.adjCheck(dir)) {
			board.cells[this.x][this.y].obj = undefined;
			let tf = directions[dir];
			this.x = this.x + tf[0];
			this.y = this.y + tf[1];
			board.cells[this.x][this.y].obj = this;
		}
	}

	// method to echo current tank location

	this.location = () => {
		gameLog(this.name + " is at " + this.x + ", " + this.y + ".");
	}

}

// animation : always running loop.

function animate() {
  	// call again next time we can draw
  	requestAnimationFrame(animate);
  	// clear canvas
  	ctx.clearRect(0, 0, cvWidth, cvHeight);
  	// draw gameObjects
  	for (var obj of gameObjects) {
  		ctx.drawImage(SVGTiles[obj.tileID], obj.x * 25, obj.y * 25);
	}

  	// everyObject[0] = tunk.x * 30;
  	// everyObject[1] = tunk.y * 30;
  	// var o = everyObject;
  	// ctx.fillStyle = o[4];
  	// ctx.fillRect(o[0], o[1], o[2], o[3]);
}

// part of the async sleep function to allow configuration of game interval length

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// game controller to manage the execution of tanks
// has what gamecycle it is currently on and whether it is running
function GameController () {
	this.cycle = 0;
	this.running = false;

	// start function to initiate game loop

	this.start = () => {
		this.running = true;
		this.loop();
	}

	// stop function to end game execution

	this.stop = () => {
		this.running = false;
	}

	// for each tank (if alive) call step function to execute next line of tank command

	this.RunTanks = () => {
		for (var tank of tanks) {
			if (tank.alive) {
				tank.step();
			}
		}
	}

	// the other have of the async function where while the game state is still running,
	// update game cycle display
	// call runTanks method
	// then wait the configured game interval for next cycle
	// then increment game cycle
	this.loop = async () => {
		while (this.running) {
			if (this.cycle > 100) {
				this.running = false;
			}
			//console.log("Current Game Cycle: " + this.cycle);
			$("#gcDisplay").val(this.cycle);
			this.RunTanks();
			await sleep(gameInterval);
			this.cycle++;
		}
	}

}

// code store consisting of an array of Command objects
// command objects being a json with 2 fields
// command : holds string representing action
// args : holds array of arguments provided for command

code = [
	{"command" : "MOVE", "args" : ["N"]},
	{"command" : "MOVE", "args" : ["N"]},
	{"command" : "MOVE", "args" : ["N"]},
	{"command" : "MOVE", "args" : ["E"]},
	{"command" : "MOVE", "args" : ["S"]},
	{"command" : "MOVE", "args" : ["W"]},
	{"command" : "MOVE", "args" : ["W"]},
	{"command" : "MOVE", "args" : ["S"]},
	{"command" : "MOVE", "args" : ["E"]},
	{"command" : "MOVE", "args" : ["S"]},
	{"command" : "MOVE", "args" : ["W"]}
];

// initialize new board of size 25 x 25 with no csv mapdata given

board = new Map(25, 25, undefined);

// initializes "tunk" tank

tunk = new Tank("tunk", 5, 10, code);

// add "tunk" to tanks array
// add "tunk" to gameObjects array

tanks.push(tunk);
gameObjects.push(tunk);

// initialize new game controller

gC = new GameController();

// event listeners to allow arrow key movement of specifically "tunk" tank object
// echos location after each manual move
$(document).keydown(function(e){
    if (e.keyCode == 37) { // left
       	tunk.move("W");
    } else if (e.keyCode == 38) { // up
    	tunk.move("N"); 
    } else if (e.keyCode == 39) { // right
    	tunk.move("E");
    } else if (e.keyCode == 40) { // down
    	tunk.move("S");
    }
    tunk.location();
    return false;
});

// starts animation loop.

animate();