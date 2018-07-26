function generate(rows, cols, percentageObstacles, percentageBuildings)
{
	var map = new Map(rows, cols);
	var i = 0;
	
	// list of buildings
	var buildings = 
	[
		[
			[1, 1]
		],
	
		[
			[1],
			[1]
		],
	
		[
			[1, 1],
			[1, 1]
		],
	
		[
			[1, 0],
			[1, 1]
		]
	]
	console.log(map);
	//addObjects(map, rows, cols, percentageObstacles, buildings, 0);
	console.log(map);	
	addObjects(map, rows, cols, percentageBuildings, buildings, 1);
	console.log(map);	
	
	
	return map;
}
function addObjects(map, rows, cols, percentage, buildings, mode)
{
	for(var r = 0; r < rows; r++)
	{
		for(var c = 0; c < cols; c++)
		{
			var chance = Math.random();
			if(chance < percentage)
			{
				if(mode == 0)
				{
					var targetCell = map.cells[r][c];
					if(!targetCell.occupied())
					{
						targetCell.obj = new Obstacle(r, c, "Thingy" + i++, "Nothing");
					}
				}
				else if(mode == 1)
				{
					// pick which building to place
					var buildingChoice = Math.floor(Math.random() * 4);
				
					// decide if area is free of obstacles
					var isPlaceable = isValid(map, rows, cols, buildings, buildingChoice, r, c);
					
					// place building
					if(isPlaceable)
					{
						for(var i = 0; i < buildings[buildingChoice].length; i++)
						{
							for(var j = 0; j < buildings[buildingChoice][i].length; j++)
							{
								if(buildings[buildingChoice][i][j] == 1)
								{
									map.cells[r + i][c + j].obj = new Obstacle(r + i, c + j, "Building", i + ", " + j);
								}
							}
						}
					}
				}
			}
		}
	}
}
function isValid(map,  rows,  cols,  buildings, buildingChoice, r, c)
{
	for(var i = 0; i < buildings[buildingChoice].length; i++)
	{
		for(var j = 0; j < buildings[buildingChoice][i].length; j++)
		{
			if(isValidisValid(rows, cols, r + i, c + j) && map.cells[r + i][c + j].occupied())
			{
				return false;
			}
		}
	}
	return true;
}

function isValidisValid(rows, cols, val1, val2)
{
	return ((val1 < rows && val2 < cols) && (val1 >= 0 && val2 >= 0));
}