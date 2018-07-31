function Obstacle (x, y, name, tile) 
{
	this.type = 1;
	this.alive = true;
	this.x = x;
	this.y = y;
	this.name = name;
	this.tileID = tile;
	this.hp = 10;
	this.onHit = () => {
		if (this.alive)
		{
			this.hp -= 1;
			if (this.hp < 1) {
				this.tileID = "rubble.svg";
				this.alive = false;
				SG.Board.cells[this.x][this.y].obj = undefined;
			}
		}	
	}
}

function Barrier (x, y) {
	this = new Obstacle(x,y,"Barrier", "Barrier.svg");
	this.type = 2;
	this.onHit = () => {
		return;
	}
}