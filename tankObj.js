let board; // object to hold the 2d array of cells that make up the board
let gameObjects = []; // array to hold list of game objects that need to be drawn over canvas tiles
let gameInterval = 1000; //interval between tank code execution; in ms

let tanks = []; // subset of the gameObjects array containing only tanks that will need to be told to execute code.
let code; // array of Command Objects to be stored in a tank's internal code field

let cv = document.getElementById('cv');  // canvas context variables
let ctx = cv.getContext('2d');
let cvWidth = cv.width;
let cvHeight = cv.height;

let boardWidth;
let boardHeight;
//let tronScape = new Image();  // blue-black grid svg 
//tronScape.src = "./SVG/background.svg";

SVGTiles = {}; // object to map tileID's of gameObjects to be drawn on canvas to their SVG images
//let tunkTile = new Image(); // tile for "tunk" tank
//tunkTile.onload = function () { //  loading "tunk" sprite into tile lookup object
//	SVGTiles["tunk"] = tunkTile;
//}
//
//tunkTile.src = "./SVG/player.svg"; // setting path of image object to begin loading it

// Enumeration of directions that maps to their XY transforms
const directions = Object.freeze({0 : [ 1, 0], 45 : [ 1, -1], 90 : [ 0,-1], 135 : [-1,-1], 180 : [-1, 0], 225 : [-1, 1], 270 : [ 0, 1], 315 : [ 1, 1]});
const cardinals = {"N" : directions[90], "NE" : directions[45], "E" : directions[0], "SE" : directions[315], "S" : directions[270], "SW" : directions[225], "W" : directions[180], "NW" : directions[135]};
// function to post messages to the client gameLog
function gameLog (message) {
	$("#log").prepend("<li>" + message + "</li>");
}


// cell class declaration where 
//		tileID maps to the sprite to be drawn underneath
//		obj is a reference to what game object currently occupies it
//		occupied is a function to return true/false if occupied
function Cell (x, y, tile, obj = undefined) {
    this.x = x;
    this.y = y;
	this.tileID = tile;
	this.obj = obj;
	this.occupied = () => {
		if (!this.obj) {
			return false;
		} else {
			return true;
		}
	}
	this.contains = (type) => {
	    if (this.occupied()) {
            if (this.obj.type == type) {
                return true;
            }
	    }
	    return false;
    }
}

// map object
function Map (rows, columns, csv) {
	// init rows
	this.cells = [];
	boardWidth = columns;
	boardHeight = rows;

if (csv) {	// if map csv is provided build map from it

	} else { //else build blank map
		// add 2nd dimension for each row
		for (var r = 0; r < rows; r++) {
			this.cells.push([]);
			// add cell in each index
			for (var c = 0; c < columns; c++) {
				this.cells[r].push(new Cell(r, c, 0, undefined));
			}
		}

		// FILLING OUTER CELLS WITH WALL OBSTACLES TO PREVENT ARRAY OUT OF BOUNDS
		for (c = 0; c < columns; c++) {
			this.cells[0][c].obj = {"type": 1, "name" : "WALL", };
		}
		for (c = 0; c < columns; c++) {
			this.cells[rows - 1][c].obj = {"type": 1, "name" : "WALL"};
		}
		for (c = 1; c < (rows - 1); c++) {
			this.cells[c][0].obj = {"type": 1, "name" : "WALL"};
			this.cells[c][columns - 1].obj = {"type": 1, "name" : "WALL"};
		}

	}

}

function Obstacle (x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.type = 1;

    if (!board.cells[x][y].occupied()) {
        board.cells[x][y].obj = this;
    } else {
        // error message when tank creation conflicts with object already on board
        gameLog("Map location is already unoccupied.");
        return undefined;
    }
}

