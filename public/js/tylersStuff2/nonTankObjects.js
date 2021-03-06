function Obstacle (x, y, name, tile) 
{
	if (!SG.Board.cells[x][y].occupied()) {
		SG.Board.cells[x][y].obj = this;
	} else {
		return;
	}
	//console.log("obstalcer created")
	SG.Board.cells[x][y].obj = this;
	SG.GameObjects.push(this);
	this.type = 1;
	this.x = x;
	this.y = y;
	this.name = name;
	this.tileID = tile;
	this.hp = 10;
	this.onHit = () => {
		this.hp -= 1;
		if (this.hp < 1) {
			this.tileID = "rubble";
		}
	}
}

function Barrier (x, y) 
{
	if (!SG.Board.cells[x][y].occupied()) {
		SG.Board.cells[x][y].obj = this;
	}
	SG.Board.cells[x][y].obj = this;
	SG.GameObjects.push(this);
	this.x = x;
	this.y = y;
	this.tileID = "tile0.bmp";
	this.type = 2;
	this.onHit = () => {
		return;
	}
}

function Terrain (x, y, tile) {
	this.x = x;
	this.y = y;
	this.tileID = tile;
	SG.GameObjects.push(this);
}