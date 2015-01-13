function nowTime() { 
		var data = new Date();
		var hours = data.getHours();
		var minutes = data.getMinutes();
		var seconds = data.getSeconds();
		var time ="";
		time += ((hours > 12) ? hours-12 : hours);
		time += ((minutes <10) ? ":0" : ":") + minutes;
		time += ((seconds <10) ? ":0" : ":") + seconds;
		time +=(hours > 12) ? " P.M.": " A.M.";
		$('#time').text(time);
		setTimeout(nowTime,1000);
}
$(document).ready(nowTime);
