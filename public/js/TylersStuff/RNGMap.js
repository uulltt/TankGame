var percentageObstacles;

function generate(rows, cols, percentage)
{
	var map = new Map(rows, cols);
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