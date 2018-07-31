

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
     var mapData = new MapArr(map.tileshigh, map.tileshigh);
     var index = 0;

     for(var i = 0; i < mapData.rows; i++)
     {

               if(map.layers[0].tiles[i].tile == 8)
               {
                    new Terrain(map.layers[0].tiles[i].x, map.layers[0].tiles[i].y, "tile" + map.layers[0].tiles[i].tile + ".bmp")
               }
               else if((map.layers[0].tiles[i].tile >= 0 && map.layers[0].tiles[i].tile <= 7) || map.layers[0].tiles[i].tile == 13 || map.layers[0].tiles[i].tile == 14)
               {
                    new Barrier(map.layers[0].tiles[i].x, map.layers[0].tiles[i].y, "tile" + map.layers[0].tiles[i].tile + ".bmp");
               }
               else
               {
                    new Obstacle(map.layers[0].tiles[i].x, map.layers[0].tiles[i].y, "Obstacle", "tile" + map.layers[0].tiles[i].tile + ".bmp");
               }


     }

     console.log(map.layers[0].tiles[2].tile);
     console.log(mapData);
}

$.getJSON('../MapAssets/MapJSONs/Canyon.json', function(data){
     console.log(data);
     loadMap(data);
})
