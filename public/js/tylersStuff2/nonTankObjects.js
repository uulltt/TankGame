function Obstacle (x, y, name, tile) 
{
	if (SG.Board.cells[x][y].occupied()) {
		return;
	}
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

function Barrier (x, y) {
	Obstacle.call(this, x, y, "Barrier", "Barrier.svg");
	this.type = 2;
	this.onHit = () => {
		return;
	}
}

Barrier.prototype = new Obstacle();

function Terrain (x, y, tile) {
	this.x = x;
	this.y = y;
	this.tileID = tile;
	SG.GameObjects.push(this);
}