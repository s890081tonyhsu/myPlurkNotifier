OAuth.initialize("lSgIX_kBDPoIH1hwRtnOoIf5PeU");

function getData(data, sendResponse){
	OAuth.popup("plurk", function(e,r) {
		r.get(data).done(function(res) {
			sendResponse(res);	
		});
	});
}

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	console.log(message);
  if(message.method == "GET"){
		getData(message.data, sendResponse);
    return true;
  }
});
