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

var canvas = document.getElementById("paintGrid");
var context = canvas.getContext("2d");
var drw = false;

for (var x = 0; x < 2500; x += 50) {
  context.moveTo(x, 0);
  context.lineTo(x, 2500);
}

for (var y = 0; y < 2500; y += 50) {
  context.moveTo(0, y);
  context.lineTo(2500, y);
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

// function draw(e){
//      var pos = getMousePos(canvas, evt);
//
//      context.fillStyle = "#03CFFF";
//      context.fillRect (pos.x, pos.y, 4, 4);
// }

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
     x = (Math.floor(x / 50) * 50) + 0.5
     y = (Math.floor(y / 50) * 50) + 0.5
     return {x: x, y: y};
}
$(canvas).mousedown(function(evt) {
     drw = true;
     paint(evt);
}).mouseup(function(){
     drw = false;
});

function paint(evt)
{

          $(canvas).mousemove(function(evt) {
               if(drw)
               {
                    var r = Math.floor((Math.random() * 100) % 4);
                    img = new Image();

                    if(r == 0)
                         img.src = "../assets/grass01.bmp";
                    else if(r == 1)
                         img.src = "../assets/grass02.bmp";
                    else if(r == 2)
                         img.src = "../assets/grass03.bmp";
                    else if(r == 3)
                         img.src = "../assets/grass04.bmp";

                    console.log(r);

                    var pos = getNearestSquare(getMousePos(canvas, evt));
                    if (pos != null)
                    {
                       context.drawImage(img, pos.x, pos.y, 50, 50);
                       // context.fillRect(pos.x,pos.y,25,25);
                    }
               }
          })

}


// $(canvas).mouseup(function(evt) {
//      drw = false;
// });
