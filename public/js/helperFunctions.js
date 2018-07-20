//	Toggle error
function displayErr () {
     if ($("#error").css("display") == "none"){
          $("#error").slideToggle();
     }
}

function displayMessage () {
     if ($("#message").css("display") == "none"){
          $("#message").slideToggle();
     }
}

function hideErrMessage () {
     if ($("#error").css("display") != "none"){
          $("#error").slideToggle();
     }
	 if ($("#message").css("display") != "none"){
          $("#message").slideToggle();
     }
}

//   Turn elements display/visiblity on/off.  (Credit Professor Leinecker)
function show( elementId, showState )
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

//   Clear text from previously used text fields.
function clearText(elementId)
{
     document.getElementById(elementId).value = '';
}