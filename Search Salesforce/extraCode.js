var currentTabUrl;
var searchSalesforce = {
    "id": "searchSalesforce",
    "title": "Search in Salesforce",
    "contexts": ["selection"],
    "documentUrlPatterns":[ "https://*.force.com/*",
                            "https://*.salesforce.com/*",
                            "https://*.cloudforce.com/*"]
};
chrome.contextMenus.create(searchSalesforce);

var searchCMC = {
    "id": "searchCMC",
    "title": "Search in Appirio CMC",
    "contexts": ["selection"],
    "documentUrlPatterns":["all_urls"]
};
chrome.contextMenus.create(searchCMC);

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}


// first get the windowid
chrome.windows.getCurrent(function(window) {
    // then get the current active tab in that window
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      //alert(tabs[0].url);
      currentTabUrl = tabs[0].url;
   }
  );
});

chrome.contextMenus.onClicked.addListener(function(clickData){   
    if (clickData.menuItemId == "searchSalesforce" && clickData.selectionText && clickData.pageUrl){

        var hostName = url.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];
        var url = hostName + "/_ui/search/ui/UnifiedSearchResults?str=" + clickData.selectionText;
        window.open(url, '_blank');


      /*var queryInfo = {
        active: true, 
        currentWindow: true
      };

      chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0]; 
        var url = tab.url;
        currentTabUrl = tab.url;
        var hname = tabs[0].url.hostname; 
        callback(url,clickData,hname);
      });*/

    }
});


/*function callback(url,clickData,hname){
  var hostName = url.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];
  var url = hostName + "/_ui/search/ui/UnifiedSearchResults?str=" + clickData.selectionText;
  window.open(url, '_blank');

  
  var SFAPI_VERSION = 'v33.0';

  var sid = "Bearer " + getCookie('sid');
  var theurl = hostName + '/services/data/' + SFAPI_VERSION + '/sobjects/';
  window.open(theurl, '_blank');

}*/


/*chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
});

function getCookie(c_name)
  {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
      {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
          {
            return unescape(y);
          }
      }
  }*/