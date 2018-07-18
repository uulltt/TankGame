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

function setEditorText(word){
	 var text = document.getElementById("editor").value;
     text += word;
     document.getElementById("editor").value = text;
}

function showIfMoveScanTurnRotate(show){
	hideOrShow("ifBtn", show);
     hideOrShow("moveBtn", show);
     hideOrShow("scanBtn", show);
     hideOrShow("turnBtn", show);
	 hideOrShow("rotateBtn", show);
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
    showIfMoveScanTurnRotate(false);
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
     setEditorText("\tMOVE ");
     hideOrShow("forwardBtn", true);
     hideOrShow("backwardBtn", true);
     showIfMoveScanTurnRotate(false);
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
    showIfMoveScanTurnRotate(false);
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
     showIfMoveScanTurnRotate(false);
}

function enemyBtnPressed()
{
     var text = document.getElementById("editor").value;

     if(fireEnabled)
     {
          text += "ENEMY\n";
          document.getElementById("editor").value = text;
          showIfMoveScanTurnRotate(true);
          hideOrShow("fireBtn", true);
          hideOrShow("enemyBtn", false);
          hideOrShow("objBtn", false);
          hideOrShow("obstBtn", false);
     }

     if(scanEnabled)
     {
          text += "FOR ENEMY ";
          document.getElementById("editor").value = text;
         showIfMoveScanTurnRotate(true);
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
    setEditorText(!fireEnabled ? "FOR OBJECT\n" : "OBJECT\n");
     showIfMoveScanTurnRotate(true);
     hideOrShow("enemyBtn", false);
     hideOrShow("objBtn", false);
}

function obstBtnPressed()
{
    setEditorText("OBSTRUCTION\n");
     showIfMoveScanTurnRotate(true);
     hideOrShow("enemyBtn", false);
     hideOrShow("obstBtn", false);     
	 hideOrShow("fireBtn", false);

}
function showRightLeftAngleScanner(show){
	hideOrShow("rightBtn", show);
     hideOrShow("leftBtn", show);
     hideOrShow("angleBtn", show);
     hideOrShow("scannerBtn", show);
}

function turnBtnPressed()
{
    setEditorText("\tTURN ");
     showRightLeftAngleScanner(true);
     showIfMoveScanTurnRotate(false);
     hideOrShow("fireBtn", false);
}


function showValueEnter(show){
	hideOrShow("valueBox", show);
     hideOrShow("vbLabel", show);
     hideOrShow("enterBtn", show);
}

function rightLeftScannerPressed(text){
	setEditorText(text);
	showIfMoveScanTurnRotate(true);
	 showRightLeftAngleScanner(false);
}

function angleBtnPressed()
{
	setEditorText("TO ANGLE ");
     showValueEnter(true);
     showRightLeftAngleScanner(false);
}

function showDoBranch(show){
	 hideOrShow("doBtn", show);
     hideOrShow("branchBtn", show);
}

function enterBtnPressed()
{
     var text = document.getElementById("editor").value;

     if(!ifEnabled)
     {
          text += document.getElementById("valueBox").value + "\n";
          document.getElementById("editor").value = text;
          document.getElementById("valueBox").value = "";
          showIfMoveScanTurnRotate(true);
          showValueEnter(false);
     }
     else
     {
          text += document.getElementById("valueBox").value + " THEN ";
          document.getElementById("editor").value = text;
          document.getElementById("valueBox").value = "";
          showValueEnter(false);
          showDoBranch(true);
          ifEnabled = false;
     }
}

function doBranchPressed(text){
     setEditorText(text);
    showDoBranch(false);
     hideOrShow("plusBtn", false);
     hideOrShow("minusBtn", false);
     hideOrShow("varLabel", true);
     hideOrShow("varBox", true);
     hideOrShow("enterVarBtn", true);
     labelEnabled = true;
}

function relopBtnPressed(text)
{
	setEditorText(text);
     hideOrShow("ltBtn", false);
     hideOrShow("gtBtn", false);
     hideOrShow("neqBtn", false);
     hideOrShow("leqBtn", false);
     hideOrShow("geqBtn", false);
     hideOrShow("eqBtn", false);
     hideOrShow("varBtn", true);
     hideOrShow("valBtn", true);
}

function opBtnPressed(text)
{
	setEditorText(text);
	hideOrShow("plusBtn", false);
     hideOrShow("minusBtn", false);
     hideOrShow("vbLabel", true);
     hideOrShow("valueBox", true);
     hideOrShow("enterBtn", true);
}

function enterVarBtnPressed()
{
     setEditorText(document.getElementById("varBox").value + " ");
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
          showDoBranch(true);
          hideOrShow("varLabel", false);
          hideOrShow("varBox", false);
          hideOrShow("enterVarBtn", false);
          conditionEnabled = false;
     }

     if(labelEnabled)
     {
          setEditorText("\n");
          showIfMoveScanTurnRotate(true);
          hideOrShow("fireBtn", true);
          hideOrShow("varLabel", false);
          hideOrShow("varBox", false);
          hideOrShow("enterVarBtn", false);
          labelEnabled = false;
     }
}

