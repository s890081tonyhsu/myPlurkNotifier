var opt = {
  type: "basic",
  title: "Plurk Notifier",
  message: "Primary message to display",
  iconUrl: "data/images/icon128.png"
}

function cloneData(source){
	return JSON.parse(JSON.stringify(source));
}

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
	var saveAlert = cloneData(opt);
	if(!data){
		saveAlert.message = "Null Input";
		chrome.notifications.create("saveReturn", saveAlert, function(notificationId){});
		return;
	}else{
		chrome.storage.local.set({'test': data}, function(){
			saveAlert.message = "Message Saved";
			console.log(saveAlert);
			chrome.notifications.create("saveReturn", saveAlert, function(notificationId){});
		});
		lastMsg();
	}
}

function connect(response) {
	$('#connect').fadeOut();
	$('#name span').text(response.display_name);
	$('#name').fadeIn();
	$('#function').fadeIn();
}

$(document).ready(nowTime);
$(document).ready(lastMsg);
$(document).ready(function(){
	$('#saveMsg').bind('click', saveMsg);
	$('#connect').bind('click', function(){
		callReturn("connect", '', connect);
	});
});
