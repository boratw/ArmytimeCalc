
let inlock = [false, false, false, false, false]
let outlock = [false, false, false, false, false]
let timelock = [false, false, false, false, false]
let intime = [540, 540, 540, 540, 540]
let outtime = [1080, 1080, 1080, 1080, 1080]
let apptime = [0, 0, 0, 0, 0]

function Calculate()
{
	let day;
	for(day = 0; day < 5; day++)
	{
		if(inlock[day] && outlock[day])
		{
			CalculateTime(day);
		}
	}
	let uncalc = 0;
	let alltime = 0;
	for(let day = 0; day < 5; day++)
	{
		if(timelock[day] || (inlock[day] && outlock[day]))
		{
			alltime += apptime[day];
			document.getElementById("time" + day).style.color = "black"
		}
		else
		{
			uncalc += 1;
			document.getElementById("time" + day).style.color = "gray"
		}
	}
	if(alltime > 2400)
	{
		document.getElementById("remain").innerHTML = FormatTime(alltime - 2400) + " 초과";
		document.getElementById("remain").style.color = "DodgerBlue"
	}
	else
	{
		document.getElementById("remain").innerHTML = FormatTime(2400 - alltime) + " 남음";
		document.getElementById("remain").style.color = "black"
	}
	if(uncalc >= 1)
	{
		let r;
		if(alltime < 2400)
			r = Math.floor((2400 - alltime) / uncalc);
		else
			r = 0;
		for(let day = 0; day < 5; day++)
		{
			if(!(timelock[day] || (inlock[day] && outlock[day])))
			{
				if(r > 240)
					apptime[day] = r;
				else
					apptime[day] = 240;
				document.getElementById("time" + day).value = FormatTime(r);
			}
		}
	}
	for(let day = 0; day < 5; day++)
	{
		if(!(inlock[day] && outlock[day]))
		{
			if(outlock[day]) 
			{
				CalculateIn(day);
			}
			else
			{
				CalculateOut(day);
			}
		}
	}
}

function CheckTime(s)
{
	if(s.split(":").length >= 2)
	{
		let splitted = s.split(":");
		if(splitted[1] == "")
			splitted[1] = "0";
		let h = parseInt(splitted[0], 10);
		let m = parseInt(splitted[1], 10);
		if(isNaN(h) || isNaN(m))
			return NaN;
		return h * 60 + m;
	}
	else
	{
		return Number(s) * 60;
	}
}

function FormatTime(t)
{
	let h = Math.floor(t / 60);
	let m = t % 60;
	if(m >= 10)
		return h + ":" + m;
	else
		return h + ":0" + m;
}
function FormatTime0(t)
{
	let h = Math.floor(t / 60);
	let m = t % 60;
	if(h >= 10)
	{
		if(m >= 10)
			return h + ":" + m;
		else
			return h + ":0" + m;
	}
	else
	{
		if(m >= 10)
			return "0" + h + ":" + m;
		else
			return "0" + h + ":0" + m;
	}
}
function CalculateTime(day)
{
	let i = intime[day];
	if(i < 360)
		i = 360;
	let ot = outtime[day] - i;
	let t = ot;
	if(i < 720 && outtime[day] > 720)
	{
		let m1 = 720 - i;
		if(m1 > 60)
			m1 = 60;
		let m2 = outtime[day] - 720;
		if(m2 > 60)
			m2 = 60;
		t -= (m1 + m2 - 60);
	}
	if(i < 1140 && outtime[day] > 1140)
	{
		let m1 = 1140 - i;
		if(m1 > 60)
			m1 = 60;
		let m2 = outtime[day] - 1140;
		if(m2 > 60)
			m2 = 60;
		t -= (m1 + m2 - 60);
	}
	if(ot - t < 30)
		t = ot - 30;
	if(t < 240)
		t = 0;
	else if(t > 720)
		t = 720;
	apptime[day] = t;
	document.getElementById("time" + day).value = FormatTime(t);
}
function CalculateIn(day)
{
	let i = outtime[day];
	let o = outtime[day];
	let t = 0;
	let r = 0;

	while(t < apptime[day])
	{
		if(apptime[day]-t >= 60)
			i -= 60;
		else if(apptime[day]-t >= 10)
			i -= 10;
		else
			i--;
		
		t = o - i;
		r = 0;
		if(i < 720 && o > 720)
		{
			let m1 = 720 - i;
			if(m1 > 60)
				m1 = 60;
			let m2 = o - 720;
			if(m2 > 60)
				m2 = 60;
			if(m1 + m2 > 60)
			{
				t -= (m1 + m2 - 60);
				r += (m1 + m2 - 60);
			}
		}
		if(i < 1140 && o > 1140)
		{
			let m1 = 1140 - i;
			if(m1 > 60)
				m1 = 60;
			let m2 = o - 1140;
			if(m2 > 60)
				m2 = 60;
			if(m1 + m2 > 60)
			{
				t -= (m1 + m2 - 60);
				r += (m1 + m2 - 60);
			}
		}
		if (r < 30)
			t -= (30 - r);
	}
	if(i < 360)
	{
		document.getElementById("in" + day).value = "06:00";
		document.getElementById("time" + day).style.backgroundColor = "PeachPuff"
	}
	else
	{
		document.getElementById("in" + day).value = FormatTime0(i);
		if(timelock[day])
			document.getElementById("time" + day).style.backgroundColor = "LightSkyBlue";
		else
			document.getElementById("time" + day).style.backgroundColor = "white";
	}
}

function CalculateOut(day)
{
	let i = intime[day];
	let o = intime[day];
	let t = 0;
	let r = 0;
	
	while(t < apptime[day])
	{
		if(apptime[day]-t >= 60)
			o += 60;
		else if(apptime[day]-t >= 10)
			o += 10;
		else
			o++;
		
		t = o - i;
		r = 0;
		if(i < 720 && o > 720)
		{
			let m1 = 720 - i;
			if(m1 > 60)
				m1 = 60;
			let m2 = o - 720;
			if(m2 > 60)
				m2 = 60;
			if(m1 + m2 > 60)
			{
				t -= (m1 + m2 - 60);
				r += (m1 + m2 - 60);
			}
		}
		if(i < 1140 && o > 1140)
		{
			let m1 = 1140 - i;
			if(m1 > 60)
				m1 = 60;
			let m2 = o - 1140;
			if(m2 > 60)
				m2 = 60;
			if(m1 + m2 > 60)
			{
				t -= (m1 + m2 - 60);
				r += (m1 + m2 - 60);
			}
		}
		if (r < 30)
			t -= (30 - r);
	}
	if(o > 1439)
	{
		document.getElementById("out" + day).value = "23:59";
		document.getElementById("time" + day).style.backgroundColor = "PeachPuff"
	}
	else
	{
		document.getElementById("out" + day).value = FormatTime0(o);
		if(timelock[day])
			document.getElementById("time" + day).style.backgroundColor = "LightSkyBlue";
		else
			document.getElementById("time" + day).style.backgroundColor = "white";
	}
}