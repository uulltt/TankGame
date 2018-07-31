function Obstacle (x, y, name, tile) 
{
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