
// Enumeration of directions that maps to their XY transforms
const directions = Object.freeze({0 : [ 1, 0], 45 : [ 1, -1], 90 : [ 0,-1], 135 : [-1,-1], 180 : [-1, 0], 225 : [-1, 1], 270 : [ 0, 1], 315 : [ 1, 1]});
const cardinals = {"N" : directions[90], "NE" : directions[45], "E" : directions[0], "SE" : directions[315], "S" : directions[270], "SW" : directions[225], "W" : directions[180], "NW" : directions[135]};
// function to post messages to the client gameLog
function gameLog (message) {
	$("#log").prepend("<li>" + message + "</li>");
}


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
		"hp" : 5,
		"ScanRange" : 20
	}

    this.onHit = () => {
	    this.system["hp"] = this.system["hp"] - 1;
		if(this.system["hp"] == 0){
			this.alive = false;
			SG.Board.cells[this.x][this.y].obj = null;
		}
    }

	this.tileID = "Tank0.svg";
	// logs creation to client gamelog giving its name and coords
	gameLog("Creating " + this.name + " at " + this.x + ", " + this.y);

	// check if placement is available
	if (!SG.Board.cells[x][y].occupied()) {
		SG.Board.cells[x][y].obj = this;
		SG.GameObjects.push(this);
		SG.TankObjects.push(this);
	} else {
		// error message when tank creation conflicts with object already on SG.Board
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
			case 3: // move (1 == forward, -1 == backward)
			    gameLog(this.pc + " " + this.name + ": Move 1");
				this.move(instruction[1]);
				break;
			case 4: // scan ()
                gameLog(this.pc + " " + this.name + ": Scan");
                this.scan(instruction[1]);
                break;
            case 5:
                gameLog(this.pc + " " + this.name + ": Turn");
                this.turn(instruction[1], instruction[2]);
                break;
			case 8:
				gameLog(this.pc + " " + this.name + ": Fire");
				this.fire();
				break;
			case 73: // rotate (true == cw, false == ccw)
				this.rotate(instruction.args[0])
			case 35: // goto (program line)
    			gameLog(this.pc + " " + this.name + ": goto " + instruction[1]);
				this.pc = instruction[1];
				this.execute(); 
				break;
			case 34:
				switch (instruction[1]) {
					case 0:
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
					case 8:
					case 9:
					case 10:
					case 11:
					case 12:
					case 13:
					case 14:
					case 15:
					case 16:

				}
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
                if (tx + i < 0 || tx + i >= SG.boardWidth || ty + j < 0 || ty + j >= SG.boardHeight || (tx + i == this.x && ty + j == this.y)) {
                    continue;
                }
                //console.log((tx + i) + " " + (ty + j));
                //ctx.fillStyle = "rgba(0,255,0,0.5)";
                //ctx.fillRect((tx + i) * 25 + 2, (ty + j) * 25 + 2, 23, 23);
                if (SG.Board.cells[tx + i][ty + j].contains(type)) {
                    this.system.target = SG.Board.cells[tx + i][ty + j];
                    gameLog(((type == 0) ? "tank" : "obstacle") + " found at " + (tx + i) + "," + (ty + j))
                    //console.log(SG.Board.cells[tx + i][ty + j].obj.name);
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
		if (!SG.Board.cells[tfx][tfy].occupied()) {
			SG.Board.cells[this.x][this.y].obj = undefined;
			this.x = tfx;
			this.y = tfy;
			SG.Board.cells[tfx][tfy].obj = this;
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
		    	if (!this.system.target) {
		    		return;
		    	}
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
		        } else if (this.x < tx && this.y > ty) { // northeast
                    this.turn(31, 1);
		        } else if (this.x < tx && this.y < ty) { // southeast
                    this.turn(31, 7);
		        } else if (this.x > tx && this.y > ty) { // northwest
                    this.turn(31, 3);
		        } else if (this.x > tx && this.y > ty) { // southwest
                    this.turn(31, 5);
		        }
		        break;
		}
		this.tileID = "Tank" + (this.orientation / 45) + ".svg";
	}

	this.fire = () => {
           var x0 = this.x;
           var y0 = this.y;
           var x1 = this.system.target.x;
           var y1 = this.system.target.y;
           var dx = Math.abs(x1-x0);
           var dy = Math.abs(y1-y0);
           var sx = (x0 < x1) ? 1 : -1;
           var sy = (y0 < y1) ? 1 : -1;
           var err = dx-dy;

           if ((x0==x1) && (y0==y1)) return;
           var e2 = 2*err;
           if (e2 >-dy){ err -= dy; x0  += sx; }
           if (e2 < dx){ err += dx; y0  += sy; }

           if (SG.Board.cells[x0][y0].occupied()) {
               SG.Board.cells[x0][y0].obj.onHit();
               return;
           }

           while(true){
                 if ((x0==x1) && (y0==y1)) break;
                 var e2 = 2*err;
                 if (e2 >-dy){ err -= dy; x0  += sx; }
                 if (e2 < dx){ err += dx; y0  += sy; }

                 if (SG.Board.cells[x0][y0].occupied()) {
                     SG.Board.cells[x0][y0].obj.onHit();
                     return;
                 }

           }
    }
}