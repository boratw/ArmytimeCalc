
function LoadPrevious()
{
	for(var day = 0; day < 5; ++day)
	{
		let t = window.localStorage.getItem("in" + day);
		if(t != null)
		{
			document.getElementById("in" + day).value = FormatTime0(t);
			PushIntime(day, Number(t));
		}
		t = window.localStorage.getItem("out" + day);
		if(t != null)
		{
			document.getElementById("out" + day).value = FormatTime0(t);
			PushOuttime(day, Number(t));
		}
		t = window.localStorage.getItem("time" + day);
		if(t != null)
		{
			document.getElementById("time" + day).value = FormatTime(t);
			PushApptime(day, Number(t));
		}
		t = window.localStorage.getItem("type" + day);
		if(t != null)
		{
			timetype[day] = Number(t);
			PushType(day);
		}
	}
	Calculate();
}

function Erase()
{
	for(var day = 0; day < 5; ++day)
	{
		window.localStorage.removeItem("in" + day);
		window.localStorage.removeItem("out" + day);
		window.localStorage.removeItem("time" + day);
		window.localStorage.removeItem("type" + day);
		inlock[day] = false;
		outlock[day] = false;
		timelock[day] = false;
		intime[day] = 540;
		outtime[day] = 1080;
		timetype[day] = 0;
		document.getElementById("in" + day).value = "09:00";
		document.getElementById("out" + day).value = "18:00";
		document.getElementById("in" + day).style.backgroundColor = "white"
		document.getElementById("out" + day).style.backgroundColor = "white"
		document.getElementById("time" + day).style.backgroundColor = "white"
		document.getElementById("in" + day).disabled = false;
		document.getElementById("out" + day).disabled = false;
		document.getElementById("time" + day).disabled = false;
		PushType(day);
	}
	Calculate();
}

function Hello()
{
	var n = new Date();
	var day = n.getDay();
	if(day >= 1 && day <= 5)
	{
		day--;
		let t = n.getHours() * 60 + n.getMinutes();
		document.getElementById("in" + day).value = FormatTime0(t);
		PushIntime(day, t);
		Calculate();
	}
}

function Goodbye()
{
	var n = new Date();
	var day = n.getDay();
	if(day >= 1 && day <= 5)
	{
		day--;
		let t = n.getHours() * 60 + n.getMinutes();
		document.getElementById("out" + day).value = FormatTime0(t);
		PushOuttime(day, t);
		Calculate();
		
	}
}


function Timechanged(type, day)
{
	if(type == 0)
	{
		PushIntime(day, CheckTime(document.getElementById("in" + day).value));
		Calculate();
	}
	else if(type == 1)
	{
		PushOuttime(day, CheckTime(document.getElementById("out" + day).value));
		Calculate();
	}
	else if(type == 2)
	{
		if(document.getElementById("time" + day).value == "")
		{
			PushApptime(day, null);
		}
		else
		{
			let t = CheckTime(document.getElementById("time" + day).value)
			if(isNaN(t))
			{
				PushApptime(day, 0);
				document.getElementById("time" + day).style.backgroundColor = "LightPink"
			}
			else
			{
				PushApptime(day, t);
			}
			Calculate();
		}
	}
}

function inputfocus(day)
{
	if(timelock[day] == false)
		document.getElementById("time" + day).value = "";
		
}
function loosefocus(day)
{
	Calculate();
}

function inputtype(day)
{
	timetype[day]++;
	if(timetype[day] == 3)
	{
		timetype[day] = 0;
	}
	window.localStorage.setItem("type" + day, timetype[day]);
	PushType(day);
}

function PushIntime(day, t)
{
	document.getElementById("in" + day).style.backgroundColor = "LightSkyBlue"
	inlock[day] = true;
	intime[day] = t;
	window.localStorage.setItem("in" + day, t);
	if(outlock[day] && timelock[day])
	{
		timelock[day] = false;
		document.getElementById("time" + day).style.backgroundColor = "White"
		window.localStorage.removeItem("time" + day)
	}
}
function PushOuttime(day, t)
{
	document.getElementById("out" + day).style.backgroundColor = "LightSkyBlue"
	outlock[day] = true;
	outtime[day] =  t;
	window.localStorage.setItem("out" + day, t);
	if(inlock[day] && timelock[day])
	{
		timelock[day] = false;
		document.getElementById("time" + day).style.backgroundColor = "White"
		window.localStorage.removeItem("time" + day)
	}
}
function PushApptime(day, t)
{
	if(t == null)
	{
		timelock[day] = false;
		document.getElementById("time" + day).style.backgroundColor = "White";
		window.localStorage.removeItem("time" + day)
	}
	else
	{
		document.getElementById("time" + day).style.backgroundColor = "LightSkyBlue";
		apptime[day] = t;
		timelock[day] = true;
		window.localStorage.setItem("time" + day, t);
		if(inlock[day] && outlock[day])
		{
			outlock[day] = false;
			document.getElementById("out" + day).style.backgroundColor = "White";
			window.localStorage.removeItem("out" + day)
		}
	}

}

function PushType(day)
{
	if(timetype[day] == 0)
	{
		document.getElementById("type" + day).style.backgroundColor = "White";
		document.getElementById("type" + day).value = "??????";
	}
	else if(timetype[day] == 1)
	{
		document.getElementById("type" + day).style.backgroundColor = "pink";
		document.getElementById("type" + day).value = "??????";
		document.getElementById("in" + day).value = "";
		document.getElementById("in" + day).disabled = true;
		document.getElementById("in" + day).style.backgroundColor = "lightgray";
		document.getElementById("out" + day).value = "";
		document.getElementById("out" + day).disabled = true;
		document.getElementById("out" + day).style.backgroundColor = "lightgray";
		document.getElementById("time" + day).value = "";
		document.getElementById("time" + day).disabled = true;
		document.getElementById("time" + day).style.backgroundColor = "lightgray";
	}
	else if(timetype[day] == 2)
	{
		document.getElementById("type" + day).style.backgroundColor = "#c8ffc8";
		document.getElementById("type" + day).value = "??????";
		document.getElementById("in" + day).disabled = false;
		if(inlock[day])
		{
			document.getElementById("in" + day).value = FormatTime0(intime[day]);
			document.getElementById("in" + day).style.backgroundColor = "LightSkyBlue"
		}
		else
		{
			document.getElementById("in" + day).value = "09:00"
			document.getElementById("in" + day).style.backgroundColor = "White"
		}
		document.getElementById("out" + day).disabled = false;
		if(outlock[day])
		{
			document.getElementById("out" + day).value = FormatTime0(outtime[day]);
			document.getElementById("out" + day).style.backgroundColor = "LightSkyBlue"
		}
		else
		{
			document.getElementById("out" + day).value = "18:00"
			document.getElementById("out" + day).style.backgroundColor = "White"
		}
		document.getElementById("time" + day).disabled = false;
		if(timelock[day])
		{
			document.getElementById("time" + day).value = FormatTime(apptime[day]);
			document.getElementById("time" + day).style.backgroundColor = "LightSkyBlue"
		}
		else
		{
			document.getElementById("time" + day).style.backgroundColor = "White"
		}
	}
	Calculate();
}