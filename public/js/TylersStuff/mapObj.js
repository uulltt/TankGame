

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

//map object
function Map (rows, columns, csv) {
	// init rows
	this.cells = [];
	boardWidth = columns;
	boardHeight = rows;

	this.objects = [];

	this.stringify = () =>


	this.stringify = () =>
	{
		var retVal = "";
		retVal += boardWidth + " " + boardHeight;
		for(var i = 0; i < boardWidth; i++)
		{
			for(var j = 0; j < boardHeight; j++)
			{
				if(this.cells[i][j].contains(1))
				{
					retVal += " 1 " + this.cells[i][j].obj.name + " " + this.cells[i][j].obj.tileID;
				}
				else
				{
					retVal += " -1";
				}
			}
		}
		return retVal;
	}

	this.parser = (ssv) =>
	{
		var tokens = ssv.split(" ");
		console.log(tokens);

		boardWidth = tokens[0];
		boardHeight = tokens[1];

		this.cells = [];

		var i = 2;

		for (var r = 0; r < boardWidth; r++)
		{
			this.cells.push([]);
			// add cell in each index
			for (var c = 0; c < boardHeight; c++) {
				if(tokens[i] == "-1")
				{
					this.cells[r].push(new Cell(r, c, 0, undefined));
				}
				else if(tokens[i] == "1")
				{
					this.cells[r].push(new Cell(r, c, 0, new Obstacle(r, c, tokens[++i], tokens[++i])));
				}
				i++;
			}
		}
	}

	if (csv) {	// if map csv is provided build map from it
		for (var r = 0; r < rows; r++) {
			this.cells.push([]);
			// add cell in each index
			for (var c = 0; c < columns; c++) {
				this.cells[r].push(new Cell(r, c, 0, undefined));
			}
		}
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

	this.generate = (rows, cols, percentage) =>
	{
		var map = new Map(rows, cols, 1);
		var i = 0;

		for(var r = 0; r < rows; r++)
		{
			for(var c = 0; c < cols; c++)
			{
				var chance = Math.random();
				if(chance < percentage)
				{
					var targetCell = map.cells[r][c];
					targetCell.obj = new Obstacle(r, c, "Thingy" + i++, "Nothing");
				}
			}
		}

		return map;
	}
}

function Obstacle (x, y, name, id) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.type = 1;
    this.tileID = id;

}
