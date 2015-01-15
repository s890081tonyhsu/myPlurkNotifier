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

$(document).ready(nowTime);
$(document).ready(lastMsg);
$(document).ready(function(){
	$('#saveMsg').bind('click', saveMsg);
});

OAuth.initialize("lSgIX_kBDPoIH1hwRtnOoIf5PeU");
window.onload = function() {
    document.getElementById('connect').addEventListener('click', function() {
			OAuth.popup("plurk", function(e,r) {
					console.log(e);
					console.log(r);
					r.get('/APP/Users/me').done(function(data) {
						console.log(data);
					});
			});
    });
}
