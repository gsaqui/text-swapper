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
    console.log(tab);
    console.log('swapping text '+tab.id);
      chrome.tabs.sendMessage(tab.id, {"type": "select-text", "text": info.selectionText});
      console.log('message sent');
      
      break;
    
  }
});

function notify(message){
  console.log("background script received message");
  if(message.type === 'dom-parsing') {

      console.log(message.dom);
      var swapper = new Swapper(message.dom);
      
      swapper.apply('firefox');

  }
}

/*
Assign `notify()` as a listener to messages from the content script.
*/
chrome.runtime.onMessage.addListener(notify);