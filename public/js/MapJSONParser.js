

function MapArr(rows, columns)
{
     this.rows = rows;
     this.columns = columns;
     this.arr = new Array(this.rows);
     for (var r = 0; r < columns; r++) {
           this.arr[r] = new Array(this.rows);
     }
     return this;
}

var json;

function loadMap(map)
{
     console.log(map.tileshigh);
     var newMap = new Map(map.tileshigh, map.tileshigh);
     SG.Board = newMap;
     var mapData = new MapArr(map.tileshigh, map.tileshigh);
     var index = 0;

     for(var i = 0; i < mapData.rows; i++)
     {
          for(var j = 0; j < mapData.columns; j++)
          {
               console.log(map.layers[0].tiles[index].tile);
               console.log((map.layers[0].tiles[index].tile >= 0 && map.layers[0].tiles[index].tile <= 7) || map.layers[0].tiles[index].tile == 13 || map.layers[0].tiles[index].tile == 14);
               if(map.layers[0].tiles[index].tile == 8)
               {
                    new Terrain(map.layers[0].tiles[index].x, map.layers[0].tiles[index].y, "tile" + map.layers[0].tiles[index].tile + ".bmp")
               }
               else if((map.layers[0].tiles[index].tile >= 0 && map.layers[0].tiles[index].tile <= 7) || map.layers[0].tiles[index].tile == 13 || map.layers[0].tiles[index].tile == 14)
               {
                    new Barrier(map.layers[0].tiles[index].x, map.layers[0].tiles[index].y, "tile" + map.layers[0].tiles[index].tile + ".bmp");
               }
               else
               {
                    new Obstacle(map.layers[0].tiles[index].x, map.layers[0].tiles[index].y, "Obstacle", "tile" + map.layers[0].tiles[index].tile + ".bmp");
               }
               index++;

          }
     }

     console.log(map.layers[0].tiles[2].tile);
     console.log(mapData);
}

$.getJSON('../MapAssets/MapJSONs/Canyon.json', function(data){
     console.log(data);
     loadMap(data);
})
