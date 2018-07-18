var scanEnabled = false;
var fireEnabled = false;
var ifEnabled = false;
var conditionEnabled = false;
var labelEnabled = false;



function compile()
{
     var code = document.getElementById("editor").value.toUpperCase();
     console.log("Code: " + code);
     console.log("Output: " + Lexer(code));
}

function ifBtnPressed()
{
     var text = document.getElementById("editor").value;
     scanEnabled = false;
     fireEnabled = false;
     ifEnabled = true;
     text += "\tIF ";
     document.getElementById("editor").value = text;
     hideOrShow("conditionBtn", true);
     hideOrShow("tankBtn", true);
     hideOrShow("enemyBtn", true);
     hideOrShow("closestBtn", true);
     hideOrShow("ifBtn", false);
     hideOrShow("moveBtn", false);
     hideOrShow("scanBtn", false);
     hideOrShow("turnBtn", false);
     hideOrShow("rotateBtn", false);
     hideOrShow("fireBtn", false);

}

function conditionBtnPressed()
{
     hideOrShow("conditionBtn", false);
     hideOrShow("tankBtn", false);
     hideOrShow("enemyBtn", false);
     hideOrShow("closestBtn", false);
     hideOrShow("varLabel", true);
     hideOrShow("varBox", true);
     hideOrShow("enterVarBtn", true);

}

function moveBtnPressed()
{
     var text = document.getElementById("editor").value;

     text += "\tMOVE ";
     document.getElementById("editor").value = text;
     hideOrShow("forwardBtn", true);
     hideOrShow("backwardBtn", true);
     hideOrShow("ifBtn", false);
     hideOrShow("moveBtn", false);
     hideOrShow("scanBtn", false);
     hideOrShow("turnBtn", false);
     hideOrShow("rotateBtn", false);
     hideOrShow("fireBtn", false);
}

function fireBtnPressed()
{
     var text = document.getElementById("editor").value;
     scanEnabled = false;
     fireEnabled = true;
     ifEnabled = false;
     text += "\tFIRE AT ";
     document.getElementById("editor").value = text;
     hideOrShow("enemyBtn", true);
     hideOrShow("obstBtn", true);
     hideOrShow("objBtn", true);
     hideOrShow("ifBtn", false);
     hideOrShow("moveBtn", false);
     hideOrShow("scanBtn", false);
     hideOrShow("turnBtn", false);
     hideOrShow("rotateBtn", false);
     hideOrShow("fireBtn", false);
}

function scanBtnPressed()
{
     var text = document.getElementById("editor").value;
     scanEnabled = true;
     fireEnabled = false;
     ifEnabled = false;
     text += "\tSCAN ";
     document.getElementById("editor").value = text;
     hideOrShow("enemyBtn", true);
     hideOrShow("objBtn", true);
     hideOrShow("ifBtn", false);
     hideOrShow("moveBtn", false);
     hideOrShow("scanBtn", false);
     hideOrShow("turnBtn", false);
     hideOrShow("rotateBtn", false);
}

function enemyBtnPressed()
{
     var text = document.getElementById("editor").value;

     if(fireEnabled)
     {
          text += "ENEMY\n";
          document.getElementById("editor").value = text;
          hideOrShow("ifBtn", true);
          hideOrShow("moveBtn", true);
          hideOrShow("scanBtn", true);
          hideOrShow("turnBtn", true);
          hideOrShow("rotateBtn", true);
          hideOrShow("fireBtn", true);
          hideOrShow("enemyBtn", false);
          hideOrShow("objBtn", false);
          hideOrShow("obstBtn", false);
     }

     if(scanEnabled)
     {
          text += "FOR ENEMY ";
          document.getElementById("editor").value = text;
          hideOrShow("ifBtn", true);
          hideOrShow("moveBtn", true);
          hideOrShow("scanBtn", true);
          hideOrShow("turnBtn", true);
          hideOrShow("rotateBtn", true);
          hideOrShow("enemyBtn", false);
          hideOrShow("objBtn", false);
     }

     if(ifEnabled)
     {
          text += "ENEMY ";
          document.getElementById("editor").value = text;
          hideOrShow("seenBtn", true);
          hideOrShow("unseenBtn", true);
          hideOrShow("withinBtn", true);
          hideOrShow("tankBtn", false);
          hideOrShow("enemyBtn", false);
          hideOrShow("closestBtn", false);
          hideOrShow("conditionBtn", false);
     }
}

