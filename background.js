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
Called when the item has been removed, or when there was an error.
We'll just log success or failure here.
*/
function onRemoved() {
  if (chrome.runtime.lastError) {
    console.log("error removing item:" + chrome.runtime.lastError);
  } else {
    console.log("item removed successfully");
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

chrome.contextMenus.create({
  id: "view-options",
  title: chrome.i18n.getMessage("contextMenuItemRemoveMe"),
  contexts: ["all"]
}, onCreated);

var blue = 'document.body.style.border = "5px solid blue"';
var green = 'document.body.style.border = "5px solid green"';

function borderify(tabId, color) {
  chrome.tabs.executeScript(tabId, {
    code: color
  });
}



/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "select-text":
      console.log(info.selectionText);
      break;
    case "view-options":
      borderify(tab.id, blue);
      break;
  }
});