const wordSyms = {
     ACTIVE : 0, ALIGN : 1, ALIGNED : 2, ALLY : 3, ARE : 4, ARMOR : 5, AT : 6, AVAILABLE : 7, BACKWARD : 8, BEEP : 9, BEEP : 10,
     BEING : 11, BEYOND : 12, BRANCH : 13, BREAK : 14, CLEAR : 15, CLOSEST : 16, CODE : 17, COMMLINK : 18, COPY : 19, DATA : 20,
     DESTRUCT : 21, DETECT : 22, DIRECTION : 23, DISTANCE : 24, DO : 25, DOWN : 26, EMPTY : 27, ENEMY : 28, FACE : 29, FACING : 30,
     FIRE : 31, FOR : 32, FORWARD : 33, FOUND : 34, FROM : 35, FUEL : 36, FUNCTIONAL : 37, GET : 38, GOSUB : 39, GOTO : 40,
     HQ : 41, IF : 42, INACTIVE : 43, INCLUDE : 44, INTERNAL : 45, IS : 46, JAM : 47, KEY : 48, KIT : 49, LAST : 50,
     LAUNCH : 51, LEFT : 52, LOCK : 53, LOCKED : 54, LOWER : 55, MOVE : 56, MOVEMENT : 57, NOT : 58, OBJECT : 59, OBSTRUCTED : 60,
     OBSTRUCTION : 61, OFF : 62, ON : 63, PRESSED : 64, RAISE : 65, RANGE : 66, REMAINING : 67, REMOTE : 68, REPAIR : 69, RESUME : 70,
     RETURN : 71, RIGHT : 72, ROTATE : 73, RANDOM : 74, SCAN : 75, SCANNED : 76, SCANNER : 77, SELF : 78, SHEILD : 79, SIGNAL : 80,
     SWITCH : 81, TANK : 82, TEAM : 83, THEN : 84, TO : 85, TRANSMIT : 86, TREADS : 87, TURN : 88, UNAVAILABLE : 89, UNLOCK : 90,
     UNLOCKED : 91, UP : 92, WAS : 93, WEAPON : 94, WITH : 95, WITHIN : 96
}
//   Reserved words
var reservedWords = [
     "ACTIVE", "ALIGN", "ALIGNED", "ALLY", "ARE", "ARMOR", "AT", "AVAILABLE", "BACKWARD", "BEEP", "BEING", "BEYOND",
     "BRANCH", "BREAK", "CLEAR", "CLOSEST", "CODE", "COMMLINK", "COPY", "DATA", "DESTRUCT", "DETECT", "DIRECTION", "DISTANCE",
     "DO", "DOWN", "EMPTY", "ENEMY", "FACE", "FACING", "FIRE", "FOR", "FORWARD", "FOUND", "FROM", "FUEL", "FUNCTIONAL", "GET",
     "GOSUB", "GOTO", "HQ", "IF", "INACTIVE", "INCLUDE", "INTERNAL", "IS", "JAM", "KEY", "KIT", "LAST", "LAUNCH", "LEFT", "LOCK",
     "LOCKED", "LOWER", "MOVE", "MOVEMENT", "NOT", "OBJECT", "OBSTRUCTED", "OBSTRUCTION", "OFF", "ON", "PRESSED", "RAISE", "RANGE",
     "REMAINING", "REMOTE", "REPAIR", "RESUME", "RETURN", "RIGHT", "ROTATE", "RANDOM", "SCAN", "SCANNED", "SCANNER", "SELF", "SHEILD",
     "SIGNAL", "SWITCH", "TANK", "TEAM", "THEN", "TO", "TRANSMIT", "TREADS", "TURN", "UNAVAILABLE", "UNLOCK", "UNLOCKED", "UP", "WAS",
     "WEAPON", "WITH", "WITHIN"
];

