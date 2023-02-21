
function onload()
{
	onresize();
	LoadPrevious();
}
function onresize()
{
	let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	let font = width / 24;
	if(font > 32 * window.devicePixelRatio)
		font = 32 * window.devicePixelRatio;
	document.body.style.fontSize = font + "px";
	
}

let tryerase = false;
function TryErase()
{
	if(tryerase)
	{
		document.getElementById("erase").value = "초기화";
		Erase();
		tryerase = false;
	}
	else
	{
		document.getElementById("erase").value = "확인";
		tryerase = true;
	}
}

function NoErase()
{
	document.getElementById("erase").value = "초기화";
	tryerase = false;
}