function objBtnPressed()
{
     var text = document.getElementById("editor").value;

     if(!fireEnabled)
          text += "FOR OBJECT\n";
     else
          text += "OBJECT\n";
     document.getElementById("editor").value = text;
     hideOrShow("ifBtn", true);
     hideOrShow("moveBtn", true);
     hideOrShow("scanBtn", true);
     hideOrShow("turnBtn", true);
     hideOrShow("rotateBtn", true);
     hideOrShow("enemyBtn", false);
     hideOrShow("objBtn", false);
}

function obstBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "OBSTRUCTION\n";
     document.getElementById("editor").value = text;
     hideOrShow("ifBtn", true);
     hideOrShow("moveBtn", true);
     hideOrShow("scanBtn", true);
     hideOrShow("turnBtn", true);
     hideOrShow("rotateBtn", true);
     hideOrShow("enemyBtn", false);
     hideOrShow("obstBtn", false);
}

function turnBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "\tTURN ";
     document.getElementById("editor").value = text;
     hideOrShow("rightBtn", true);
     hideOrShow("leftBtn", true);
     hideOrShow("angleBtn", true);
     hideOrShow("scannerBtn", true);
     hideOrShow("leftBtn", true);
     hideOrShow("ifBtn", false);
     hideOrShow("moveBtn", false);
     hideOrShow("scanBtn", false);
     hideOrShow("turnBtn", false);
     hideOrShow("rotateBtn", false);
}

function rightBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "RIGHT\n";
     document.getElementById("editor").value = text;
     hideOrShow("ifBtn", true);
     hideOrShow("moveBtn", true);
     hideOrShow("scanBtn", true);
     hideOrShow("turnBtn", true);
     hideOrShow("rotateBtn", true);
     hideOrShow("rightBtn", false);
     hideOrShow("leftBtn", false);
     hideOrShow("angleBtn", false);
     hideOrShow("leftBtn", false);
     hideOrShow("scannerBtn", false);
}
function leftBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "LEFT\n";
     document.getElementById("editor").value = text;
     hideOrShow("ifBtn", true);
     hideOrShow("moveBtn", true);
     hideOrShow("scanBtn", true);
     hideOrShow("turnBtn", true);
     hideOrShow("rotateBtn", true);
     hideOrShow("rightBtn", false);
     hideOrShow("leftBtn", false);
     hideOrShow("angleBtn", false);
     hideOrShow("leftBtn", false);
     hideOrShow("scannerBtn", false);
}

function angleBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "TO ANGLE ";
     document.getElementById("editor").value = text;
     hideOrShow("valueBox", true);
     hideOrShow("vbLabel", true);
     hideOrShow("enterBtn", true);
     hideOrShow("rightBtn", false);
     hideOrShow("leftBtn", false);
     hideOrShow("angleBtn", false);
     hideOrShow("leftBtn", false);
     hideOrShow("scannerBtn", false);
}

function scannerBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "TO SCANNER\n";
     document.getElementById("editor").value = text;
     hideOrShow("ifBtn", true);
     hideOrShow("moveBtn", true);
     hideOrShow("scanBtn", true);
     hideOrShow("turnBtn", true);
     hideOrShow("rotateBtn", true);
     hideOrShow("rightBtn", false);
     hideOrShow("leftBtn", false);
     hideOrShow("angleBtn", false);
     hideOrShow("leftBtn", false);
     hideOrShow("scannerBtn", false);
}

function enterBtnPressed()
{
     var text = document.getElementById("editor").value;

     if(!ifEnabled)
     {
          text += document.getElementById("valueBox").value + "\n";
          document.getElementById("editor").value = text;
          document.getElementById("valueBox").value = "";
          hideOrShow("ifBtn", true);
          hideOrShow("moveBtn", true);
          hideOrShow("scanBtn", true);
          hideOrShow("turnBtn", true);
          hideOrShow("rotateBtn", true);
          hideOrShow("fireBtn", true);
          hideOrShow("vbLabel", false);
          hideOrShow("valueBox", false);
          hideOrShow("enterBtn", false);
     }
     else
     {
          text += document.getElementById("valueBox").value + " THEN ";
          document.getElementById("editor").value = text;
          document.getElementById("valueBox").value = "";
          hideOrShow("vbLabel", false);
          hideOrShow("valueBox", false);
          hideOrShow("enterBtn", false);
          hideOrShow("doBtn", false);
          hideOrShow("branchBtn", false);
          ifEnabled = false;
     }
}

function doBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "THEN DO ";
     document.getElementById("editor").value = text;
     hideOrShow("doBtn", false);
     hideOrShow("branchBtn", false);
     hideOrShow("plusBtn", false);
     hideOrShow("minusBtn", false);
     hideOrShow("varLabel", true);
     hideOrShow("varBox", true);
     hideOrShow("enterVarBtn", true);
     labelEnabled = true;
}

function branchBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "THEN BRANCH TO ";
     document.getElementById("editor").value = text;
     hideOrShow("doBtn", false);
     hideOrShow("branchBtn", false);
     hideOrShow("plusBtn", false);
     hideOrShow("minusBtn", false);
     hideOrShow("varLabel", true);
     hideOrShow("varBox", true);
     hideOrShow("enterVarBtn", true);
     labelEnabled = true;
}

function relopBtnPressed()
{
     hideOrShow("ltBtn", false);
     hideOrShow("gtBtn", false);
     hideOrShow("neqBtn", false);
     hideOrShow("leqBtn", false);
     hideOrShow("geqBtn", false);
     hideOrShow("eqBtn", false);
     hideOrShow("varBtn", true);
     hideOrShow("valBtn", true);
}

function ltPressed()
{
     var text = document.getElementById("editor").value;
     text += "< ";
     document.getElementById("editor").value = text;
     relopBtnPressed();
}

function gtPressed()
{
     var text = document.getElementById("editor").value;
     text += "> ";
     document.getElementById("editor").value = text;
     relopBtnPressed();
}

function leqPressed()
{
     var text = document.getElementById("editor").value;
     text += "<= ";
     document.getElementById("editor").value = text;
     relopBtnPressed();
}

function geqPressed()
{
     var text = document.getElementById("editor").value;
     text += ">= ";
     document.getElementById("editor").value = text;
     relopBtnPressed();
}

function neqPressed()
{
     var text = document.getElementById("editor").value;
     text += "<> ";
     document.getElementById("editor").value = text;
     relopBtnPressed();
}

function eqPressed()
{
     var text = document.getElementById("editor").value;
     text += "= ";
     document.getElementById("editor").value = text;
     relopBtnPressed();
}

function plusPressed()
{
     var text = document.getElementById("editor").value;
     text += "+ ";
     document.getElementById("editor").value = text;
     hideOrShow("plusBtn", false);
     hideOrShow("minusBtn", false);
     hideOrShow("vbLabel", true);
     hideOrShow("valueBox", true);
     hideOrShow("enterBtn", true);

}

function minusPressed()
{
     var text = document.getElementById("editor").value;
     text += "- ";
     document.getElementById("editor").value = text;
     hideOrShow("plusBtn", false);
     hideOrShow("minusBtn", false);
     hideOrShow("vbLabel", true);
     hideOrShow("valueBox", true);
     hideOrShow("enterBtn", true);
}




function enterVarBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += document.getElementById("varBox").value + " ";
     document.getElementById("editor").value = text;
     document.getElementById("varBox").value = "";


     if(!conditionEnabled && !labelEnabled)
     {
          hideOrShow("ltBtn", true);
          hideOrShow("gtBtn", true);
          hideOrShow("neqBtn", true);
          hideOrShow("leqBtn", true);
          hideOrShow("geqBtn", true);
          hideOrShow("eqBtn", true);
          hideOrShow("varLabel", false);
          hideOrShow("varBox", false);
          hideOrShow("enterVarBtn", false);
          conditionEnabled = true;
     }
     else if(conditionEnabled)
     {
          hideOrShow("plusBtn", true);
          hideOrShow("minusBtn", true);
          hideOrShow("doBtn", true);
          hideOrShow("branchBtn", true);
          hideOrShow("varLabel", false);
          hideOrShow("varBox", false);
          hideOrShow("enterVarBtn", false);
          conditionEnabled = false;
     }

     if(labelEnabled)
     {
          text = document.getElementById("editor").value;
          text += "\n";
          document.getElementById("editor").value = text;
          hideOrShow("ifBtn", true);
          hideOrShow("moveBtn", true);
          hideOrShow("scanBtn", true);
          hideOrShow("turnBtn", true);
          hideOrShow("rotateBtn", true);
          hideOrShow("fireBtn", true);
          hideOrShow("varLabel", false);
          hideOrShow("varBox", false);
          hideOrShow("enterVarBtn", false);
          labelEnabled = false;
     }
}



function varBtnPressed()
{
     hideOrShow("varLabel", true);
     hideOrShow("varBox", true);
     hideOrShow("enterVarBtn", true);
     hideOrShow("varBtn", false);
     hideOrShow("valBtn", false);
}

function valBtnPressed()
{
     hideOrShow("vbLabel", true);
     hideOrShow("valueBox", true);
     hideOrShow("enterBtn", true);
     hideOrShow("varBtn", false);
     hideOrShow("valBtn", false);
}

function closestBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "CLOSEST OBJECT ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("seenBtn", true);
     hideOrShow("unseenBtn", true);
     hideOrShow("conditionBtn", false);
     hideOrShow("tankBtn", false);
     hideOrShow("enemyBtn", false);
     hideOrShow("closestBtn", false);
}

function tankBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "TANK ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("treadsBtn", true);
     hideOrShow("movementBtn", true);
     hideOrShow("fuelBtn", true);
     hideOrShow("conditionBtn", false);
     hideOrShow("tankBtn", false);
     hideOrShow("enemyBtn", false);
     hideOrShow("closestBtn", false);
}

function movementBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "MOVEMENT ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("treadsBtn", false);
     hideOrShow("movementBtn", false);
     hideOrShow("fuelBtn", false);
     hideOrShow("obstructedBtn", true);
     hideOrShow("clearBtn", true);
}

function fuelBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "FUEL ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("treadsBtn", false);
     hideOrShow("movementBtn", false);
     hideOrShow("fuelBtn", false);
     hideOrShow("remainingBtn", true);
     hideOrShow("emptyBtn", true);
}

function remainingBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "REMAINING ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("remainingBtn", false);
     hideOrShow("emptyBtn", false);
     hideOrShow("doBtn", true);
     hideOrShow("branchBtn", true);
}

function seenBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "SEEN ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("seenBtn", false);
     hideOrShow("unseenBtn", false);
     hideOrShow("withinBtn", false);
     hideOrShow("doBtn", true);
     hideOrShow("branchBtn", true);
}

function unseenBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "UNSEEN ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("seenBtn", false);
     hideOrShow("unseenBtn", false);
     hideOrShow("withinBtn", false);
     hideOrShow("doBtn", true);
     hideOrShow("branchBtn", true);
}

function withinBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "WITHIN RANGE ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("seenBtn", false);
     hideOrShow("unseenBtn", false);
     hideOrShow("withinBtn", false);
     hideOrShow("doBtn", true);
     hideOrShow("branchBtn", true);
}

function emptyBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "EMPTY ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("remainingBtn", false);
     hideOrShow("emptyBtn", false);
     hideOrShow("doBtn", true);
     hideOrShow("branchBtn", true);
}

function obstructedBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "OBSTRUCTED ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("obstructedBtn", false);
     hideOrShow("clearBtn", false);
     hideOrShow("doBtn", true);
     hideOrShow("branchBtn", true);
}

function clearBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "CLEAR ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("obstructedBtn", false);
     hideOrShow("clearBtn", false);
     hideOrShow("doBtn", true);
     hideOrShow("branchBtn", true);
}

function treadsBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "TREADS ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("treadsBtn", false);
     hideOrShow("movementBtn", false);
     hideOrShow("fuelBtn", false);
     hideOrShow("functionalBtn", true);
     hideOrShow("nonfunctionalBtn", true);
}

function functionalBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "FUNCTIONAL ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("functionalBtn", false);
     hideOrShow("nonfunctionalBtn", false);
     hideOrShow("doBtn", true);
     hideOrShow("branchBtn", true);
}

function nonfunctionalBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "NONFUNCTIONAL ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("functionalBtn", false);
     hideOrShow("nonfunctionalBtn", false);
     hideOrShow("doBtn", true);
     hideOrShow("branchBtn", true);
}

function fuelBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "FUEL ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("treadsBtn", false);
     hideOrShow("movementBtn", false);
     hideOrShow("fuelBtn", false);
     hideOrShow("remainingBtn", true);
     hideOrShow("emptyBtn", true);
}

function forwardBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "FORWARD ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("vbLabel", true);
     hideOrShow("valueBox", true);
     hideOrShow("enterBtn", true);
     hideOrShow("forwardBtn", false);
     hideOrShow("backwardBtn", false);
}

function backwardBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "BACKWARD ";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("vbLabel", true);
     hideOrShow("valueBox", true);
     hideOrShow("enterBtn", true);
     hideOrShow("forwardBtn", false);
     hideOrShow("backwardBtn", false);
}


function rotateBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "\tROTATE ";
     document.getElementById("editor").value = text;
}

function saveFile(){
	var url_save = "https://group9-tankgame.herokuapp.com/save";

	let fileData = {
		fileName: document.getElementById("filename").value,
		fileCode: document.getElementById("editor").value
	}

	$.post(url_save, fileData, function(res, status){

	});
}




var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for(var i=0;i<count;i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1;
        }
    }
}

function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}