// TANK OBJECT
// has name, code store, dead/alive, program counter, x-cell coord, y-cell coord, id mapping to its sprite
function Tank (name, x, y, instructions) {
	this.name = name;
	this.type = 0;
	this.code = instructions;
	this.labels = {};
	this.alive = true;
	this.pc = 0;
	this.x = x;
	this.y = y;
	this.orientation = 0;
	this.system = {
	    "variables" : Array.apply(null, Array(32)).map(function () {}),
		"target" : undefined,
		"fuel" : -1,
		"hp" : 1,
		"ScanRange" : 2
	}

	this.tileID = "tunk";
	// logs creation to client gamelog giving its name and coords
	gameLog("Creating " + this.name + " at " + this.x + ", " + this.y);

	// check if placement is available
	if (!board.cells[x][y].occupied()) {
		board.cells[x][y].obj = this;
	} else {
		// error message when tank creation conflicts with object already on board
		gameLog("Map location is already unoccupied.");
		return undefined;
	}

	this.execute = () => {

	// method to map command instruction to tank method

		// if pc has reached the end of codestore set to 0 to wrap back to beginning
		if (this.pc >= this.code.length) {
			this.pc = 0;
		}
		// grab next instruction and log it
		let instruction = this.code[this.pc];
		//gameLog(this.pc + " " + this.name + ": " + instruction.command + " " + instruction.args);

		// switch to map command to method
		switch(instruction[0]) {
		    case 1:

		        break;
			case 3: // move (1 == forward, -1 == backward)
				this.move(instruction[1]);
				break;
			case 4: // scan ()
                this.scan(instruction[1]);
                break;
            case 5:
                this.turn(instruction[1], instruction[2]);
                break;
			case 73: // rotate (true == cw, false == ccw)
				this.rotate(instruction.args[0])
			case 35: // goto (program line)
				this.pc = instruction[1];
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

    this.scan = (type) => {
        let tx = this.x - this.system.ScanRange;
        let ty = this.y - this.system.ScanRange;
        for (let i = 0; i <= this.system.ScanRange * 2; i++) {
            for (let j = 0; j <= this.system.ScanRange * 2; j++) {
                if (tx + i < 0 || tx + i >= boardWidth || ty + j < 0 || ty + j >= boardHeight || (tx + i == this.x && ty + j == this.y)) {
                    continue;
                }
                //console.log((tx + i) + " " + (ty + j));
                //ctx.fillStyle = "rgba(0,255,0,0.5)";
                //ctx.fillRect((tx + i) * 25 + 2, (ty + j) * 25 + 2, 23, 23);
                if (board.cells[tx + i][ty + j].contains(type)) {
                    this.system.target = board.cells[tx + i][ty + j];
                    gameLog(((type == 0) ? "tank" : "obstacle") + " found at " + (tx + i) + "," + (ty + j))
                    //console.log(board.cells[tx + i][ty + j].obj.name);
                    return;
                }
            }
        }
    }

	// method to execute move in the direction specified

	this.move = (dir) => {
		// dir is 1 for forwards, -1 for backwards
		let tf = (dir == 1) ? directions[this.orientation] : directions[(this.orientation - 180) % 360];
		let tfx = this.x + tf[0];
		let tfy = this.y + tf[1];
		if (!board.cells[tfx][tfy].occupied()) {
			board.cells[this.x][this.y].obj = undefined;
			this.x = tfx;
			this.y = tfy;
			board.cells[tfx][tfy].obj = this;
		}
	}

	// method to echo current tank location

	this.location = () => {
		gameLog(this.name + " is at " + this.x + ", " + this.y + ".");
	}

	this.turn = (type, amount = undefined) => {
		switch (type) {
		    case 29: // right
		        this.orientation = (this.orientation - ((45 * amount) % 360) + 360) % 360;
		        break;
		    case 30: // left
		        this.orientation = (this.orientation + (45 * amount)) % 360;
		        break;
		    case 31: // angle
		        this.orientation = (45 * amount) % 360;
		        break;
		    case 32: // face target
		        let tx = this.system.target.x;
		        let ty = this.system.target.y;
		        if (this.x == tx && this.y > ty) { // north
		            this.turn(31, 2);
		        } else if (this.x == tx && this.y < ty) { // south
                    this.turn(31, 6);
		        } else if (this.x > tx && this.y == ty) { // west
                    this.turn(31, 4);
		        } else if (this.x < tx && this.y == ty) { // east
                    this.turn(31, 0);
		        } else if (this.x > tx && this.y > ty) { // northeast
                    this.turn(31, 1);
		        } else if (this.x > tx && this.y < ty) { // southeast
                    this.turn(31, 7);
		        } else if (this.x < tx && this.y > ty) { // northwest
                    this.turn(31, 3);
		        } else if (this.x < tx && this.y > ty) { // southwest
                    this.turn(31, 5);
		        }
		        break;
		}
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
  		if (obj.hasOwnProperty('tileID')) {
	  		ctx.drawImage(SVGTiles[obj.tileID], obj.x * 25, obj.y * 25);
		}
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
    [3, 1]
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

let tunkTile = new Image(); // tile for "tunk" tank
tunkTile.onload = function () { //  loading "tunk" sprite into tile lookup object
	SVGTiles["tunk"] = tunkTile;
	animate();
}

tunkTile.src = "./SVG/player.svg"; // setting path of image object to begin loading it