

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
     var PlayerTankeName = getElementById("EnemyTankName").value;

     //   Enemy Tank A.I.
     var enemyAI = getElementById("EnemyAI").value;

     //   Enemy X starting position.
     var enemyX = getElementById("EnemyX").value;

     //   Enemy Y starting position.
     var enemyY = getElementById("EnemyY").value;


}

function openFile(id){
	var url_open = "https://group9-tankgame.herokuapp.com/open";
	let fileselect = {
	 fileName: document.getElementById(id).value
	}
	$.post(url_open, fileselect, function(res, status){
		document.getElementById("filename").value = fileselect.fileName;
		document.getElementById("editor").value = res;
	}).fail(function () {
          document.getElementById("error").innerHTML = "Error: File not Opened.";
          displayErr();
     });
}
