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
     hideOrShow("fireBtn", show);
}


function showConditionTankEnemyClosest(show){
	hideOrShow("conditionBtn", show);
     hideOrShow("tankBtn", show);
	 hideOrShow("enemyBtn", show);
     hideOrShow("closestBtn", show);
}

function ifBtnPressed()
{
     scanEnabled = false;
     fireEnabled = false;
     ifEnabled = true;
     setEditorText("\tIF ");
     showConditionTankEnemyClosest(true);
    showIfMoveScanTurnRotate(false);
     hideOrShow("fireBtn", false);
}

function conditionBtnPressed()
{
    showConditionTankEnemyClosest(false);
     showVarEnter(true);

}

function moveBtnPressed()
{
     setEditorText("\tMOVE ");
     hideOrShow("forwardBtn", true);
     hideOrShow("backwardBtn", true);
     showIfMoveScanTurnRotate(false);
     hideOrShow("fireBtn", false);
}

function showEnemyObj(show){
	hideOrShow("enemyBtn", show);
     hideOrShow("objBtn", show);
}

function fireBtnPressed()
{
     scanEnabled = false;
     fireEnabled = true;
     ifEnabled = false;
     setEditorText("\tFIRE AT ")
     showEnemyObj(true);
     hideOrShow("obstBtn", true);
    showIfMoveScanTurnRotate(false);
     hideOrShow("fireBtn", false);
}

function scanBtnPressed()
{
     scanEnabled = true;
     fireEnabled = false;
     ifEnabled = false;
     setEditorText("\tSCAN ");
     showEnemyObj(true);
     showIfMoveScanTurnRotate(false);
}

function enemyBtnPressed()
{

     if(fireEnabled)
     {
         setEditorText("ENEMY\n");
          showIfMoveScanTurnRotate(true);
          hideOrShow("fireBtn", true);
          showEnemyObj(false);
          hideOrShow("obstBtn", false);
     }

     if(scanEnabled)
     {
          setEditorText("FOR ENEMY\n");
         showIfMoveScanTurnRotate(true);
          showEnemyObj(false);
     }

     if(ifEnabled)
     {
          setEditorText("ENEMY ");
          hideOrShow("seenBtn", true);
          hideOrShow("unseenBtn", true);
          hideOrShow("withinBtn", true);
          showConditionTankEnemyClosest(false);
     }
}

function objBtnPressed()
{
    setEditorText(!fireEnabled ? "FOR OBJECT\n" : "OBJECT\n");
     showIfMoveScanTurnRotate(true);
     showEnemyObj(false);
     hideOrShow("obstBtn", false);
}

function obstBtnPressed()
{
    setEditorText("OBSTRUCTION\n");
     showIfMoveScanTurnRotate(true);
     hideOrShow("enemyBtn", false);
     hideOrShow("obstBtn", false);
     hideOrShow("objBtn", false);
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
      hideOrShow("frontBtn", false);
}


