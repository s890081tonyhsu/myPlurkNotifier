OAuth.initialize("lSgIX_kBDPoIH1hwRtnOoIf5PeU");

var plurkAPI;

chrome.storage.local.set({'connect': false});

function connect(sendResponse){
	chrome.storage.local.get('connect', function(res){
		if(!res.connect){
			OAuth.popup("plurk", function(e,r) {
				plurkAPI = r;
				r.get("/APP/Users/me").done(function(me){
					chrome.storage.local.set({'/APP/Users/me': me});
					sendResponse(me);
				});
			});
			chrome.storage.local.set({'connect': true});
		}else{
			path = '/APP/Users/me';
			chrome.storage.local.get(path, function(res){
				console.log(res[path]);
				sendResponse(res[path]);
			});
		}
	});
}

function getData(data, sendResponse){
	chrome.storage.local.get(data, function(res){
		if(!chrome.runtime.lastError){
			sendResponse(res[data]);
		}else{
			plurkAPI.get(data).done(function(apiget) {
				sendResponse(apiget);
				chrome.storage.local.set({data: apiget});
			});
		}
	});
}

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	console.log(message);
	if(message.method == "connect"){
		connect(sendResponse);
		return true;
	}
  if(message.method == "GET"){
		getData(message.data, sendResponse);
    return true;
  }
});
