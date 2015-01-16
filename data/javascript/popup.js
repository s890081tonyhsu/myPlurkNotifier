function callReturn(method, data, responseFunc){
	chrome.runtime.sendMessage({method:method, data:data},function(response){
  	//here response will be the word you want
  	console.log(response);
		responseFunc(response);
	});
}

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

function lastMsg() {
	chrome.storage.local.get('test', function(res){
		$('#lastMsg span').text(res.test);
	});
	return;
}

function saveMsg() {
	var data = $('#testMsg').val();
	if(!data){
		return;
	}else{
		chrome.storage.local.set({'test': data}, function(){
			alert('Message saved!');
		});
		lastMsg();
	}
}

function personalData(response) {
	$('#connect').fadeOut();
	$('#name span').text(response.display_name);
	$('#name').fadeIn();
}

$(document).ready(nowTime);
$(document).ready(lastMsg);
$(document).ready(function(){
	$('#saveMsg').bind('click', saveMsg);
	$('#connect').bind('click', function(){
		callReturn("GET", '/APP/Users/me', personalData);
	});
});
