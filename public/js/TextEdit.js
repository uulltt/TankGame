

function compile()
{
     var code = document.getElementById("editor").value.toUpperCase();
     console.log("Code: " + code);
     console.log("Output: " + Lexer(code));
}

function ifBtnPressed()
{
     document.getElementById("editor").innerHTML = "\tIF";
}

function moveBtnPressed()
{

}

function saveFile(){
	var url_save = "https://group9-tankgame.herokuapp.com/save"
	
	let fileData = {
		fileName = document.getElementById("filename").innerHTML;
		fileCode = document.getElementById("editor").innerHTML;
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
	var dis = "flex";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}