function angleBtnPressed()
{
	setEditorText("TO ANGLE ");
     showValueEnter(true);
     showRightLeftAngleScanner(false);
     hideOrShow("frontBtn", false);
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

function showVarEnter(show){
	hideOrShow("varLabel", show);
     hideOrShow("varBox", show);
     hideOrShow("enterVarBtn", show);
}

function showVar2Enter(show){
	hideOrShow("varLabel", show);
     hideOrShow("varBox", show);
     hideOrShow("enterVar2Btn", show);
}

function showLabEnter(show){
	hideOrShow("labLabel", show);
     hideOrShow("labBox", show);
     hideOrShow("enterLabBtn", show);
}

function showPlusMinus(show){
	hideOrShow("plusBtn", show);
     hideOrShow("minusBtn", show);
}

function doBranchPressed(text){
     setEditorText(text);
     showDoBranch(false);
     showPlusMinus(false);
     showLabEnter(true);
     labelEnabled = true;
}

function showRelOp(show){
	hideOrShow("ltBtn", show);
     hideOrShow("gtBtn", show);
     hideOrShow("neqBtn", show);
     hideOrShow("leqBtn", show);
     hideOrShow("geqBtn", show);
     hideOrShow("eqBtn", show);
}

function showVarVal(show){
	hideOrShow("varBtn", show);
     hideOrShow("valBtn", show);
}

function relopBtnPressed(text)
{
	setEditorText(text);
     showRelOp(false)
    showVarVal(true);
}

// HERE
function opBtnPressed(text)
{
	setEditorText(text);
	showPlusMinus(false);
     showValueEnter(true);
     showDoBranch(false);
}

function enterVarBtnPressed()
{
     setEditorText(document.getElementById("varBox").value + " ");
     document.getElementById("varBox").value = "";

     if(!conditionEnabled && !labelEnabled)
     {
          showRelOp(true);
          showVarEnter(false);
          conditionEnabled = true;
     }
     else if(conditionEnabled)
     {
          showPlusMinus(true);
          showDoBranch(true);
          showVarEnter(false);
          conditionEnabled = false;
     }

     if(labelEnabled)
     {
          setEditorText("\n");
          showIfMoveScanTurnRotate(true);
          hideOrShow("fireBtn", true);
          showVarEnter(false);
          labelEnabled = false;
     }
}

function enterVar2BtnPressed()
{
     setEditorText(document.getElementById("varBox").value + " ");
     document.getElementById("varBox").value = "";
     showPlusMinus(true);
     showDoBranch(true);
     showVar2Enter(false);
}

function enterLabBtnPressed()
{
     setEditorText(document.getElementById("labBox").value + "\n");
     document.getElementById("labBox").value = "";
     showIfMoveScanTurnRotate(true);
     hideOrShow("fireBtn", true);
     showLabEnter(false);
}

function varBtnPressed()
{
     showVarEnter(true);
     showVarVal(false);
}

function valBtnPressed()
{
    showValueEnter(true);
    showVarVal(false);
}

function setTextResetValBox(text){
	setEditorText(text);
	document.getElementById("valueBox").value = "";
}

function closestBtnPressed()
{
     setTextResetValBox("CLOSEST OBJECT ");
     hideOrShow("seenBtn", true);
     hideOrShow("unseenBtn", true);
     showConditionTankEnemyClosest(false);
}



function tankBtnPressed()
{
     setTextResetValBox("TANK ");
     hideOrShow("treadsBtn", true);
     hideOrShow("movementBtn", true);
     hideOrShow("fuelBtn", true);
     showConditionTankEnemyClosest(false);
}

function movFuelTreadsPressed(text, f1, f2){
	setTextResetValBox(text);
     hideOrShow("treadsBtn", false);
     hideOrShow("movementBtn", false);
     hideOrShow("fuelBtn", false);
     hideOrShow(f1, true);
     hideOrShow(f2, true);
}

function setTextValHide(text, f1, f2){
	setTextResetValBox(text);
     hideOrShow(f1, false);
     hideOrShow(f2, false);
     showDoBranch(true);
}

function seenUnseenWithinPressed(text){
	setTextResetValBox(text);
     hideOrShow("seenBtn", false);
     hideOrShow("unseenBtn", false);
     hideOrShow("withinBtn", false);
     showDoBranch(true);
}

function fwdbckPressed(text){
	setTextResetValBox(text);
     showValueEnter(true);
     hideOrShow("forwardBtn", false);
     hideOrShow("backwardBtn", false);
}

function rotateBtnPressed()
{
     setEditorText('\tROTATE ');
     showRightLeftAngleScanner(true);
     hideOrShow("frontBtn", true);
     showIfMoveScanTurnRotate(false);
     hideOrShow("scannerBtn", false);
     hideOrShow("fireBtn", false);
}

function saveFile(){
	var url_save = "https://group9-tankgame.herokuapp.com/save";

	let fileData = {
		fileName: document.getElementById("filename").value,
		fileCode: document.getElementById("editor").value
	}

	$.post(url_save, fileData, function(res, status){

	}).fail(function () {
          //displayErr();
     });
}

function getFiles(){
var url_files = "https://group9-tankgame.herokuapp.com/files";
var fileselect = document.getElementById("openfile");
	$.get(url_files,function(res, status){
		var len = fileselect.length;
		for(var i = 0; i < len; i++){
			fileselect.remove(0);
		}
		for(var i = 0; i < res.length; i++){
			var option = document.createElement("option");
			option.text = res[i];
		     fileselect.add(option);
		}
	}).fail(function () {
          //displayErr();
     });
}

function openFile(){
	var url_open = "https://group9-tankgame.herokuapp.com/open";
	let fileselect = {
	 fileName: document.getElementById("openfile").value
	}
	$.get(url_open, fileselect, function(res, status){
		document.getElementById("filename").value = fileselect;
		document.getElementById("editor").value = res;
	}).fail(function () {
          //displayErr();
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
