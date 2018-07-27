/*

     Ideas for how to approach the Tile Map Editor:

          -    When painting non path tiles randomize painted tiles of
               tile class (i.e. grass, dirt, rock, etc.)

          -    In the case of path tiles such as rivers and trails each tile will
               have each edge act as a node to detect other tiles of the same type.
               Should the node detect another node, paint the proper tile.

               Example
                              a
                         +--------+
                         |        |
                       d |    X   | b
                         |        |
                         +--------+
                              c

               Assume you have a set of adjacent tiles labeled {X(1), X(2), ..., X(n)}
               on a grid.


               should X(1)'s "a" node be "touching" X(n)'s "c" node and X(1)
               does not detect any other X nodes adjacent to it, the tile which
               should be placed in its coordinates is one of a vertical path.
*/
const n = 30;


var canvas = document.getElementById("paintGrid");
var context = canvas.getContext("2d");
var drw = false;
var grassBrush = false;
var dirtBrush = false;
var waterBrush = false;
var cliffBrush = false;
var treeBrush = false;
var forestBrush = false;
var greenBrush = false;
var redBrush = false;
var yellowBrush = false;


for (var x = 0; x < n; x += n) {
  context.moveTo(x, 0);
  context.lineTo(x, n);
}

for (var y = 0; y < n; y += n) {
  context.moveTo(0, y);
  context.lineTo(n * n, y);
}

context.moveTo(0,0);
// context.lineTo(380,380);

context.strokeStyle = "#03CFFF";
context.stroke();

function getMousePos(canvas, evt) {
     var rect = canvas.getBoundingClientRect();
     return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
     };
}

function getMousePos(c, evt) {
        var rect = c.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
function getNearestSquare(position) {
     var x = position.x;
     var y = position.y;
     if (x < 0 || y < 0) return null;
     x = (Math.floor(x / n) * n)
     y = (Math.floor(y / n) * n)
     return {x: x, y: y};
}
$(canvas).mousedown(function(evt) {
     drw = true;
     paint(evt);
}).mouseup(function(){
     drw = false;
});


//   Create a binary string based on the values found in adjacent tiles.
function checkAdjTiles(x, y)
{
     var str = "";
     var i, j;

     for(i = x - 1; i < x + 2; i++)
     {
          for(j = y - 1; j < y + 2; j++)
          {
               //   This needs to be using the right data
               if(cell[i][j] == obstacle)
                    str += "1";
               else {
                    str += "0";
               }
          }
     }

     return str;
}

function greenBtn()
{
     greenBrush = true;
     redBrush = false;
     yellowBrush = false;
}

function redBtn()
{
     greenBrush = false;
     redBrush = true;
     yellowBrush = false;
}

function yellowBtn()
{
     greenBrush = false;
     redBrush = false;
     yellow = true;
}

function paint(evt)
{
     var pos;
     var map = new Map(n, n);

     grassBrush = true;

          $(canvas).mousemove(function(evt) {
               if(drw)
               {
                    var r = Math.floor((Math.random() * 100) % 4);

                    if(greenBrush)
                    {
                         if(r == 0)
                              img.src = "../assets/grass01.bmp";
                         else if(r == 1)
                              img.src = "../assets/grass02.bmp";
                         else if(r == 2)
                              img.src = "../assets/grass03.bmp";
                         else if(r == 3)
                              img.src = "../assets/grass04.bmp";
                    }

                    if(redBrush)
                    {
                         img.src = "../assets/GridTile.bmp";
                    }

                    if(yellowBrush)
                    {
                         if(r == 0)
                              img.src = "../assets/yellow01.bmp";
                         else if(r == 1)
                              img.src = "../assets/yellow02.bmp";
                         else if(r == 2)
                              img.src = "../assets/yellow03.bmp";
                         else if(r == 3)
                              img.src = "../assets/yellow04.bmp";
                    }

                    console.log(r);

                    pos = getNearestSquare(getMousePos(canvas, evt));
                    console.log(pos);
                    if (pos != null)
                    {
                       context.drawImage(img, pos.x, pos.y, n, n);
                       // context.fillRect(pos.x,pos.y,25,25);
                    }
               }
          });

}

// function smartPaint(evt)


// $(canvas).mouseup(function(evt) {
//      drw = false;
// });
