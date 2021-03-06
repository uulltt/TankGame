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
function Map (rows, columns, ssv) {
	// init rows
	this.cells = [];
	SG.boardWidth = columns;
	SG.boardHeight = rows;
	this.objects = [];
	
	this.stringify = () => 
	{
		var retVal = "";
		retVal += SG.boardWidth + " " + SG.boardHeight;
		for(var i = 0; i < SG.boardWidth; i++)
		{
			for(var j = 0; j < SG.boardHeight; j++)
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

	this.parse = (ssv) =>
	{
		var tokens = ssv.split(" ");

		SG.boardWidth = tokens[0];
		SG.boardHeight = tokens[1];

		this.cells = [];

		var i = 2;

		for (var r = 0; r < SG.boardWidth; r++)
		{
			this.cells.push([]);
			// add cell in each index
			for (var c = 0; c < SG.boardHeight; c++) {
				var obj;
				if(tokens[i] == "-1")
				{
					this.cells[r].push(new Cell(r, c, 0, undefined));
				}
				else if(tokens[i] == "1")
				{	
					obj = new Obstacle(r, c, tokens[++i], tokens[++i]);
					this.cells[r].push(new Cell(r, c, 0, obj));
					SG.GameObjects.push(obj);
				}
				else if (tokens[i] == "2")
				{
					obj = new Barrier(r, c);
					this.cells[r].push(new Cell(r, c, 0, obj));
					SG.GameObjects.push(obj);
				}	
				i++;
			}
		}
	}

	if (ssv) {	// if map csv is provided build map from it
		this.parse(ssv);
	} else { //else build blank map
		// add 2nd dimension for each row
		for (var r = 0; r < rows; r++) {
			this.cells.push([]);
			// add cell in each index
			for (var c = 0; c < columns; c++) {
				this.cells[r].push(new Cell(r, c, 0, undefined));
			}
		}

		// FILLING OUTER CELLS WITH barrier OBSTACLES TO PREVENT ARRAY OUT OF BOUNDS
		// for (c = 0; c < columns; c++) {
		// 	this.cells[0][c].obj = new Barrier(0, c);
		// 	SG.GameObjects.push(this.cells[0][c].obj);
		// }
		// for (c = 0; c < columns; c++) {
		// 	this.cells[rows - 1][c].obj = new Barrier(rows - 1, c);
		// 	SG.GameObjects.push(this.cells[rows - 1][c].obj);
		// }
		// for (c = 1; c < (rows - 1); c++) {
		// 	this.cells[c][0].obj = new Barrier(c, 0);;
		// 	this.cells[c][columns - 1].obj = new Barrier(c, columns - 1);
		// 	SG.GameObjects.push(this.cells[c][0].obj);
		// 	SG.GameObjects.push(this.cells[c][columns - 1].obj);
		// }
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
					targetCell.obj = new Obstacle(r, c, "wall" + i++, "Wall.svg");
				}
			}
		}

		return map;
	}
}