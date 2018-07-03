//Global Variables 
var searchSalesforce = {
    "id": "searchSalesforce",
    "title": "Search in Salesforce",
    "contexts": ["selection"],
    "documentUrlPatterns":[ "https://*.force.com/*",
                            "https://*.salesforce.com/*",
                            "https://*.cloudforce.com/*"]
};
var searchCMC = {
    "id": "searchCMC",
    "title": "Search in Appirio CMC",
    "contexts": ["selection"]
};

chrome.contextMenus.create(searchSalesforce);
chrome.contextMenus.create(searchCMC);

chrome.contextMenus.onClicked.addListener(function(clickData){   
  var hostName = '';
  if (clickData.menuItemId == "searchSalesforce" && clickData.selectionText && clickData.pageUrl){
    hostName = clickData.pageUrl.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];
  }
  else if (clickData.menuItemId == "searchCMC" && clickData.selectionText && clickData.pageUrl){
    hostName = 'https://appirio.my.salesforce.com';
  }
  if(hostName!=null && hostName!=''){
    var url = hostName + "/_ui/search/ui/UnifiedSearchResults?str=" + clickData.selectionText;
    window.open(url, '_blank');
  }
});

