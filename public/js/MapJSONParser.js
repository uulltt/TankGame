

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
               var tC = map.layers[0].tiles[index].tile;
               console.log(tC)
               switch (tC) {
                    case 8:
                         new Terrain(map.layers[0].tiles[index].x, map.layers[0].tiles[index].y, "tile" + map.layers[0].tiles[index].tile + ".bmp");
                         break;
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 13:
                    case 14:
                         new Barrier(map.layers[0].tiles[index].x, map.layers[0].tiles[index].y, "tile" + map.layers[0].tiles[index].tile + ".bmp");
                         break;
                    default:
                         new Obstacle(map.layers[0].tiles[index].x, map.layers[0].tiles[index].y, "Obstacle", "tile" + map.layers[0].tiles[index].tile + ".bmp");
                         break;
               }
               // if(tC == 8)
               // {
               //      new Terrain(map.layers[0].tiles[index].x, map.layers[0].tiles[index].y, "tile" + map.layers[0].tiles[index].tile + ".bmp")
               // }
               // else if(tC == 0 || tC == 1 || tC == 2 || tC == 3 || tC == 4 || tC == 5 || tC == 6 || tC == 7 || tC == 13 || tC == 14)
               // {
               //      new Barrier(map.layers[0].tiles[index].x, map.layers[0].tiles[index].y, "tile" + map.layers[0].tiles[index].tile + ".bmp");
               // }
               // else
               // {    
               //      new Obstacle(map.layers[0].tiles[index].x, map.layers[0].tiles[index].y, "Obstacle", "tile" + map.layers[0].tiles[index].tile + ".bmp");
               // }
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
