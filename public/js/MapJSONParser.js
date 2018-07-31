

var json = $.getJSON('../MapAssets/MapJSONs/Canyon.json', function(data){
     console.log(data);
})

function loadMap(map)
{
     var MapArr = function(rows, columns)
     {
          this.rows = rows;
          this.columns = columns;
          this.arr = new Array(this.rows);
          for (var r = 0; r < rows; r++) {
                this.arr[i] = new Array(this.columns);
                 // add cell in each index
                 for (var c = 0; c < columns; c++) {
                     this.cells[r].push(new Cell(r, c, 0, undefined));
                 }
          }
          return this.arr;
     }

     var mapData = new MapArr(map.tileshigh, map.tileshigh);
     var index = 0;

     for(var i = 0; i < mapData.rows; i++)
     {
          for(var j = 0; j < map.columns; i++)
          {
               mapData[i][j] = map.layers[0].tile[index++].tile;
          }
     }

     console.log(mapData);

     var newMap = new Map(map.tileshigh, map.tileshigh);


}

loadMap(json);