function varvalPressed(){
	hideOrShow("varBtn", false);
     hideOrShow("valBtn", false);
}

function varBtnPressed()
{
     hideOrShow("varLabel", true);
     hideOrShow("varBox", true);
     hideOrShow("enterVarBtn", true);
     varvalPressed();
}

function valBtnPressed()
{
     hideOrShow("vbLabel", true);
     hideOrShow("valueBox", true);
     hideOrShow("enterBtn", true);
     varvalPressed();
}

function setTextResetValBox(text){
	setEditorText(text);
	document.getElementById("valueBox").value = "";
}

function conditionTankEnemyClosestFalse(){
	hideOrShow("conditionBtn", false);
     hideOrShow("tankBtn", false);
     hideOrShow("enemyBtn", false);
     hideOrShow("closestBtn", false);
}

function closestBtnPressed()
{
    setTextResetValBox("CLOSEST OBJECT ");
     hideOrShow("seenBtn", true);
     hideOrShow("unseenBtn", true);
     conditionTankEnemyClosestFalse();
}

function tankBtnPressed()
{
     setTextResetValBox("TANK ");
     hideOrShow("treadsBtn", true);
     hideOrShow("movementBtn", true);
     hideOrShow("fuelBtn", true);
    conditionTankEnemyClosestFalse();
}

function movFuelTreadsPressed(text, f1, f2){
	 setTextResetValBox(text);
     hideOrShow("treadsBtn", false);
     hideOrShow("movementBtn", false);
     hideOrShow("fuelBtn", false);
     hideOrShow(f1, true);
     hideOrShow(f2, true);
}



function remEmptyPressed(text){
	setTextResetValBox(text);
     hideOrShow("remainingBtn", false);
     hideOrShow("emptyBtn", false);
     showDoBranch(true);
}

function seenUnseenWithinPressed(text){
	setTextResetValBox(text);
     hideOrShow("seenBtn", false);
     hideOrShow("unseenBtn", false);
     hideOrShow("withinBtn", false);
     showDoBranch(true);
}

function obstClearPressed(text){
	setTextResetValBox(text);
	hideOrShow("obstructedBtn", false);
     hideOrShow("clearBtn", false);
    showDoBranch(true);
}

function funcNonFuncPressed(text){
	 setTextResetValBox(text);
     hideOrShow("functionalBtn", false);
     hideOrShow("nonfunctionalBtn", false);
     showDoBranch(true);
}

function fwdbckPressed(text){
	setTextResetValBox(text);
     hideOrShow("vbLabel", true);
     hideOrShow("valueBox", true);
     hideOrShow("enterBtn", true);
     hideOrShow("forwardBtn", false);
     hideOrShow("backwardBtn", false);
}

function rotateBtnPressed()
{
     setEditorText('\tROTATE ');
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

function getFiles(){
var url_files = "https://group9-tankgame.herokuapp.com/files"; 
	$.get(url_files,function(res, status){});
	
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
