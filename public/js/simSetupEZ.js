var playerAISRC = "";
var enemyAISRC = "";

function runSimulation()
{
     //   Player Tank Name
     var playerTankName = document.getElementById("PlayerTankName").value;

     //   Player Tank A.I.
     var playerAI = document.getElementById("PlayerAI").value;

     //   Player X starting position.
     var playerX = document.getElementById("PlayerX").value;

     //   Player Y starting position.
     var playerY = document.getElementById("PlayerY").value;


     //   Enemy Tank Name
     var EnemyTankName = document.getElementById("EnemyTankName").value;

     //   Enemy Tank A.I.
     var enemyAI = document.getElementById("EnemyAI").value;

     //   Enemy X starting position.
     var enemyX = document.getElementById("EnemyX").value;

     //   Enemy Y starting position.
     var enemyY = document.getElementById("EnemyY").value;


     openFile();

     //BuildSim();

     //var playerTank = new Tank(playerTankName, playerX, playerY, );
     //var enemyTank = new Tank(enemyTankName, enemyX, enemyY, );
     
}

function openFile(){
	var url_open = "https://group9-tankgame.herokuapp.com/open";
     var select1 = document.getElementById("PlayerTankAI");
     var select2 = document.getElementById("EnemyAI");
	let fileselect = {
	 fileName: select1.options[select1.selectedIndex].value
	}
	$.post(url_open, fileselect, function(res, status){
		//document.getElementById("filename").value = fileselect.fileName;
		playerAISRC = Parser(Lexer(res));
	}).fail(function () {
          document.getElementById("error").innerHTML = "Error: File not Opened.";
          displayErr();
     });
     fileselect = {
      fileName: select2.options[select2.selectedIndex].value
     }
     $.post(url_open, fileselect, function(res, status){
          //document.getElementById("filename").value = fileselect.fileName;
          enemyAISRC = Parser(Lexer(res));
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
               option1.value = res[i];
               fileselect1.add(option1);
               var option2 = document.createElement("option");
               option2.text = res[i];
               option2.value = res[i]
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