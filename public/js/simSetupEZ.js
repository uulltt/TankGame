var playerAISRC = "";
var enemyAISRC = "";

function runSimulation()
{
     //   Player Tank Name
     var playerTankName = getElementById("PlayerTankName").value;

     //   Player Tank A.I.
     var playerAI = getElementById("PlayerAI").value;

     //   Player X starting position.
     var playerX = getElementById("PlayerX").value;

     //   Player Y starting position.
     var playerY = getElementById("PlayerY").value;


     //   Enemy Tank Name
     var EnemyTankName = getElementById("EnemyTankName").value;

     //   Enemy Tank A.I.
     var enemyAI = getElementById("EnemyAI").value;

     //   Enemy X starting position.
     var enemyX = getElementById("EnemyX").value;

     //   Enemy Y starting position.
     var enemyY = getElementById("EnemyY").value;

     BuildSim();

     //var playerTank = new Tank(playerTankName, playerX, playerY, );
     //var enemyTank = new Tank(enemyTankName, enemyX, enemyY, );
     
}

function openFile(id){
	var url_open = "https://group9-tankgame.herokuapp.com/open";
	let fileselect = {
	 fileName: document.getElementById(id).value
	}
	$.post(url_open, fileselect, function(res, status){
		//document.getElementById("filename").value = fileselect.fileName;
		playerAISRC = res;
	}).fail(function () {
          document.getElementById("error").innerHTML = "Error: File not Opened.";
          displayErr();
     });
}

function loadFiles () {
     hideErrMessage();
     $.get("https://group9-tankgame.herokuapp.com/files", function (res, status) {
          console.log(res);
          var fileselect1 = document.getElementById("PlayerTankAI");
          var fileselect2 = document.getElementById("EnemyAI")
          var len1 = fileselect1.length;
          var len2 = fileselect2.length;
          for(var i = 0; i < len1; i++){
               fileselect1.remove(0);
          }
          for(var i = 0; i < len2; i++){
               fileselect2.remove(0);
          }
          for(var i = 0; i < res.length; i++){
               var option1 = document.createElement("option");
               option1.text = res[i];
               fileselect1.add(option1);
               var option2 = document.createElement("option");
               option2.text = res[i];
               fileselect2.add(option2);
          }
    })
    .fail(function () {
            document.getElementById("error").innerHTML = "Error: Files not Received.";
          displayErr();
     });
}

$(document).ready(function () {
     loadFiles();
});