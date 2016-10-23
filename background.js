/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated(n) {
  if (chrome.runtime.lastError) {
    console.log("error creating item:" + chrome.runtime.lastError);
  } else {
    console.log("item created successfully");
  }
}

/*
Create all the context menu items.
*/

chrome.contextMenus.create({
  id: "select-text",
  title: chrome.i18n.getMessage("contextMenuItemSelectionLogger"),
  contexts: ["selection"]
}, onCreated);

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "select-text":    
      chrome.storage.local.set({
        selectedText: info.selectionText
      }, () => {
        chrome.runtime.openOptionsPage();  
      });
      
      //portFromCS.postMessage({"type": "select-text", "text": info.selectionText});      
      break;    
  }
});

var portFromCS;

function connected(p) {
  console.log(p);
  portFromCS = p;
  portFromCS.postMessage({greeting: "hi there content script!"});
  portFromCS.onMessage.addListener(notify);  
  // console.log('hi');
  portFromCS.postMessage({type: "itemsToSwap"});
}

chrome.runtime.onConnect.addListener(connected);


function notify(message){
  console.log('next message in background');
  console.log(message);
  if(message.type === 'options-question') {
      //portFromCS.postMessage({"type": "select-text", "text": 'oh boy'});
  }
}
