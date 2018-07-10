


function compile()
{
     var code = document.getElementById("editor").value.toUpperCase();
     console.log("Code: " + code);
     console.log("Output: " + Lexer(code));
}

function ifBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "\tIF ";
     document.getElementById("editor").value = text;
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
}

function scanBtnPressed()
{
     var text = document.getElementById("editor").value;
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
     text += "FOR ENEMY\n";
     document.getElementById("editor").value = text;
     hideOrShow("ifBtn", true);
     hideOrShow("moveBtn", true);
     hideOrShow("scanBtn", true);
     hideOrShow("turnBtn", true);
     hideOrShow("rotateBtn", true);
     hideOrShow("enemyBtn", false);
     hideOrShow("objBtn", false);
}

function objBtnPressed()
{
     var text = document.getElementById("editor").value;
     text += "FOR OBJECT\n";
     document.getElementById("editor").value = text;
     hideOrShow("ifBtn", true);
     hideOrShow("moveBtn", true);
     hideOrShow("scanBtn", true);
     hideOrShow("turnBtn", true);
     hideOrShow("rotateBtn", true);
     hideOrShow("enemyBtn", false);
     hideOrShow("objBtn", false);
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
     text += document.getElementById("valueBox").value + "\n";
     document.getElementById("editor").value = text;
     document.getElementById("valueBox").value = "";
     hideOrShow("ifBtn", true);
     hideOrShow("moveBtn", true);
     hideOrShow("scanBtn", true);
     hideOrShow("turnBtn", true);
     hideOrShow("rotateBtn", true);
     hideOrShow("vbLabel", false);
     hideOrShow("valueBox", false);
     hideOrShow("enterBtn", false);
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
