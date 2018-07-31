

var MapArr = function(rows, columns)
{
     this.rows = rows;
     this.columns = columns;
     this.arr = new Array(this.rows);
     for (var r = 0; r < columns; r++) {
           this.arr[i] = new Array(this.rows);
     }
     return this.arr;
}

var json;

function loadMap(map)
{
     console.log(map.tileshigh);

     var mapData = new MapArr(map.tileshigh, map.tileshigh);
     var index = 0;

     for(var i = 0; i < mapData.rows; i++)
     {
          for(var j = 0; j < mapData.columns; j++)
          {
               mapData.arr[i][j] = map.layers[0].tiles[index++].tile;
          }
     }

     console.log(mapData);

     var newMap = new Map(map.tileshigh, map.tileshigh);


}

$.getJSON('../MapAssets/MapJSONs/Canyon.json', function(data){
     console.log(data);
     loadMap(data);
})
